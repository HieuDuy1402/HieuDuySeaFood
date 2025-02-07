"use client";

import { useOrdersCounts } from "@/lib/firestore/orders/read_count";
import { useProductCount } from "@/lib/firestore/products/count/read_client";
import { useUsersCount } from "@/lib/firestore/user/read_count";
import Link from "next/link";

export default function CountMeter() {
  const { data: totalProduct } = useProductCount();
  const { data: totalUsers } = useUsersCount();
  const { data: ordersCounts } = useOrdersCounts();
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
    <Card
  imgURL={"/profit-up.png"}
  title={"Doanh Thu"}
  value={`${(ordersCounts?.totalRevenue ?? 0).toLocaleString("vi-VN")}đ`}
/>
    <Link href={"/admin/products"}>
      <Card imgURL={"/box.png"} title={"Sản Phẩm"} value={totalProduct ?? 0} />
      </Link>
      <Link href={"/admin/orders"}>
      <Card
        imgURL={"/received.png"}
        title={"Đơn Hàng"}
        value={ordersCounts?.totalOrders ?? 0}
      />
      </Link>
      <Link href={"/admin/customers"}>
      <Card imgURL={"/team.png"} title={"Khách Hàng"} value={totalUsers ?? 0} />
      </Link>
    </section>
  );
}

function Card({ title, value, imgURL }) {
  return (
    <div className="flex gap-2 px-4 py-2 bg-white shadow rounded-xl w-full justify-between items-center">
      <div className="flex flex-col">
        <h1 className="font-semibold text-xl">{value}</h1>
        <h1 className="text-sm text-gray-700">{title}</h1>
      </div>
      <img className="h-10" src={imgURL} alt={title} />
    </div>
  );
}
