"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

export default function BasicDetails({ data, handleData }) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  return (
    <section className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Thông Tin Cơ Bản</h1>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-title">
        Tên sản phẩm <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="text"
          placeholder="Nhập tiêu đề..."
          id="product-title"
          name="product-title"
          value={data?.title ?? ""}
          onChange={(e) => {
            handleData("title", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-short-decription"
        >
          Mô tả ngắn <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="text"
          placeholder="Nhập mô tả ngắn gọn..."
          id="product-short-decription"
          name="product-short-decription"
          value={data?.shortDescription ?? ""}
          onChange={(e) => {
            handleData("shortDescription", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-brand">
        Thương hiệu <span className="text-red-500">*</span>{" "}
        </label>
        <select
          type="text"
          id="product-brand"
          name="product-brand"
          value={data?.brandId ?? ""}
          onChange={(e) => {
            handleData("brandId", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Chọn thương hiệu</option>
          {brands?.map((item) => {
            return (
              <option value={item?.id} key={item?.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-category">
          Phân loại <span className="text-red-500">*</span>{" "}
        </label>
        <select
          type="text"
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            handleData("categoryId", e.target.value);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Chọn phân loại</option>
          {categories?.map((item) => {
            return (
              <option value={item?.id} key={item?.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-stock">
          Tồn kho <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Nhập kho..."
          id="product-stock"
          name="product-stock"
          value={data?.stock ?? ""}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            handleData("stock", value >= 0 ? value : 0);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-price">
          Giá cũ
        </label>
        <input
          type="number"
          placeholder="Nhập giá cũ..."
          id="product-price"
          name="product-price"
          value={data?.price ?? ""}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            handleData("price", value >= 0 ? value : 0);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-xs" htmlFor="product-sale-price">
          Giá <span className="text-red-500">*</span>{" "}
        </label>
        <input
          type="number"
          placeholder="Nhập giá bán..."
          id="product-sale-price"
          name="product-sale-price"
          value={data?.salePrice ?? ""}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            handleData("salePrice", value >= 0 ? value : 0);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-gray-500 text-xs"
          htmlFor="product-is-featured-product"
        >
          Sản phẩm nổi bật <span className="text-red-500">*</span>{" "}
        </label>
        <select
          type="number"
          placeholder="Chọn nổi bật..."
          id="product-is-featured-product"
          name="product-is-featured-product"
          value={data?.isFeatured ? "yes" : "no"}
          onChange={(e) => {
            handleData("isFeatured", e.target.value === "yes" ? true : false);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value={"no"}>Không</option>
          <option value={"yes"}>Có</option>
        </select>
      </div>
    </section>
  );
}
