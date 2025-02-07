import { db } from "@/lib/firebase";
import { convertFirestoreTimestampToPlainObject } from "@/utils/firestoreTime";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getTotalProducts = async ({ categoryIds = [] }) => {
  const productsRef = collection(db, "products");
  let productsQuery;

  if (categoryIds.length > 0) {
    productsQuery = query(productsRef, where("categoryId", "in", categoryIds));
  } else {
    productsQuery = productsRef;
  }

  try {
    const snapshot = await getCountFromServer(productsQuery);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting total products:", error);
    return 0;
  }
};

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return convertFirestoreTimestampToPlainObject(data.data());
  } else {
    return null;
  }
};

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );
  return list.docs.map((snap) =>
    convertFirestoreTimestampToPlainObject(snap.data())
  );
};

export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("timestampCreate", "desc"))
  );
  return list.docs.map((snap) =>
    convertFirestoreTimestampToPlainObject(snap.data())
  );
};

export const getProductsByCategory = async ({ categoryId }) => {
  if (!categoryId) {
    return await getProducts();
  }

  const list = await getDocs(
    query(
      collection(db, "products"),
      orderBy("timestampCreate", "desc"),
      where("categoryId", "==", categoryId)
    )
  );
  return list.docs.map((snap) =>
    convertFirestoreTimestampToPlainObject(snap.data())
  );
};
