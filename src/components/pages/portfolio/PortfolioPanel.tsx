import React from "react";
import styled from "styled-components";
import { Container, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Event } from './portfolio';
import { observer } from 'mobx-react-lite';


const Panel = styled.div`
  width: 100%;
  height: 80px;
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
`;


interface IPortfolioPanelProps {
  changeHandler: (e: Event<HTMLInputElement>) => void;
  uploadHandler: () => void;
  removeAllHandler: () => void;
}

const PortfolioPanel: React.FC<IPortfolioPanelProps> = observer(({ ...props }) => {

  const {changeHandler, uploadHandler, removeAllHandler} = props;

  return (
    <Panel>
      <Container sx={{ height: '100%' }}>
        <Stack direction="row" height="100%" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="contained" component="label">
            Выбрать изображения
            <input hidden accept="image/*" multiple type="file" onChange={changeHandler} />
          </Button>
          <Button onClick={uploadHandler}>Загрузить</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={removeAllHandler}>
            Удалить все
          </Button>
        </Stack>
      </Container>
    </Panel>
  )
})


export default PortfolioPanel;