import React, { useEffect } from "react";
import { Slide, Typography } from "@mui/material";
import styled from "styled-components";
import ContentCutIcon from '@mui/icons-material/ContentCut';

const TitleContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  max-height: 500px;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Title = styled.div`
`

const Scissors = styled.span`
  transform: scale(1.2) rotate(270deg);
  display: inline-flex;
`

interface IFullScreenTitleProps {
  title: string;
}

export const FullScreenTitle = ({ title }: IFullScreenTitleProps) => {

  useEffect(() => {
    
  }, [])

  return (
    <TitleContainer>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Title>
          <Typography
            variant='h1'
            component='h1'
            align='center'
            mb={4}
            sx={{
              letterSpacing: '10px',
              padding: '0',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: 1,
              whiteSpace: 'nowrap'
            }}
          >
            Lak
            <Scissors><ContentCutIcon /></Scissors>
            time
          </Typography>
          <Typography
            variant='h4'
            component='h4'
            align='left'
            mb={4}
            sx={{
              letterSpacing: '3px',
              padding: '0',
              textTransform: 'uppercase',
              color: '#8e8e8f'
            }}
          >
            {title}
          </Typography>
        </Title>
      </Slide>
    </TitleContainer>
  )
}

