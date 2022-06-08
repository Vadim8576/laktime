import { Divider, Typography } from "@mui/material";
import React from "react";

export interface IPageTitle {
  // variant: "inherit" |
  // "button" |
  // "caption" |
  // "h1" |
  // "h2" |
  // "h3" |
  // "h4" |
  // "h5" |
  // "h6" |
  // "overline" |
  // "subtitle1" |
  // "subtitle2" |
  // "body1" |
  // "body2" |
  // undefined;
  title: string;
}

export const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  // const { variant, text } = params;
  return (
    <>
      <Typography
        variant='h3'
        component='h1'
        align='center'
        mt={12}
        mb={3}
        sx={{ letterSpacing: '2px' }}
      >
        {title}
      </Typography>
      <Divider />
    </>
  )
}

