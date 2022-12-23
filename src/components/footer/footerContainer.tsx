import React from 'react'
import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Footer from './footer';
import styled from 'styled-components';


const FooterFooterLine = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
  background-color: #000;
  color: #878585;
  justify-content: center;
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
            color: '#bdbdbd'
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