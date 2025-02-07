import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Tiêu đề là bắt buộc");
  }
  if (!featureImage) {
    throw new Error("Hình ảnh nổi bật là bắt buộc");
  }
  const featureImageRef = ref(storage, `products/${featureImage?.name}`);
  await uploadBytes(featureImageRef, featureImage);
  const featureImageURL = await getDownloadURL(featureImageRef);

  let imageURLList = [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imageRef = ref(storage, `products/${image?.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageURLList.push(url);
  }

  const newId = doc(collection(db, `ids`)).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Tiêu đề là bắt buộc");
  }
  if (!data?.id) {
    throw new Error("ID là bắt buộc");
  }

  let featureImageURL = data?.featureImageURL ?? "";

  if (featureImage) {
    const featureImageRef = ref(storage, `products/${featureImage?.name}`);
    await uploadBytes(featureImageRef, featureImage);
    featureImageURL = await getDownloadURL(featureImageRef);
  }

  let imageURLList = imageList?.length === 0 ? data?.imageList : [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imageRef = ref(storage, `products/${image?.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    imageURLList.push(url);
  }

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID là bắt buộc");
  }
  await deleteDoc(doc(db, `products/${id}`));
};
