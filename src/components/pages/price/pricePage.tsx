import React from "react";
import Container from '@mui/material/Container';
import { PriceCard } from "./priceCard";
import Grid from '@mui/material/Grid';
import { PageTitle } from '../../pageTitle/pageTitle';

export interface IPriceList {
    id: number;
    service: string;
    price: string;
    active: boolean;
    description?: string
}

export interface IPriceListsProps {
    priceList: IPriceList[]
}

const priceCardList: React.FC<IPriceListsProps> = ({ priceList }) => {
    return (
        <>
            <PageTitle title={'Услуги и стоимость'} />

            <Container maxWidth='lg' sx={{     
                background: '#fff',
                padding: '24px'
            }}>
                <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {priceList?.map((price) => (
                        <Grid item xs={12} sm={4} md={4} key={price.id}>
                            <PriceCard key={price.id} price={price} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}


export default priceCardList;