import React from "react";
import { Typography } from "@mui/material";

export const PagesTitle = ({ title }: { title: string }) => {
  return (
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
  )
}

