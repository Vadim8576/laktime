import React, { FC } from "react";
import { Slide, Typography } from "@mui/material";
import styled from "styled-components";


const TitleContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Title = styled.div`
`

interface IFullScreenTitleProps {
  title: string;
}

export const FullScreenTitle: FC<IFullScreenTitleProps> = ({ title }) => {
  return (
    <TitleContainer>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
              marginBottom: 1
            }}
          >
            Laktime
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

