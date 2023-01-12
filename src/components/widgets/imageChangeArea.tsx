import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ImageChangeButton from "../ui/imageChangeButton";
import { Event } from "../../types/types";
import { observer } from 'mobx-react-lite';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;


const ImageChangeAreaContainer = styled.div`
  margin: 8px 0 4px 0;
`;
const Image = styled.img`
  width: auto;
  height: 100px;
`;
const ImageView = styled.div`
  margin-top: 16px;
`;


interface IImageChangeArea {
  setImage: (file: any) => void;
  image: any;
}

const ImageChangeArea = observer(({ ...props }: IImageChangeArea) => {
  const { setImage, image } = props;

  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    setImageUrl(
      (typeof image === 'object')? URL.createObjectURL(image) : image ? `${BASE_URL}images/${image}`: ''
    );
    console.log(imageUrl)
  }, [image])


  const imageChangeHandler = (event: Event<HTMLInputElement>) => {

    // const data = new FormData();
    let file = event.target.files ? event.target.files[0] : null;

    console.log(file)
    console.log(typeof file)
    console.log(file?.name)

    if (file) {
      
      setImage(file);
      setImageUrl(typeof file === 'object' ? URL.createObjectURL(file) : `${BASE_URL}images/${image}`);
      // data.append(`image_name`, file);
      // setImageUrl(URL.createObjectURL(file));
      
      // URL.revokeObjectURL() // удалить URL, когда он не нужен
    }

  }

  return (
    <ImageChangeAreaContainer>
      {/* <Button variant="contained" component="label">
        Изображение
        <input hidden accept="image/*" type="file" onChange={changeHandler} />
      </Button> */}
      <ImageChangeButton imageChangeHandler={imageChangeHandler} multiple={false} />
      <ImageView>
        {imageUrl
          ? <Image src={imageUrl} alt='Фото услуги' />
          : <></>
        }
      </ImageView>
    </ImageChangeAreaContainer>
  )
})

export default ImageChangeArea;