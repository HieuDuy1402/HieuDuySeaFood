"use client";

import { useState } from "react";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  if (imageList?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center w-full ">
        <img
          className="object-cover h-[350px] md:h-[430px] border-1 rounded-xl"
          src={selectedImage}
        />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => {
          return (
            <div
              key={item || index}
              onClick={() => {
                setSelectedImage(item);
              }}
              className="w-[80px] border rounded p-2 cursor-pointer"
            >
              <img className="object-cover" src={item} alt={`Thumbnail ${index}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
