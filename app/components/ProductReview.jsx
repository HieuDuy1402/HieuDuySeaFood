"use client";
import { useEffect, useState } from "react";
import MyRating from "./MyRating";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";

export default function RatingReview({ product }) {
  const [countReview, setCountReview] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const returnReview = await getProductReviewCounts({
        productId: product?.id,
      });
      setCountReview(returnReview);
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-3 items-center">
      <MyRating value={countReview?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{countReview?.averageRating?.toFixed(1)}</span> (
        {countReview?.totalReviews})
      </h1>
    </div>
  );
}
