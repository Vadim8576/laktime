import React, { FC, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import priceStore from "../../../store/priceStore";
import image from '../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import PortfolioExamples from "../../widgets/portfolioExamples";
import FlexContainer from "../../widgets/flexContainer";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

interface CardDetail {

}

const CardDetail: FC<CardDetail> = observer(() => {

  const { id } = useParams();
  if (!id) return null;

  const navigate = useNavigate();
  const { getPrice, priceList } = priceStore;
  const priceItem = priceList[0];

  useEffect(() => {
    if (id) getPrice(id);
  }, [])



  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <Button color='inherit' size="large" onClick={handleBack}>
        <KeyboardArrowLeft />
        Back
      </Button>

      <FlexContainer
        textSide='right'
        image={image}
      >
        <h1>{priceItem?.servicename}</h1>
        <h3>{priceItem?.description}</h3>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: 'red',
            textAlign: 'left'
          }}
        >
          {priceItem?.price} &#8381;
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
      </FlexContainer>

      <PortfolioExamples />
    </>
  )
})

export default CardDetail;