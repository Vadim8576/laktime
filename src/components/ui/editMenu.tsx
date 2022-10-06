import React from "react";
import { AddOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import useConfirm from "../../hooks/useConfirm";
import usePayload from '../../hooks/usePayload';
import { observer } from "mobx-react-lite";
import formStore from "../../store/formStore";
import { MenuActionType } from '../pages/price/prices';


const actions = [
  { icon: <AddOutlined />, name: 'Добавить' },
  { icon: <DeleteSweepOutlinedIcon />, name: 'Удалить все' },
];


interface IEditMenuProps {
  setFormOpen: (open: boolean) => void;
  setMenuActionType: (actionType: MenuActionType) => void;
}

const EditMenu: React.FC<IEditMenuProps> = observer(({ setFormOpen, setMenuActionType }) => {

  const { formOnSubmit } = usePayload();
  const { confirm } = useConfirm();
  const showConfirm = async () => {
    let isConfirmed = await confirm('Удалить все записи?');
    if(isConfirmed) formOnSubmit('DELETE-ALL');   
  }

  const handleSpeedDialClick = (event:  React.MouseEvent<HTMLElement>) => {
    let target = event.currentTarget.ariaLabel
    if(target === 'Добавить') {
      formStore.clearDefaultFormData();
      setMenuActionType('ADD');
      setFormOpen(true);
    }
    if(target === 'Удалить все') {
      showConfirm();
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
})

export default EditMenu;