"use client"
import { useEffect, useState } from "react";
import { useAllContacts } from "@/lib/firestore/contacts/read";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { deleteContact } from "@/lib/firestore/contacts/write";

export default function ContactListView() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await useAllContacts();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    if (!confirm("Bạn có chắc muốn xóa liên hệ này không?")) return;

    try {
      await deleteContact({ contactId }); // Gọi hàm xóa
      setContacts(contacts.filter(contact => contact.id !== contactId)); // Làm mới danh sách sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa liên hệ:", error);
      alert("Có lỗi khi xóa liên hệ.");
    }
  };

  if (contacts.length === 0) {
    return <p>Không có dữ liệu liên hệ để hiển thị.</p>;
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <div className="flex flex-col gap-4">
        {contacts.map((contact) => (
          <ContactCard contact={contact} key={contact.id} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

function ContactCard({ contact, onDelete }) {
  return (
    <div className="flex gap-3 bg-white border p-5 rounded-xl">
      <div className="">
        <Avatar src={contact.photoURL} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
      <div>
        <h1 className="font-semibold">{contact.name}</h1>
        <h1 className="text-sm">{contact.email}</h1>
        <p className="text-sm">{contact.phone}</p>
        
      </div>
      <Button
            isIconOnly
            size="sm"
            color="danger"
            variant="flat"
            onClick={() => onDelete(contact.id)}
          >
            <Trash2 size={12} />
          </Button>
    </div>
    <p className="text-sm text-gray-700 pt-1">{contact.message}</p>
    </div>
    </div>
  );
}
