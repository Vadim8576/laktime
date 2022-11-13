import React, { FC, useEffect } from "react";
import { FlexWrapper, TextArea, MediaArea } from '../about/aboutPage';
import { useParams } from "react-router-dom";
import priceStore from "../../../store/priceStore";
import image from '../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useLoadImage } from "../../../hooks/useLoadImage";
import { Skeleton, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import PortfolioExamples from "../../ui/portfolioExamples";

interface CardDetail {

}

const CardDetail: FC<CardDetail> = observer(() => {

  const { id } = useParams();
  const { getPrice, priceList } = priceStore;
  const price = toJS(priceList[0]);
  const imgIsLoading = useLoadImage(image);

  useEffect(() => {
    if (id) getPrice(id);
  }, [id])


  return (
    <>
      <p>назад</p>
      <FlexWrapper>
        {!imgIsLoading
          ? <MediaArea image={image} />
          : <Skeleton variant="rectangular" animation="wave" width={400} height={600} />
        }
        <TextArea>
          <h1>{price?.servicename}</h1>
          <h3>{price?.description}</h3>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: 'red',
              textAlign: 'left'
            }}
          >
            {price.price} &#8381;
          </Typography>
          <Button
            size="medium"
            color="primary"
            variant="outlined"
            sx={{
              letterSpacing: '1px'
            }}
          >
            Записаться
          </Button>
          <p>Лактайм</p>
          <p>Псков, ул. Юбилейная, д. 50</p>


        </TextArea>
      </FlexWrapper>
      <PortfolioExamples />
    </>
  )
})


export default CardDetail;