import React from "react";
import styled from 'styled-components';
import Button from '@mui/material/Button';


const ChangeImageArea = styled.div`
  margin: 8px 0 4px 0;
`;
const Image = styled.img`
  width: auto;
  height: 100px;
`;
const ImageView = styled.div`
  margin-top: 16px;
`;


const ChangeImage = () => {
  const [image, setImage] = React.useState<string>('');
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setImage(URL.createObjectURL(event.target.files[0]));   
      // formData.append("fileupload", event.target.files[0]);   
      // console.log(formData.get('fileupload'))
      // setFormData(formData);
    }
  }

  return (
    <ChangeImageArea>
      <Button variant="contained" component="label">
        Изображение
        <input hidden accept="image/*" type="file" onChange={changeHandler} />
      </Button>
      <ImageView>
        {image
          ? <Image src={image} alt='Фото услуги' />
          : <></>
        }
      </ImageView>
    </ChangeImageArea>
  )
}

export default ChangeImage;