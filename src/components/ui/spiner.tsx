import React, { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface ISpinerProps {
  open: boolean
}

export const Spiner: FC<ISpinerProps> = ({ open }) => {

  if(!open) return null;
  
  return (
    <Backdrop
      sx={{
        background: 'none',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.appBar - 1
      }}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}