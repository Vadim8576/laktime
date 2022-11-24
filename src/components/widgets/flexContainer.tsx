import React, { useState, FC, ReactNode } from 'react';
import styled from "styled-components";
import { Skeleton, useMediaQuery } from '@mui/material';
import { useLoadImage } from '../../hooks/useLoadImage';
import { observer } from 'mobx-react-lite';

type TextSideType = 'left' | 'right';

interface ITextSideProps {
  textSide: TextSideType;
  matches?: boolean;
}
export const FlexWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
`
export const GridWrapper = styled.div<ITextSideProps>`
  display: grid;
  width: 100%;
  gap: 20px;
  ${(props) => {
    return props.matches
      ? (props.textSide === 'left')
        ? 'grid-template-areas: "A" "B";'
        : 'grid-template-areas: "B" "A";'
      : (props.textSide === 'left')
        ? 'grid-template-areas: "A B"; grid-template-columns: 60% 40%;'
        : 'grid-template-areas: "B A"; grid-template-columns: 60% 40%;'
  }}
`
export const TextArea = styled.div<ITextSideProps>`
  grid-area: A;
  justify-self: flex-start;
  min-width: 300px;
`

interface IMediaArea {
  image: string;
  transparency: boolean;
}
export const MediaArea = styled.div<IMediaArea>`
  opacity: ${(props) => (props.transparency ? 0 : 1)};
  transition: 1s all;
  grid-area: B;
  justify-self : center;
  width: calc(100% - 20px);
  min-width: 300px;
  height: 500px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`

interface IImgProps {
  transparency: boolean;
}

const Img = styled.img<IImgProps>`
  opacity: ${(props) => (props.transparency ? 0 : 1)};
  transition: 1s all;
  width: calc(100% - 20px);
  height: 500px;
  object-fit: cover;
  width: 100%;
  height: auto;
  flex-grow: 1;
  &:hover {
    cursor: pointer;
  }
`


interface IFlexContainerProps {
  textSide: TextSideType;
  image: string;
  children: ReactNode;
}

const FlexContainer: FC<IFlexContainerProps> = observer(({ ...props }) => {

  const { image, textSide, children } = props;

  console.log()
  // const imgIsLoading = useLoadImage(image);
  const matches = useMediaQuery('(max-width:820px)');

  const imgIsLoading = useLoadImage(image);

  console.log(imgIsLoading)

  return (
    <FlexWrapper>
      <GridWrapper textSide={textSide} matches={matches}>
        <TextArea textSide={textSide}>
          {children}
        </TextArea>
        {!imgIsLoading
          ? <MediaArea image={image} transparency={imgIsLoading} />
          : <Skeleton variant="rectangular" animation="wave" width={'calc(100% - 20px)'} height={'500px'} />
        }
      </GridWrapper>
    </FlexWrapper>
  )
})

export default FlexContainer;