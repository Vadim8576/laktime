import React, { useRef, useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { observer } from 'mobx-react-lite';
import { useObserver } from '../../../../hooks/useObserver';
import { NoPhoto } from '../../../ui/noPhoto';
import { MySkeleton } from '../../../ui/skeleton';


const BASE_URL = process.env.REACT_APP_BASE_URL as string;

interface IServiceItemMediaProps {
  imageName: string;
}

export const ServiceItemMedia = observer(({ ...props }: IServiceItemMediaProps) => {

  let { imageName } = props;
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loadingComplite, setLoadingComplite] = useState<boolean>(false);
  const [imageInView, setImageInView] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageEntry = useObserver(imageRef, { rootMargin: '0px' });

  useEffect(() => {
    if (!imageEntry) return;
    setImageInView(true);
  }, [imageEntry])

  useEffect(() => {
    if (!imageName) return;
    setImageUrl(`${BASE_URL}images/${imageName}`);
  }, [imageName])

  const onLoadImage = () => {
    setLoadingComplite(true);
  }

  const CardWithImage = () => (
    <>
      <CardMedia
        component='img'
        // height='194'
        image={imageUrl}
        alt='Изображение услуги'
        onLoad={onLoadImage}
        style={{
          filter: `blur(${loadingComplite ? '0' : '10'}px)`,
          opacity: loadingComplite ? '1' : '0',
          width: loadingComplite ? '100%' : '0',
          height: loadingComplite ? '194px' : '0',
          transition: '.5s filter',
        }}
      />
      {!loadingComplite && <MySkeleton animationType='wave' />}
    </>
  )

  return (
    <div ref={imageRef}>
      {imageInView && imageUrl ? CardWithImage() : <NoPhoto type='text' width='100%' height='194px' />}
    </div>
  )
})
