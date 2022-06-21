import React from "react";
import { Box, Container, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IPriceList } from '../../../../store/priceStoreTypes';
import { PriceCardItem } from '../grid/priceCardItem';
import { PriceStackItem } from "./priceStackItem";


interface IPriceStackProps {
  priceList: IPriceList[]
}

export const PriceStack: React.FC<IPriceStackProps> = ({ priceList }) => {
  return (
    <Container>
      <Stack>
        {priceList.map((price: IPriceList) => (
          <Box
            key={price.id}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              marginBottom: 3
            }}
          >
            <PriceStackItem price={price} />
          </Box>
        ))}
      </Stack>
    </Container>
  )
}