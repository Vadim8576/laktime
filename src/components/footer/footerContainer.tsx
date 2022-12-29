import React from 'react'
import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Footer from './footer';
import styled from 'styled-components';


const FooterFooterLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 20px 0;
  background-color: #000;
  color: #878585;
  
`

const FooterContainer = () => {
  const location = useLocation();

  // const history = useHistory();
  // console.log(history);

  if (location.pathname === '/login') return null;
  return (
    <>
      <Box
        sx={{
          width: '100%',
          // height: 500,
          backgroundColor: '#231f20',
          padding: '60px 30px',
          color: '#fff'
        }}>
        <Container
          maxWidth='lg'
          sx={{
            marginTop: '0',
            color: '#8d8c8c'
          }}
        >
          <Footer />
        </Container>

      </Box>
      <FooterFooterLine>
        &copy;SpaVaVa
      </FooterFooterLine>
    </>
  )
}

export default FooterContainer;