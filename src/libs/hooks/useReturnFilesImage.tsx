const useReturnFilesImage = (file: any) => {
  const images = file?.flat().filter((file: any) => {
    const fileExtension = file.file.split(".").pop().toLowerCase();
    return (
      fileExtension === "jpg" ||
      fileExtension === "png" ||
      fileExtension === "jpeg"
    );
  });

  return { images };
};

export { useReturnFilesImage };
