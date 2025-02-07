"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueChart({ items }) {
  const data = {
    labels: items?.map((item) => item?.date), // Gắn nhãn theo ngày
    datasets: [
      {
        label: "Doanh thu (đ)",
        data: items?.map((item) => item?.data?.totalRevenue ?? 0), // Dữ liệu doanh thu
        backgroundColor: "rgba(135, 159, 255, 0.2)", // Màu nền
        borderColor: "rgba(135, 159, 255, 0.8)", // Màu đường
        pointBackgroundColor: "#879fff", // Màu điểm
        pointBorderColor: "#ffffff", // Viền điểm
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4, // Làm mềm các đoạn nối
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top", // Đặt chú thích ở phía trên
        labels: {
          font: {
            size: 12, // Cỡ chữ chú thích
          },
        },
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu theo ngày",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Doanh thu: ${value.toLocaleString("vi-VN")}đ`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn lưới ngang trên trục x
        },
        ticks: {
          font: {
            size: 12, // Cỡ chữ nhãn trục x
          },
        },
      },
      y: {
        beginAtZero: true, // Bắt đầu từ 0
        ticks: {
          callback: (value) => value.toLocaleString("vi-VN"), // Định dạng VNĐ cho trục y
          font: {
            size: 12, // Cỡ chữ nhãn trục y
          },
        },
        grid: {
          color: "#f0f0f0", // Màu lưới ngang nhạt hơn
        },
      },
    },
  };

  return (
    <section
  className="bg-white p-5 rounded-xl shadow w-full h-[430px]"
  aria-label="Biểu đồ doanh thu theo ngày"
>
  <Line data={data} options={options} />
</section>

  );
}
