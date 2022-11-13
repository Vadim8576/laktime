import { observer } from "mobx-react-lite";
import React from "react";
import authStore from "../../../../store/authStore";
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface IMyCardHeaderProps {
  setAnchorEl: (anchor: null | HTMLElement) => void;
  servicename: string;
  id: string;
}

const MyCardHeader: React.FC<IMyCardHeaderProps> = observer(({ ...props }) => {

  const { isAuth } = authStore;

  const { setAnchorEl, servicename, id } = props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          L
        </Avatar>
      }
      action={
        <IconButton aria-label="settings" onClick={handleClick} disabled={!isAuth}>
          <MoreVertIcon />
        </IconButton>
      }
      title={servicename}
      subheader={id}
    />
  )
})

export default MyCardHeader;