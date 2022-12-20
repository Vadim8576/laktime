import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import authStore from '../../store/authStore';
import { observer } from 'mobx-react-lite';
import { Checkbox, IconButton } from '@mui/material';


interface IDeleteButtonContainerProps {
  hover: boolean;
}

const DeleteButtonContainer = styled.div<IDeleteButtonContainerProps>`
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, .2);
  transition: .5s all;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  event-pointer: none;
  padding: 0 3px;
`

interface IDeleteButtonBackProps {
  hover: boolean;
}

const DeleteButtonBack = styled.div<IDeleteButtonBackProps>`
  opacity: ${(props) => (props.hover ? 1 : 1)};
  background-color: none;
  transition: .5s all;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 50%;
`

interface IDeleteButtonProps {
  deleteButtonClickHandler: () => void;
}

const DeleteButton: FC<IDeleteButtonProps> = observer(({ ...props }) => {

  const { isAuth } = authStore;
  const [hover, setHover] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const { deleteButtonClickHandler } = props;

  const handlerClick = useCallback(() => {
    deleteButtonClickHandler();
  }, [])

  const mouseEnterHandler = useCallback(() => {
    setHover(true);
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setHover(false);
  }, [])

  if (!isAuth) return null;

  return (
    <DeleteButtonContainer
      hover={hover}
      onMouseMove={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
    >
      <Checkbox checked={checked} />
      <DeleteButtonBack
        hover={hover}
        onClick={handlerClick}
      >
        <IconButton aria-label="delete">
          {/* <DeleteIcon /> */}
          <ClearIcon color='action' fontSize='medium' />
        </IconButton>
        
      </DeleteButtonBack>
    </DeleteButtonContainer>
  )
})

export default DeleteButton;