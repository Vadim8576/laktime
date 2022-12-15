import React, { FC } from "react";
import { Typography } from "@mui/material";

interface IPageTitleProps {
  title: string;
}

export const PagesTitle: FC<IPageTitleProps> = ({ title }) => {
  return (
    <>
      <Typography
        variant='h4'
        component='h1'
        align='left'
        mb={4}
        sx={{
          letterSpacing: '1.5px',
          padding: '0',
        }}
      >
        {title}
      </Typography>
    </>
  )
}

