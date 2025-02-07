"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Hook tùy chỉnh để lấy thông tin người dùng đã đăng nhập
import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function ContactUs() {
  const { user, loading } = useAuth(); // Hook lấy thông tin người dùng từ Auth (Firebase hoặc các dịch vụ khác)
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false); // To check if the component is mounted on the client side

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      // Nếu người dùng đã đăng nhập, tự động điền tên, email và thêm ảnh photoURL từ tài khoản
      setDetails({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu người dùng chưa đăng nhập
    if (!user) {
      alert("Vui lòng đăng nhập trước khi gửi.");
      return;
    }

    // Kiểm tra nếu chưa điền đủ thông tin
    if (!details.name || !details.email || !details.phone || !details.message) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Gửi dữ liệu lên Firestore, thêm photoURL của người dùng
      await setDoc(doc(db, "contact_us", details.name + "_" + Timestamp.now().seconds), {
        name: details.name,
        email: details.email,
        phone: details.phone,
        message: details.message,
        photoURL: user.photoURL || "", // Lấy ảnh photoURL nếu có
        timestamp: Timestamp.now(),
      });
      setIsSubmitted(true);
      setDetails({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Lỗi khi gửi biểu mẫu liên hệ: ", error);
    }
  };

  // Render only after component is mounted on the client side
  if (!mounted) {
    return null; // Or loading spinner if desired
  }

  return (
    <section className="body-font relative py-16 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Title and description */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-600">Hãy liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ</p>
        </div>

        {/* Main container for both sections */}
        <div className="flex flex-col sm:flex-row justify-center gap-8">

          {/* Left section: Shop contact info and map */}
          <div className="w-full sm:w-1/2 bg-white shadow-lg p-8 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông Tin Liên Hệ Cửa Hàng</h2>
              <p className="text-gray-600 mb-2">Địa chỉ: Phường 6, TP.Bến Tre</p>
              <p className="text-gray-600 mb-2">Số điện thoại: (+84) 966.916.165</p>
              <p className="text-gray-600">Email: duynguyenhieuduc@gmail.com</p>
            </div>

            {/* Google Map */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62820.77908415328!2d106.33435131857165!3d10.237476326229023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa8f5e2e8bd09%3A0x9d5fd18ce4fa56bb!2zVHAuIELhur9uIFRyZSwgQuG6v24gVHJlLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1734121381737!5m2!1svi!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right section: Contact form */}
          <div className="w-full sm:w-1/2">
            <div className="w-full bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Biểu Mẫu Liên Hệ</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Họ và tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading || !user}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={details.email}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading || !user}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Số điện thoại</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={details.phone}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600">Tin nhắn</label>
                    <textarea
                      id="message"
                      name="message"
                      value={details.message}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={loading || !user}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>

              {isSubmitted && (
                <div className="mt-4 text-green-500 text-center">Tin nhắn của bạn đã được gửi!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
