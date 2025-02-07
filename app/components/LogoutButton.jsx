"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <button
      onClick={async () => {
        if (!confirm("Bạn có chắc không?")) return;
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
      className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
    >
      <LogOut size={14} />
    </button>
  );
}
