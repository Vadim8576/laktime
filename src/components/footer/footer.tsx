import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import styled from 'styled-components';
import SocialIcons from '../widgets/socialIcons';

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const FooterLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 20px 0;
`




const Footer = () => {
  const location = useLocation();

  // const history = useHistory();
  // console.log(history);

  if (location.pathname === '/login') return null;
  return (
    <>
      <SocialIcons />

      <FooterContent>

        <FooterLine style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div>г. Псков,</div>
          <div>ул. Юбилейная, д. 58</div>
        </FooterLine>

        <FooterLine>
          <div>+7(999) 999 99 99</div>
        </FooterLine>

        <FooterLine style={{
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div>Часы работы:</div>
          <div>Пн - Пт с 9.00 до 18.00</div>
        </FooterLine>

        <FooterLine style={{
          justifyContent: 'flex-end'
        }}>
          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              border: '1px #bdbdbd solid',
              fontSize: '24px'
            }}>
            Записаться
          </Button>
        </FooterLine>

        <FooterLine style={{ fontSize: '40px', color: '#bdbdbd' }}>
          LAKTIME
        </FooterLine>

      </FooterContent>
    </>
  )
}


export default Footer;