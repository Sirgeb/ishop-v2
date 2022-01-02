export const getCollectionCategory = (collectionName: string) => {
  if (collectionName === "Bag") return "BAG";
  if (collectionName === "Shirt") return "SHIRT";
  if (collectionName === "Device") return "DEVICE";
  if (collectionName === "Wrist Watch") return "WRISTWATCH";
  if (collectionName === "Shoe") return "SHOE";
}
