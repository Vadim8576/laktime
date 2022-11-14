import React from "react";
import { PagesTitle } from '../../widgets/pagesTitle';
import { Spiner } from '../../ui/spiner';
import styled from "styled-components";
import image from '../../../images/professional-manicure-tools.jpg';
import { observer } from "mobx-react-lite";
import PortfolioExamples from '../../widgets/portfolioExamples';
import FlexContainer from '../../widgets/flexContainer';


const content = <>
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
</>




const PortfolioPage = observer(() => {

  return (
    <>
      <PagesTitle title='О Лактайм' />
      <FlexContainer textSide='left' image={image}>
        {content}
      </FlexContainer>

      <PortfolioExamples />
    </>
  )
})


export default PortfolioPage;