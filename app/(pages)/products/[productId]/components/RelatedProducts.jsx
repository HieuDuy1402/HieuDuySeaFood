import { ProductCard } from "@/app/components/Products";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({ categoryId, currentProductId }) {
  const products = await getProductsByCategory({ categoryId });
  const filteredProducts = products?.filter(
    (product) => product.id !== currentProductId
  );
  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Sản phẩm liên quan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {filteredProducts?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
