import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ImageChangeButton from "../ui/imageChangeButton";
import { Event } from "../../types/types";
import { observer } from 'mobx-react-lite';
import { ImagePreview } from "../ui/imagePreview";

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const ImageChangeAreaContainer = styled.div`
  margin: 8px 0 4px 0;
`;


interface IImageChangeArea {
  setImage: (file: any) => void;
  image: any;
}

const ImageChangeArea = observer(({ ...props }: IImageChangeArea) => {
  const { setImage, image } = props;

  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    setImageUrl((_) => {
      if (typeof image === 'object') {
        return URL.createObjectURL(image);
      }
      if (image) {
        return `${BASE_URL}images/${image}`;
      } else {
        return '';
      }
    });
    console.log(imageUrl)
  }, [image])


  const imageChangeHandler = (event: Event<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : '';

    if (file) {
      setImage(file);
      setImageUrl(typeof file === 'object' ? URL.createObjectURL(file) : `${BASE_URL}images/${image}`);
    }
  }

  return (
    <ImageChangeAreaContainer>
      <ImageChangeButton imageChangeHandler={imageChangeHandler} multiple={false} />
      <ImagePreview src={imageUrl} />
    </ImageChangeAreaContainer >
  )
})

export default ImageChangeArea;