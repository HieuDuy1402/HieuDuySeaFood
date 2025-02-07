import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useAllContacts = async () => {
  try {
    const contacts = [];
    const querySnapshot = await getDocs(collection(db, "contact_us")); // Collection "contact_us"
    querySnapshot.forEach((doc) => {
      contacts.push({ id: doc.id, ...doc.data() }); // Add document ID to the object
    });
    return contacts;
  } catch (error) {
    // Error handling without logging to the console
    return [];
  }
};
