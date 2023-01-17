import { useState } from 'react';
import styled from "styled-components";
import { NoPhoto } from "./noPhoto";
import { MySkeleton } from './skeleton';



const ImageView = styled.div`
  margin-top: 0px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
`;

interface IImagePreviewProps {
  src?: any;
}

export const ImagePreview = ({ src }: IImagePreviewProps) => {
  const [loadingComplite, setLoadingComplite] = useState<boolean>(false);

  if (!src) return <NoPhoto type='icon' width='100px' height='100px' />

  const onLoadImage = () => {
    setLoadingComplite(true);
  }

  return (
    <ImageView>

      <Image
        src={src}
        onLoad={onLoadImage}
        alt='Изображение услуги'
        style={{ display: loadingComplite ? 'block' : 'none' }}
      />

      {!loadingComplite && <MySkeleton animationType='wave' width='100px' height='100px' />}
      
    </ImageView>
  )
}


