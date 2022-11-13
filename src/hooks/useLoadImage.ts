import React, { useEffect, useState } from "react";


export const useLoadImage = (image: string) => {
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true);
  let img;

  useEffect(() => {
    if (image) {
      img = new Image();
      img.src = image;
      img.onload = () => setImgIsLoading(false);
    }
  }, [image]);

  return imgIsLoading;
}

