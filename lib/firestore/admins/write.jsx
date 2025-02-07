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

export const createNewAdmin = async ({ data, image }) => {
  if (!image) {
    throw new Error("Hình ảnh là bắt buộc");
  }
  if (!data?.name) {
    throw new Error("Tên là bắt buộc");
  }
  if (!data?.email) {
    throw new Error("Email là bắt buộc");
  }

  const newId = data?.email;

  const imageRef = ref(storage, `admins/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateAdmin = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Tên là bắt buộc");
  }
  if (!data?.id) {
    throw new Error("ID là bắt buộc");
  }
  if (!data?.email) {
    throw new Error("Email là bắt buộc");
  }

  const id = data?.id;

  let imageURL = data?.imageURL;

  if (image) {
    const imageRef = ref(storage, `admins/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  if (id === data?.email) {
    await updateDoc(doc(db, `admins/${id}`), {
      ...data,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  } else {
    const newId = data?.email;

    await deleteDoc(doc(db, `admins/${id}`));

    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  }
};

export const deleteAdmin = async ({ id }) => {
  if (!id) {
    throw new Error("ID là bắt buộc");
  }
  await deleteDoc(doc(db, `admins/${id}`));
};
