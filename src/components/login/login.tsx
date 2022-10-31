import React from "react";
import { Button, Paper, Typography } from '@mui/material';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { PagesTitle } from "../pagesTitle/pagesTitle";
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';
// import { Location } from "history";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';



const AuthFormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthForm = styled.div`
  width: 50%;
  max-width: 500px;
  min-width: 300px;
  height: 310px;
  min-height: 310px;
  padding: 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .8);
`;


interface LocationState {
  from: {
    pathname: string
  };
}



const Login = observer(() => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from;

  const handleAuth = async () => {
    await authStore.login()
    navigate(from?.pathname || '/');
  }


  const handleClick = () => {
    setLoading(true);
  }

  return (
    <>
      {/* <PagesTitle title="Авторизация" /> */}

      {/* <Button
        variant="contained"
        color="success"
        onClick={handleAuth}
      >
        Success
      </Button> */}


      <AuthFormContainer>
        <AuthForm>
        <Typography variant="h5" gutterBottom align="center">
          Авторизация
        </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              '& > :not(style)': {
                m: 1,
                width: '80%',
                maxWidth: 500,
                minWidth: 200,
                height: 50,
              },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField
              id="standard-helperText"
              label="e-mail"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />

            <Button
              variant="contained"
              onClick={handleClick}

            >
              Войти
            </Button>

          </Box>
        </AuthForm>

      </AuthFormContainer>



    </>

  )
})

export default Login;