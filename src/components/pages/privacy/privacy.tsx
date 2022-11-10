import React from "react";
import { PagesTitle } from '../../pagesTitle/pagesTitle';
import { Spiner } from '../../ui/spiner';
import { observer } from "mobx-react-lite";
import { privacyText } from './privacyText';


const PortfolioPage = observer(() => {
  return (
    <>
      {/* <Spiner open={portfolioIsLoading} /> */}
      <PagesTitle title="Политика в отношении обработки персональных данных:" />
      <div>
        <p>
          {privacyText}
        </p>
      </div>
    </>
  )
})


export default PortfolioPage;



