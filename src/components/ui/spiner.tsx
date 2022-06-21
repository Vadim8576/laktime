import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface ISpinerProps {
  open: boolean
}

export const Spiner: React.FC<ISpinerProps> = ({ open }) => {

  return (
    <Backdrop
      sx={{ background: 'none', color: '#fff', zIndex: (theme) => theme.zIndex.appBar - 1 }}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}