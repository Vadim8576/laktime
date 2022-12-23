import React from 'react'
import { useLocation } from 'react-router-dom';
import { WithPageContainer } from '../../hoc/withPageContainer';
import { Button, Link } from '@mui/material';
import styled from 'styled-components';

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

const FooterHeaderLine = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0 80px;
`

const FooterSide = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const FooterContentLine = styled.div`
  width: 100%;
  display: flex;

`

const FooterSideItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 40px 0;
`




const Footer = () => {
  const location = useLocation();

  // const history = useHistory();
  // console.log(history);

  if (location.pathname === '/login') return null;
  return (
    <>
      <FooterHeaderLine>
        <FooterSide style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: '30px',
          fontSize: '20px'
        }}
        >
          <Link href="#" underline="hover">О Laktime</Link>
          <Link href="#" underline="hover">Услуги и цены</Link>
          <Link href="#" underline="hover">Портфолио</Link>
          <Link href="#" underline="hover">Контакты</Link>
        </FooterSide>
        <FooterSide style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: '30px'
        }}
        >
          <Link
            href="#"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '3px', color: '#bdbdbd' }}>
              <InstagramIcon />
            </span>
            Instagram
          </Link>

          <Link
            href="#"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '3px', color: '#bdbdbd' }}>
              <WhatsAppIcon />
            </span>
            WhatsApp
          </Link>

          <Link
            href="#"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '3px', color: '#bdbdbd' }}>
              <TelegramIcon />
            </span>
            Telegram
          </Link>

        </FooterSide>
      </FooterHeaderLine>

      <FooterContentLine>
        <FooterSide>
          <FooterSideItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>г. Псков,</div>
            <div>ул. Юбилейная, д. 58</div>
          </FooterSideItem>
          <FooterSideItem>
            <div>+7(999) 999 99 99</div>
          </FooterSideItem>
          <FooterSideItem>
            <div style={{ fontSize: '40px' }}>LAKTIME</div>
          </FooterSideItem>
        </FooterSide>

        <FooterSide>
          <FooterSideItem />
          <FooterSideItem style={{ justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              sx={{
                color: '#fff',
                border: '1px #bdbdbd solid'
              }}>
              Записаться
            </Button>
          </FooterSideItem>
        </FooterSide>
      </FooterContentLine>
    </>
  )
}


export default Footer;