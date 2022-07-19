import React, {useCallback} from "react";
import { AddOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import useConfirm from "../../hooks/useConfirm";
import priceStore from "../../store/priceStore";


const actions = [
  { icon: <AddOutlined />, name: 'Добавить' },
  { icon: <DeleteSweepOutlinedIcon />, name: 'Удалить все' },
];


interface IEditMenu {
  action: (open: boolean) => void;
}

const EditMenu: React.FC<IEditMenu> = ({ action }) => {


  const { confirm } = useConfirm();

  const showConfirm = async () => {
    let isConfirmed = await confirm('Удалить все записи?');
    if(isConfirmed) priceStore.deleteAllPrice();   
  }

  const handleSpeedDialClick = useCallback((event:  React.MouseEvent<HTMLElement>) => {
    let target = event.currentTarget.ariaLabel
    if(target === 'Добавить') action(true);
    if(target === 'Удалить все') {
      showConfirm();
    }
  }, [])

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