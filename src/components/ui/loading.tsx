import { Backdrop } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    
    <Backdrop
    sx={{ background: 'none', color: '#fff', zIndex: (theme) => theme.zIndex.appBar - 1 }}
    open={true}
  >
    <h1 style={{marginTop: '70px', color: 'red'}}>Loadding</h1>
  </Backdrop>
  )
}


export default Loading;