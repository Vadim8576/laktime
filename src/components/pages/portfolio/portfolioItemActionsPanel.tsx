import React, { useState } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import authStore from '../../../store/authStore';
import { observer } from 'mobx-react-lite';
import { Checkbox, IconButton } from '@mui/material';


interface IDeleteButtonContainerProps {
  checked: boolean;
}

const ActionsPanel = styled.div<IDeleteButtonContainerProps>`
  width: 100%;
  height: 40px;
  background-color: ${(props) => (props.checked
    ? 'rgba(255, 255, 255, .9)'
    : 'rgba(127, 127, 127, .8)')};
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

interface IDeleteButtonWrapperProps {
  hover: boolean;
}

// opacity: ${(props) => (props.hover ? 1 : 1)};
const DeleteButtonWrapper = styled.div<IDeleteButtonWrapperProps>`
  background-color: none;
  transition: .5s all;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 50%;
`

interface IPortfolioItemActionsPanelProps {
  panelActions: any;
  checked: boolean;
}

const PortfolioItemActionsPanel = observer(({ ...props }: IPortfolioItemActionsPanelProps) => {

  const { isAuth } = authStore;
  const [ hover, setHover ] = useState<boolean>(false);
  const { panelActions, checked } = props;

  const onClickHandler = () => {
    panelActions.deleteButtonOnClick();
  }

  const onChangeHandler = () => {
    panelActions.checkboxOnChange();
  }

  const mouseEnterHandler = () => {
    setHover(true);
  }

  const mouseLeaveHandler = () => {
    setHover(false);
  }

  if (!isAuth) return null;

  return (
    <ActionsPanel
      checked={checked}
      onMouseMove={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
    >
      <Checkbox
        checked={checked}
        onChange={onChangeHandler}
      />
      <DeleteButtonWrapper
        hover={hover}
        onClick={onClickHandler}
      >
        <IconButton aria-label="delete">
          <ClearIcon color='action' fontSize='medium' />
        </IconButton>
      </DeleteButtonWrapper>
    </ActionsPanel>
  )
})

export default PortfolioItemActionsPanel;