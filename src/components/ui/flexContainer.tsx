import React, { FC, ReactNode } from 'react';
import styled from "styled-components";
import pic from '../../../src/images/manicure.jpg';



const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`
const MediaArea = styled.div`
  width: 400px;
  min-width: 300px;
  height: 600px;
  max-height: 70%;
  background-image: url(${pic});
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`
const TextArea = styled.div`
  width: calc(100% - 400px - 30px - 20px);
  min-width: 300px;
  margin-right: 30px;
  margin-bottom: 50px;
`


interface IFlexContainer {
  children: ReactNode[];
}


const FlexContainer: FC<IFlexContainer> = ({children}) => {

  console.log(children)

  return (
    <Wrapper>
      <TextArea>
        {children}
      </TextArea>
      <MediaArea />
    </Wrapper>
  )
}

export default FlexContainer;