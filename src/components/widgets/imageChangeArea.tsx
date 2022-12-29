import React from "react";
import styled from 'styled-components';
import ImageChangeButton from "../ui/imageChangeButton";
import { Event } from "../../types/types";


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



const ImageChangeArea = () => {

  const [image, setImage] = React.useState<string>('');
  
  const imageChangeHandler = (event: Event<HTMLInputElement>) => {
    if (event.target.files != null) {
      setImage(URL.createObjectURL(event.target.files[0]));   
      // formData.append("fileupload", event.target.files[0]);   
      // console.log(formData.get('fileupload'))
      // setFormData(formData);
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
        {image
          ? <Image src={image} alt='Фото услуги' />
          : <></>
        }
      </ImageView>
    </ImageChangeAreaContainer>
  )
}

export default ImageChangeArea;