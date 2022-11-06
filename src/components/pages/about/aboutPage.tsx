import React from "react";
import { PagesTitle } from '../../pagesTitle/pagesTitle';
import { Spiner } from '../../ui/spiner';

import { observer } from "mobx-react-lite";


const content = <div><p style={{color: 'red'}}>Какой-то текст о <strong>ЛакТайм</strong></p></div>



const PortfolioPage = observer(() => {


  return (
    <>
      {/* <Spiner open={portfolioIsLoading} /> */}
      <PagesTitle title={'О ЛакТайм'} />
      {content}
    </>
  )
})


export default PortfolioPage;