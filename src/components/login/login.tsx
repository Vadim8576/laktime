import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AuthContainer, headerStyle, FormWrapper, formStyle } from './loginStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';


interface LocationState {
  from: {
    pathname: string
  };
}

const Login = observer(() => {

  const [isLogining, setIsLogining] = useState<boolean>(false);
  const { isAuth } = authStore;
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from;

  useEffect(() => {
    isAuth && navigate(from?.pathname || '/');
  }, [isAuth])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string()
    .label('confirm password').required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    setIsLogining(true);
    authStore.login(data);
  }

  if(isAuth) return null;

  return (
    <AuthContainer>
      <Box
        sx={headerStyle}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#fff' }}
        >
          Авторизация
        </Typography>
      </Box>
      <FormWrapper>
        <Box
          component="form"
          sx={formStyle}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-helperText"
            label="e-mail"
            {...register('email')}
            error={errors.email ? true : false}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password ? true : false}
          />
        </Box>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          loading={isLogining}
          loadingPosition="center"
          variant="contained"
        >
          Войти
        </LoadingButton>
      </FormWrapper>
    </AuthContainer>
  )
})

export default Login;