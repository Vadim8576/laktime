import React from "react";
import { PagesTitle } from '../../pagesTitle/pagesTitle';
import { Spiner } from '../../ui/spiner';
import styled from "styled-components";
import image from '../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import PortfolioExamples from '../../ui/portfolioExamples';
import FlexContainer from '../../ui/flexContainer';


const content = <div>
  <p style={{ color: 'black', fontSize: '22px' }}>
    Нет ничего лучше нового маникюра!
    Вы не полностью одеты, пока не сделаете маникюр.
    Счастье нельзя купить, но можно купить маникюр.
    Хороший маникюр дополнит ваш образ.
  </p>
  <p style={{ color: 'black', fontSize: '22px' }}>
    У самых счастливых девушек самый красивый маникюр.
    Красивые ногти!
    Красивые ногти для красивой леди.
    Идеальный маникюр.
    Искусный нейл-арт.
  </p>
  <p style={{ color: 'black', fontSize: '22px' }}>
    Полюбите свои ногти немного больше.
    Влюбись в искусство.
    Дизайн, который заставит вас вернуться к нам.
    Больше гламура.
    Пора обновить маникюр.
    Ногтевой сервис по доступным ценам.
    Просто гламур.
  </p>
  <p style={{ color: 'black', fontSize: '22px' }}>
    Время украсить себя.
    Балуй себя.
    Выбери красоту.
    Лечебный маникюр.
  </p>
</div>



export const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`

interface IMediaArea {
  image: string;
}
export const MediaArea = styled.div<IMediaArea>`
  width: 400px;
  min-width: 300px;
  height: 600px;
  max-height: 70%;
  background-image: url(${image});
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`
export const TextArea = styled.div`
  width: calc(100% - 400px - 30px - 20px);
  min-width: 300px;
  margin-right: 30px;
  margin-bottom: 50px;
`


const PortfolioPage = observer(() => {

  return (
    <>
      {/* <Spiner open={portfolioIsLoading} /> */}
      <PagesTitle title={'О ЛакТайм'} />
      <FlexWrapper>
        <TextArea>
          {content}
        </TextArea>
        <MediaArea image={image} />
      </FlexWrapper>


      {/* <FlexContainer>
        {content}
        <></>
      </FlexContainer> */}

      <PortfolioExamples />
    </>
  )
})


export default PortfolioPage;