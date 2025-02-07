import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const deleteContact = async ({ contactId }) => {
  const contactRef = doc(db, "contact_us", contactId); // Sử dụng document ID
  await deleteDoc(contactRef);
};
