import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import authStore from '../../store/authStore';
import { observer } from 'mobx-react-lite';


interface IDeleteButtonContainerProps {
  hover: boolean;
}

const DeleteButtonContainer = styled.div<IDeleteButtonContainerProps>`
  background-color: none;
  transition: .5s all;
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  event-pointer: none;
`

interface IDeleteButtonBackProps {
  hover: boolean;
}

const DeleteButtonBack = styled.div<IDeleteButtonBackProps>`
  opacity: ${(props) => (props.hover ? 1 : .6)};
  background-color: none;
  transition: .5s all;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
`

interface IDeleteButtonProps {
  deleteButtonClickHandler: () => void;
}

const DeleteButton: FC<IDeleteButtonProps> = observer(({ ...props }) => {

  const { isAuth } = authStore;
  const [hover, setHover] = useState<boolean>(false);
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
      <DeleteButtonBack
        hover={hover}
        onClick={handlerClick}
      >
        <DeleteForeverOutlinedIcon fontSize='large' sx={{ color: '#fff' }} />
      </DeleteButtonBack>
    </DeleteButtonContainer>
  )
})

export default DeleteButton;