import React from "react";
import styled from "styled-components";
import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Event } from '../pages/portfolio/portfolio';
import { observer } from 'mobx-react-lite';
import authStore from "../../store/authStore";



const Panel = styled.div`
  width: 100%;
  height: 70px;
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, .9);
`;


interface IPortfolioPanelProps {
  changeHandler: { (e: Event<HTMLInputElement>): void } | null;
  addHandler: {(): void} | null;
  removeAllHandler: () => void;
}

const EditPanel: React.FC<IPortfolioPanelProps> = observer(({ ...props }) => {

  const { isAuth } = authStore;

  const { changeHandler, addHandler, removeAllHandler } = props;

  if(!isAuth) return null;

  return (
    <Panel>
      <Container sx={{ height: '100%' }}>
        <Stack direction="row" height="100%" justifyContent="flex-end" alignItems="center" spacing={4}>
          <ChangeImageButton changeHandler={changeHandler} />
          {addHandler && <Button onClick={addHandler}>Добавить</Button>}
          <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={removeAllHandler}>
            Удалить все
          </Button>
        </Stack>
      </Container>
    </Panel>
  )
})

export default EditPanel;



interface IChangeImageButtonProps {
  changeHandler: { (e: Event<HTMLInputElement>): void } | null;
}

const ChangeImageButton: React.FC<IChangeImageButtonProps> = ({ ...props }) => {
  const {changeHandler} = props;
  if(!changeHandler) return null;
  return (
    <Button variant="contained" component="label">
      Выбрать изображения
      <input hidden accept=".png, .jpg" multiple type="file" onChange={changeHandler} />
    </Button>
  )
}