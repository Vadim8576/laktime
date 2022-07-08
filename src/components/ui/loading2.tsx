import React from "react";
import { Backdrop, Typography } from "@mui/material";
import style from './loading2.module.css';


const Loading2 = () => {
  return (

    <Backdrop
      sx={{
        background: 'none',
        color: '#fff',
        flexDirection: 'column',
        zIndex: (theme) => theme.zIndex.appBar - 1
      }}
      open={true}
    >
      <div className={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Typography sx={{color: '#999'}} variant="overline" display="block" gutterBottom>
        Loading...
      </Typography>

    </Backdrop>
  )
}


export default Loading2;