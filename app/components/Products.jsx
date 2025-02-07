import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { Suspense } from "react";
import ProductReview from "./ProductReview";

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">
          Sản Phẩm Của Chúng Tôi
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function ProductCard({ product }) {
  const isOutOfStock = product?.stock <= (product?.orders ?? 0);
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg shadow">
      <div className="relative w-full">
        <Link href={`/products/${product?.id}`}>
          <img
            src={product?.featureImageURL}
            className="rounded-lg h-48 w-full object-cover shadow"
            alt={product?.title}
          />
        </Link>
        <div className="absolute top-1 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
      </Link>
      <div className="">
        <h2 className="text-green-500 text-sm font-semibold">
          {formatCurrency(product?.salePrice)}
          {product?.price && (
            <span className="line-through text-xs text-gray-600">
              {formatCurrency(product?.price)}
            </span>
          )}
        </h2>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <Suspense fallback={<>Loading...</>}>
        <ProductReview product={product} />
      </Suspense>
      {isOutOfStock && (
        <div className="text-center">
          <h3 className="text-red-500 text-sm font-semibold ">Hết hàng</h3>
        </div>
      )}
      {!isOutOfStock && (
        <div className="flex items-center gap-4 w-full">
          <div className="w-full">
            <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
              <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs w-full">
                Mua Ngay
              </button>
            </Link>
          </div>
          <AuthContextProvider>
            <AddToCartButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      )}
    </div>
  );
}
