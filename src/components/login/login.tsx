import { Container, Button } from '@mui/material';
import React from "react";
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { PagesTitle } from "../pagesTitle/pagesTitle";
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';
// import { Location } from "history";

interface LocationState {
  from: {
    pathname: string
  };
}



const Login = observer(() => {
  let navigate = useNavigate();
  let location = useLocation();
  const from = (location.state as LocationState)?.from;

  const handleAuth = async () => {
    await authStore.login()
    navigate(from?.pathname || '/');
  }

  return (
    <Container maxWidth='lg' sx={{
      marginBottom: 10,
      position: 'relative',
      marginTop: '102px'
    }}>
      <PagesTitle title="Авторизация" />

      <Button
        variant="contained"
        color="success"
        onClick={handleAuth}
      >
        Success
      </Button>

    </Container>

  )
})

export default Login;