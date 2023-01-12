import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../../../store/authStore";
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Checkbox } from '@mui/material';
import { useCheckBox } from "../../../../hooks/useCheckBox";

interface IServiceHeaderProps {
  setAnchorEl: (anchor: null | HTMLElement) => void;
  servicename: string;
  id: number;
  idsOfSelectedItems: number[];
  setIdsOfSelectedItems: (arr: any) => void;
}

const ServiceItemHeader = observer(({ ...props }: IServiceHeaderProps) => {

  const { isAuth } = authStore;
  const { setAnchorEl, servicename, id, idsOfSelectedItems, setIdsOfSelectedItems } = props;

  const { setNewIds, checkboxChecked } = useCheckBox();
  const checked = checkboxChecked(idsOfSelectedItems, id);


  const handleSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const changeHandler = useCallback(() => {
    setIdsOfSelectedItems((ids: number[]) => setNewIds(ids, id));
  }, [id]);

  return (
    <CardHeader
      sx={{
        backgroundColor: 'none'
      }}
      avatar={
        isAuth
          ? <Checkbox
            checked={checked}
            sx={{
              visibility: isAuth ? 'visible' : 'hidden',
              width: isAuth ? 'auto' : 0
            }}
            onChange={changeHandler}
          />
          : null
      }
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
      title={
        <Link
          to={`../card-detail/${id}`}
          style={{
            color: '#000',
            outline: 'none',
            textDecoration: 'none',
            fontSize: '1.2rem'
          }}
        >
          {servicename}
        </Link>
      }
    />
  )
})

export default ServiceItemHeader;