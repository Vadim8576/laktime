import React from "react";
import { Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import styled from "styled-components";
import useMediaQuery from '@mui/material/useMediaQuery';


interface ISocialIconsContainer {
  matches: boolean;
}

const SocialIconsContainer = styled.div<ISocialIconsContainer>`
  width: 100%;
  display: flex;
  ${(props) => props.matches ? 'gap: 10px' : 'gap: 20px'};
  padding: 0 0 40px;
  justify-content: flex-end;
`

const Span = styled.span`
  margin-right: 3px;
  color: #bdbdbd;
`

const style = {
  display: 'flex',
  alignItems: 'center',
  color: '#8d8c8c'
}


interface ISocialIconsProps {
  
}

const SocialIcons = () => {

  const matches = useMediaQuery('(max-width:450px)');

  return (
    <SocialIconsContainer matches={matches}>
      <Link
        href="#"
        underline="hover"
        sx={style}
      >
        <Span>
          <InstagramIcon />
        </Span>
        {!matches && 'Instagram'}
      </Link>

      <Link
        href="#"
        underline="hover"
        sx={style}
      >
        <Span>
          <WhatsAppIcon />
        </Span>
        {!matches && 'WhatsApp'}
      </Link>

      <Link
        href="#"
        underline="hover"
        sx={style}
      >
        <Span>
          <TelegramIcon />
        </Span>
        {!matches && 'Telegram'}
      </Link>

    </SocialIconsContainer>
  )
}

export default SocialIcons;