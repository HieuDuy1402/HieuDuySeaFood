"use client";

import { updateOrderStatus } from "@/lib/firestore/orders/write";
import toast from "react-hot-toast";

export default function ChangeOrderStatus({ order }) {
  const handleChangeStatus = async (status) => {
    try {
      if (!status) {
        toast.error("Vui lòng chọn trạng thái");
      }
      await toast.promise(
        updateOrderStatus({ id: order?.id, status: status }),
        {
          error: (e) => e?.message,
          loading: "Đang cập nhật...",
          success: "Đã cập nhật thành công",
        }
      );
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <select
      value={order?.status}
      onChange={(e) => {
        handleChangeStatus(e.target.value);
      }}
      name="change-order-status"
      id="change-order-status"
      className="px-4 py-2 border rounded-lg bg-white"
    >
      <option value="Xử lí">Xử lí</option>
      <option value="Đóng gói">Đóng gói</option>
      <option value="Lấy hàng">Lấy hàng</option>
      <option value="Vận chuyển">Vận chuyển</option>
      <option value="Đang giao">Đang giao</option>
      <option value="Đã giao">Đã giao</option>
      <option value="Hủy đơn">Hủy đơn</option>
    </select>
  );
}
