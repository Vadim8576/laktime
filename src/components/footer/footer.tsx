import React from 'react'
import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const location = useLocation();

  // const history = useHistory();
  // console.log(history);

  if(location.pathname === '/login') return null;
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: 500,
          backgroundColor: '#231f20',
          padding: '40px 0'
        }}>
        <Container
          maxWidth='lg'
          sx={{
            marginBottom: 10,
            position: 'relative',
          }}
        >
          <p style={{color: 'white'}}>dklsjfklsdfjk asldfjal klasdj asldjas kldgj</p>
        </Container>

      </Box>
    </>
  )
}

export default Footer;