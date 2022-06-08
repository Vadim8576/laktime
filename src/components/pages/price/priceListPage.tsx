import React from "react";
import Container from '@mui/material/Container';
import { PriceCard } from "./priceCard";
import Grid from '@mui/material/Grid';
import { PageTitle } from '../../pageTitle/pageTitle';
import priceStore from "../../../store/priceStore";
import { observer } from "mobx-react-lite";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Divider } from "@mui/material";


const priceListPage: React.FC = observer(() => {
    return (
        <>
            <PageTitle title={'Услуги и цены'} />

            <Container maxWidth='lg' sx={{
                background: '#fff',
                padding: '24px',
                position: 'relative'
            }}>
                {!priceStore.isLoading ?
                    <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {priceStore?.priceList?.map((price) => (
                            <Grid item xs={12} sm={4} md={4} key={price.id}>
                                <PriceCard key={price.id} price={price} />
                            </Grid>
                        ))}
                    </Grid>
                    : <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100vw',
                        height: '100vh'
                    }}>
                        <CircularProgress />
                    </Box>
                }
            </Container>
        </>
    )
})


export default priceListPage;