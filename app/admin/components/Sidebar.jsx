"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  Cat,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar() {
  const menuList = [
    {
      name: "Thống Kê",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Sản Phẩm",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Phân Loại",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Thương Hiệu",
      link: "/admin/brands",
      icon: <Cat className="h-5 w-5" />,
    },
    {
      name: "Đơn Hàng",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Khách Hàng",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Đánh Giá",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Bộ Sưu Tập",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Quản Trị Viên",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      name: "Liên Hệ",
      link: "/admin/contacts",
      icon: <Phone className="h-5 w-5" />,
    },
  ];
  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
      <div className="flex justify-center py-4">
        <Link href={`/`}>
          <img className="h-10" src="/logo.png" alt="" />
        </Link>
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />;
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Đang tải...",
                success: "Đã đăng xuất thành công",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"} 
        `}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
