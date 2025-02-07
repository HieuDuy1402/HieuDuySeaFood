"use client";

import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";

export default function FeaturedProductSlider({ featuredProducts }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden pt-3">
      <Slider {...settings}>
        {featuredProducts?.map((product) => {
          return (
            <div key={product?.id} className="px-3">
              {" "}
              {/* Add padding to the slide */}
              <div className="flex flex-col md:flex-row gap-4 bg-[#f8f8f8] p-4 items-center rounded-lg shadow">
                {/* Product Content */}
                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="text-gray-500 text-sm font-semibold">
                    NỔI BẬT
                  </h2>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold line-clamp-1 text-gray-600">
                      {product?.title}
                    </h1>

                    <h1 className="text-gray-600 text-xs line-clamp-2">
                      {product?.shortDescription}
                    </h1>
                  </div>
                  <AuthContextProvider>
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product?.id}`}>
                        <button className="bg-blue-500 text-white text-xs px-3 py-2 rounded-lg">
                          Xem Thêm
                        </button>
                      </Link>
                      <FavoriteButton productId={product?.id} />
                    </div>
                  </AuthContextProvider>
                </div>

                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    className="h-[10rem] md:h-[12rem] w-auto object-cover rounded-lg shadow"
                    src={product?.featureImageURL}
                    alt={product?.title}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
