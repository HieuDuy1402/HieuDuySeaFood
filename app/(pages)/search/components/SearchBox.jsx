"use client";

import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState(""); // Default to an empty string
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") ?? ""; // Fallback to empty string if q is null
  const router = useRouter();

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleSubmit = () => {
    router.push(`/search?q=${query}`);
    router.refresh();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex w-full justify-center gap-3 items-center"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value ?? "")} // Ensure value is never null
        placeholder="Nhập tên sản phẩm ..."
        type="text"
        className="border px-5 py-2 rounded-xl bg-white focus:outline-none"
      />
      <Button type="submit">
        <Search size={13} />
        Tìm Kiếm
      </Button>
    </form>
  );
}
