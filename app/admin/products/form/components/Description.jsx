"use client";

import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import the new ReactQuill
const ReactQuillNew = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};

export default function Description({ data, handleData }) {
  const handleChange = (value) => {
    handleData("description", value);
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Mô tả</h1>
      <ReactQuillNew
        value={data?.description}
        onChange={handleChange}
        modules={modules}
        placeholder="Nhập mô tả của bạn vào đây..."
      />
    </section>
  );
}
