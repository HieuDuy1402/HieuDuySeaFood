"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { user } = useAuth();

  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-48">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <main className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
      {(!orders || orders?.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-3 py-11">
          <div className="flex justify-center">
            <img className="h-44" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1>Bạn không có đơn hàng nào</h1>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {orders?.map((item, orderIndex) => {
          const totalAmount = item?.checkout?.line_items?.reduce(
            (prev, curr) => {
              return (
                prev + (curr?.price_data?.unit_amount) * curr?.quantity
              );
            },
            0
          );
          return (
            <div key={item?.id} className="flex flex-col gap-2 border rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <h3>{orderIndex + 1}</h3>
                  <h3 className="bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase">
                    {item?.paymentMode}
                  </h3>
                  <h3 className="bg-green-100 text-green-500 text-xs rounded-lg px-2 py-1 uppercase">
                    {item?.status ?? "Xử lí"}
                  </h3>
                  <h3 className="text-green-600">{formatCurrency(totalAmount)}</h3>
                </div>
                <h4 className="text-gray-600 text-xs">
                  {item?.timestampCreate?.toDate()?.toString()}
                </h4>
              </div>
              <div>
                {item?.checkout?.line_items?.map((product, productIndex) => {
                  return (
                    <div key={product?.id || productIndex} className="flex gap-2 items-center">
                      <img
                        className="h-10 w-10 rounded-lg"
                        src={product?.price_data?.product_data?.images?.[0]}
                        alt="Product Image"
                      />
                      <div>
                        <h1 className="">
                          {product?.price_data?.product_data?.name}
                        </h1>
                        <h1 className="text-gray-500 text-xs">
                        {formatCurrency(product?.price_data?.unit_amount)}
                          <span> X</span>{" "}
                          <span>{product?.quantity?.toString()}</span>
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
