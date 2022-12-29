import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import servicesStore from "../../../../store/servicesStore";
import image from '../../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import PortfolioExamples from "../../../widgets/portfolioExamples";
import FlexContainer from "../../../widgets/flexContainer";
import GoToBackButton from "../../../ui/goToBackButton";


const CardDetail = observer(() => {

  const { id } = useParams();
  if (!id) return null;


  const { getService, servicesList } = servicesStore;
  const serviceItem = servicesList[0];

  useEffect(() => {
    if (id) getService(+id);
  }, [])


  return (
    <>
      <GoToBackButton />
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
        <p>+7(999) 999 99 99</p>
        <p>Псков, ул. Юбилейная, д. 50</p>
      </FlexContainer>

      <PortfolioExamples />
    </>
  )
})

export default CardDetail;