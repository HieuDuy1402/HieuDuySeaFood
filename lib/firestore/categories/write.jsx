import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCategory = async ({ data, image }) => {
  if (!image) {
    throw new Error("Hình ảnh là bắt buộc");
  }
  if (!data?.name) {
    throw new Error("Tên là bắt buộc");
  }
  if (!data?.slug) {
    throw new Error("Chuỗi định danh là bắt buộc");
  }
  const newId = doc(collection(db, `ids`)).id;
  const imageRef = ref(storage, `categories/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Tên là bắt buộc");
  }
  if (!data?.slug) {
    throw new Error("Chuỗi định danh là bắt buộc");
  }
  if (!data?.id) {
    throw new Error("ID là bắt buộc");
  }
  const id = data?.id;

  let imageURL = data?.imageURL;

  if (image) {
    const imageRef = ref(storage, `categories/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `categories/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteCategory = async ({ id }) => {
  if (!id) {
    throw new Error("ID là bắt buộc");
  }
  await deleteDoc(doc(db, `categories/${id}`));
};
