"use client"
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleHomeClick = () => {
    if (pathname === "/") {

      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.reload();
    } else {
      router.push("/");
    }
  };
  return (
    <footer className="bg-blue-100/80 font-sans dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
    
            <img onClick={handleHomeClick} className="w-80 cursor-pointer" src="logo.png" alt="" />

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row ">
            <div className="flex gap-4 hover:cursor-pointer ">
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
              width="30"
              height="30"
              alt="fb"
            /></Link>
            <Link href="https://www.x.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
              width="30"
              height="30"
              alt="tw"
            /></Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
              width="30"
              height="30"
              alt="inst"
            /></Link>
            <Link href="https://www.github.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.svgrepo.com/show/94698/github.svg"
              className=""
              width="30"
              height="30"
              alt="gt"
            /></Link>
            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.svgrepo.com/show/28145/linkedin.svg"
              width="30"
              height="30"
              alt="in"
            /></Link>
          </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Trang Nhanh
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              
              <p onClick={handleHomeClick} className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Trang Chủ
              </p>

              <Link href="/shop">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Sản Phẩm
              </p></Link>
              <Link href="/about-us">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Giới Thiệu
              </p></Link>
              <Link href="/contact-us">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Liên Hệ
              </p></Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Khách Hàng
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
            <Link href="/search">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Tìm Kiếm
              </p>
              </Link>
              <Link href="/favorites">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Yêu Thích
              </p>
              </Link>
              <Link href="/cart">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Giỏ Hàng
              </p>
              </Link>
              <Link href="/account">
              <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:cursor-pointer hover:text-blue-500">
                Đơn Hàng
              </p>
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-400 md:my-8 dark:border-gray-700 h-2" />

        <p className="font-sans text-center md:text-sm ">
          © 2024 Hiếu Duy SeaFood. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
