"use client";
import { Rating } from "@mui/material";
import { useProduct } from "@/lib/firestore/products/read";
import { useAllReview } from "@/lib/firestore/reviews/read";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import Slider from "react-slick"; // Import the Slider component

export default function CustomerReviews() {
  const { data: reviews } = useAllReview();

  // Slider settings for the reviews
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, 
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
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <h1 className="text-center font-semibold text-xl">Cảm Nhận Của Khách Hàng</h1> {/* Move the text outside the slider */}
      <div className="flex flex-col gap-4">
        <Slider {...settings}>
          {reviews?.map((item) => (
            <ReviewCard item={item} key={`${item?.id}-${item?.productId}`}  />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function ReviewCard({ item }) {
  const { data: product } = useProduct({ productId: item?.productId });

  return (
    <div className="flex justify-center ">
      <div className="w-full p-5 md:max-w-[900px] flex flex-col gap-3 ">
        <div className=" shadow flex flex-col gap-2 p-4 rounded-lg justify-center items-center border">
          <h1 className="text-sm font-semibold">{item?.displayName}</h1>
          <div className="">
            <Avatar src={item?.photoURL} />
          </div>
          <Link href={`/products/${item?.productId}`}>
            <h1 className="text-xs font-semibold">{product?.title}</h1>
          </Link>
          <Rating
            size="small"
            name="customer-rating"
            defaultValue={item?.rating}
            precision={item?.rating}
            readOnly
          />
          <p className="text-sm text-gray-500 text-center">{item?.message}</p>
        </div>
      </div>
    </div>
  );
}
