import { useSelector } from "react-redux";

export const useExistingBoundingBox = (id) => {
  const boundingBoxes = useSelector((state) => state.canvas.boundingBox);

  const isExisting = boundingBoxes.some((box) => box.file.id === id);

  if (isExisting) {
    const boundingBox = boundingBoxes.filter((box) => box.file.id === id);

    return {
      isExisting,
      boundingBox,
    };
  }

  return {
    isExisting,
    boundingBox: [],
  };
};
