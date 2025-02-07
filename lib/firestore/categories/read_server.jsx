import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { convertFirestoreTimestampToPlainObject } from "@/utils/firestoreTime";

export const getCategory = async ({ id }) => {
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getCategories = async () => {
  const list = await getDocs(collection(db, "categories"));
  return list.docs.map((snap) =>
    convertFirestoreTimestampToPlainObject(snap.data())
  );
};
