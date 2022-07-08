import { AddOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

const actions = [
  { icon: <AddOutlined />, name: 'Добавить' },
  { icon: <DeleteSweepOutlinedIcon />, name: 'Удалить все' },
];


interface IEditMenu {
  action: (open: boolean) => void;
}

const EditMenu: React.FC<IEditMenu> = ({ action }) => {

  const handleSpeedDialClick = (event:  React.MouseEvent<HTMLElement>) => {
    let target = event.currentTarget.ariaLabel
    console.log(target)
    if(target === 'Добавить') action(true);
    if(target === 'Удалить все') {
      // action(true);
      console.log('Удалить все')
    }
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: 'fixed',
        bottom: 50,
        right: 'calc(50% - 28px)'
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleSpeedDialClick}
        />
      ))}
    </SpeedDial>
  )
}

export default EditMenu;