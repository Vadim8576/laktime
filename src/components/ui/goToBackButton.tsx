import React from "react";
import { Button } from '@mui/material';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from 'react-router-dom';

const GoToBackButton = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div
      style={{
        width: '100%',
        margin: '120px 0 70px'
      }}
    >
      <Button color='inherit' size="large" onClick={handleBack}>
        <KeyboardArrowLeft />
        Назад
      </Button>
    </div>

  )
}


export default GoToBackButton;