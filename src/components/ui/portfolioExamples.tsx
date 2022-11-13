import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const PortfolioArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  min-width: 300px;
`
const PortfolioItem = styled.div`
  width: 200px;
  height: 250px;
  max-height: 250px;
  border: 2px #000 solid;
  background-color: cornflowerblue;
  flex: 1 1 1 calc((100% / 4) - 2rem);
`
const MoreItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 250px;
  max-height: 250px;
  flex: 1 1 1 calc((100% / 4) - 2rem);
`

const listItems = [0, 1, 2, 3, 4];

const PortfolioExamples = observer(() => {
  return (
    <PortfolioArea>
      {
        listItems.map(item => {
          return (
            (item < 4)
              ? <PortfolioItem key={item}>{item}</PortfolioItem>
              : <MoreItems key={item}>Еще работы...</MoreItems>
          )
        }
        )}
    </PortfolioArea>
  )
})


export default PortfolioExamples;