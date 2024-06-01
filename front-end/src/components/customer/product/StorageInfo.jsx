const StorageInfo = ({ internalStorage }) => {
  const storageUnit = internalStorage === 1 ? "TB" : "GB";
  return ` ${internalStorage} ${storageUnit}`;
};

export default StorageInfo;
