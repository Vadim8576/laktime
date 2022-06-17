import React from "react";
import { PriceCard } from "./priceCard";
import Grid from '@mui/material/Grid';
import priceStore from "../../../store/priceStore";
import { observer } from "mobx-react-lite";
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, Grow } from "@mui/material";


const priceListPage: React.FC = observer(() => {
    return (
        <>
            {!priceStore.isLoading 
                ?
                <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {priceStore?.priceList?.map((price, index) => (
                        <Grid item xs={12} sm={4} md={4} key={price.id}>
                            {/* <Grow in={true}> */}
                                <PriceCard key={price.id} price={price} />
                            {/* </Grow> */}
                        </Grid>
                    ))}
                </Grid>
                :
                <Backdrop
                    sx={{ background: 'none', color: '#fff', zIndex: (theme) => theme.zIndex.appBar - 1 }}
                    open={priceStore.isLoading}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
            }
        </>
    )
})


export default priceListPage;