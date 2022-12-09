import React, { FC, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import servicesStore from "../../../../store/servicesStore";
import image from '../../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import PortfolioExamples from "../../../widgets/portfolioExamples";
import FlexContainer from "../../../widgets/flexContainer";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';

interface CardDetail {

}

const CardDetail: FC<CardDetail> = observer(() => {

  const { id } = useParams();
  if (!id) return null;

  const navigate = useNavigate();
  const { getService, servicesList } = servicesStore;
  const serviceItem = servicesList[0];

  useEffect(() => {
    if (id) getService(id);
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
        <h1>{serviceItem?.servicename}</h1>
        <h3>{serviceItem?.description}</h3>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: 'red',
            textAlign: 'left'
          }}
        >
          {serviceItem?.price} &#8381;
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