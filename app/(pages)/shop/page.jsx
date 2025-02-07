import ProductList from "./components/ProductList";

export default async function Page() {
  return (
    <main className="flex flex-col gap-1 min-h-screen p-5">
      <ProductList />
    </main>
  );
}
