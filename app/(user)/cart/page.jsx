"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page({ productList }) {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="p-10 flex w-full justify-center">
        <CircularProgress />
      </div>
    );
  }

  const totalPrice = productList?.reduce((prev, curr) => {
    return prev + curr?.quantity * curr?.product?.salePrice;
  }, 0);

  return (
    <main className="flex flex-col gap-3 justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Giỏ Hàng</h1>
      {(!data?.carts || data?.carts?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1 className="text-gray-600 font-semibold">
          Vui lòng thêm sản phẩm vào giỏ hàng
          </h1>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
      {data?.carts?.map((item, key) => {
  return <ProductItem item={item} key={item?.id} />;
})}
      </div>
      {data?.carts?.length > 0 && (
        <div className="">
        
  <div>
    <Link href={`/checkout?type=cart`}>
      <button className="bg-blue-500 px-5 py-2 text-sm rounded-lg text-white">
      Thanh toán
      </button>
    </Link>
  </div>
  </div>
)}

    </main>
  );
}

function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: product } = useProduct({ productId: item?.id });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleRemove = async () => {
    if (!confirm("Bạn có chắc không?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id != item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsRemoving(false);
  };

  const handleUpdate = async (quantity) => {
    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: parseInt(quantity),
          };
        } else {
          return d;
        }
      });
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsUpdating(false);
  };

  return (
    <div className="flex gap-3 items-center border px-3 py-3 rounded-xl">
      <div className="h-14 w-14 p-1">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product?.featureImageURL}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-sm font-semibold">{product?.title}</h1>
        <h1 className="text-green-500 text-sm">
        {formatCurrency(product?.salePrice)}{" "}
        {product?.price && (
          <span className="line-through text-xs text-gray-500">
          {formatCurrency(product?.price)}
          </span>
        )}
        </h1>
        <div className="flex text-xs items-center gap-2">
          <Button
            onClick={() => {
              handleUpdate(item?.quantity - 1);
            }}
            isDisabled={isUpdating || item?.quantity <= 1}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Minus size={12} />
          </Button>
          <h2>{item?.quantity}</h2>
          <Button
            onClick={() => {
              handleUpdate(item?.quantity + 1);
            }}
            isDisabled={isUpdating || item?.quantity >= (product?.stock - (product?.orders ?? 0))}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Button
          onClick={handleRemove}
          isLoading={isRemoving}
          isDisabled={isRemoving}
          isIconOnly
          color="danger"
          size="sm"
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}
