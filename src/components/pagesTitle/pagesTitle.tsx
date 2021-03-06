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

export const PagesTitle: React.FC<IPageTitle> = ({ title }) => {
  return (
    <>
      <Typography
        variant='h4'
        component='h1'
        align='left'
        
        mb={4}
        sx={{
          letterSpacing: '1.5px',
          padding: '0 24px 0 24px'
        }}
      >
        {title}
      </Typography>
      {/* <Divider /> */}
    </>
  )
}

