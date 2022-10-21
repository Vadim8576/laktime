import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import authStore from '../../store/authStore';
import { observer } from 'mobx-react-lite';


interface IDeleteButtonContainer {
  hover: boolean;
}
const DeleteButtonContainer = styled.div<IDeleteButtonContainer>`
  background-color: ${(props) => (props.hover ? 'rgba(0, 0, 0, .5)' : 'none')};
  transition: .5s all;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

interface IDeleteButtonBack {
  hover: boolean;
}
const DeleteButtonBack = styled.div<IDeleteButtonBack>`
  opacity: ${(props) => (props.hover ? .8 : .3)};
  background-color: #fff;
  transition: .5s all;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 5px;
  padding: 5px;
  border-radius: 50%;
`


interface IDeleteButtonProps {
  handlerDeleteButtonClick: () => void;
}


const DeleteButton: React.FC<IDeleteButtonProps> = observer(({ ...props }) => {

  const { handlerDeleteButtonClick } = props;
  const { isAuth } = authStore;
  const [hover, setHover] = useState<boolean>(false);

  const mouseEnterHandler = useCallback(() => {
    setHover(true);
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setHover(false);
  }, [])

  const handlerClick = useCallback(() => {
    handlerDeleteButtonClick();
  }, [])


  if(!isAuth) return null;

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
        <DeleteOutlinedIcon fontSize='medium' />
      </DeleteButtonBack>
    </DeleteButtonContainer>
  )
})

export default DeleteButton;