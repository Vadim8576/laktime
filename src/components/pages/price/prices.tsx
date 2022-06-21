import React from "react";
import { observer } from "mobx-react-lite";
import { PriceGrid } from "./grid/priceGrid";
import { PriceStack } from "./stack/priceStack";
import { IPriceList } from "../../../store/priceStoreTypes";


interface IPricesProps {
    view: string;
    priceList: IPriceList[]
}


const Prices: React.FC<IPricesProps> = observer(({ view, priceList }) => {
    
    return (
        <>
            {view === 'list' //module
                ?
                <PriceStack priceList={priceList} />
                :
                <PriceGrid priceList={priceList} />
            }
        </>
    )
})


export default Prices;