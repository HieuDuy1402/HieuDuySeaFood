"use client";

import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function MyRating({ value }) {
  const [ratingValue, setRatingValue] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setRatingValue(value);
  }, [value]);

  if (!visible) {
    return null;
  }

  if (ratingValue == 0) {
    return <h1 className="text-xs text-gray-400">Chưa có đánh giá</h1>;
  }

  return (
    <Rating
      size="small"
      name="product-rating"
      value={ratingValue}
      precision={0.5}
      readOnly
    />
  );
}
