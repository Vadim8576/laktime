import { observer } from "mobx-react-lite";
import React from "react";
import authStore from "../../../../store/authStore";
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface IServiceItemHeaderProps {
  setAnchorEl: (anchor: null | HTMLElement) => void;
  servicename: string;
  id: string;
}

const ServiceItemHeader: React.FC<IServiceItemHeaderProps> = observer(({ ...props }) => {

  const { isAuth } = authStore;
  const { setAnchorEl, servicename, id } = props;
  const handleSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <CardHeader
      sx={{
        backgroundColor: 'none',
        paddingTop: '1px',
        paddingBottom: '5px' 
      }}
      action={
        <IconButton
          aria-label="settings"
          onClick={handleSettingClick}
          disabled={!isAuth}
          sx={{
            visibility: isAuth ? 'visible' : 'hidden'
          }}
        >
          <MoreVertIcon />
        </IconButton>
      }
      title={servicename}
    />
  )
})

export default ServiceItemHeader;