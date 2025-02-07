"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/lib/firestore/products/read";
import { getCategories } from "@/lib/firestore/categories/read_server";
import { ProductCard } from "@/app/components/Products";
import { getTotalProducts } from "@/lib/firestore/products/read_server";

export default function ProductPage() {
  const [filters, setFilters] = useState({
    categoryIds: [],
    minPrice: "",
    maxPrice: "",
    sortPrice: "",
    rating: [],
  });
  const [columns, setColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const pageSize = 12;

  // Update the useProducts hook to include currentPage and filters
  const { data: products, error } = useProducts({
    pageLimit: pageSize,
    currentPage,
    categoryIds: filters.categoryIds,
    sortBy: filters.sortPrice,
  });
  console.log("🚀 ~ ProductPage ~ products:", products);

  useEffect(() => {
    if (products) setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const totalProducts = await getTotalProducts({
        categoryIds: filters.categoryIds,
      });
      setTotalProducts(totalProducts);
    };
    fetchTotalProducts();
  }, [filters.categoryIds]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => {
      if (name === "categoryIds" || name === "rating") {
        return {
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        };
      }
      if (name === "sortPrice") {
        return { ...prev, [name]: checked ? value : "" };
      }
      return { ...prev, [name]: value };
    });
  };
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar */}
      <div className="hidden md:block w-1/5 space-y-6 border-r pr-4">
        <h2 className="text-lg font-bold">Bộ Lọc</h2>
        <hr />
        {/* Filter by Category */}
        <div>
          <h3 className="font-medium pb-4">Lọc theo Phân Loại</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category?.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={category?.id}
                  onChange={handleFilterChange}
                  className="h-4 w-4"
                />
                <span>{category?.name}</span>
              </label>
            ))}
          </div>
        </div>
          <hr />
        {/* Sort by Price */}
        <div>
          <h3 className="font-medium pb-4">Sắp xếp theo Giá</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sortPrice"
                value="increase"
                checked={filters.sortPrice === "increase"}
                onChange={handleFilterChange}
                className="h-4 w-4"
              />
              <span>Thấp đến Cao</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sortPrice"
                value="decrease"
                checked={filters.sortPrice === "decrease"}
                onChange={handleFilterChange}
                className="h-4 w-4"
              />
              <span>Cao đến Thấp</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sản Phẩm</h2>
          <select
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="border rounded p-2 text-gray-600"
          >
            <option value={1}>1 Cột</option>
            <option value={2}>2 Cột</option>
            <option value={3}>3 Cột</option>
            <option value={4}>4 Cột</option>
          </select>
        </div>

        <div
          className={`grid gap-6`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {paginatedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2 text-gray-600">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded bg-white"
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded bg-white"
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
