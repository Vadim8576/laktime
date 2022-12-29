import React from "react";
import styled from "styled-components";
import { Container, Portal, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { observer } from 'mobx-react-lite';
import authStore from "../../store/authStore";
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import ImageChangeButton from "../ui/imageChangeButton";
import { Event } from "../../types/types";

const Panel = styled.div`
  width: 100%;
  height: 60px;
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, .9);
  box-shadow: 0 -2px 5px rgba(0,0,0,.2);
  box-shadow: 0px -2px -4px rgb(0,0,0,.2);
`;


interface IEditPanelProps {
  imageChangeHandler: { (e: Event<HTMLInputElement>): void } | null;
  addHandler: { (): void } | null;
  removeAllHandler: () => void;
  itemsSelected: boolean;
  clearCheckboxs: () => void;
}

const EditPanel = observer(({ ...props }: IEditPanelProps) => {

  const { isAuth } = authStore;
  const { imageChangeHandler, addHandler, removeAllHandler, itemsSelected, clearCheckboxs } = props;

  if (!isAuth) return null;

  return (
    <Portal>
      <Panel>
        <Container sx={{ height: '100%' }}>
          <Stack
            direction="row"
            height="100%"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <ImageChangeButton imageChangeHandler={imageChangeHandler} multiple={true} />

            {/* {addHandler && <Button onClick={addHandler}>Добавить</Button>} */}
            {addHandler &&
              <IconButton color='primary' onClick={addHandler}>
                <AddCircleOutlineOutlinedIcon
                  fontSize='large'
                />
              </IconButton>
            }

            {/* <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={removeAllHandler}
            >
              {deleteButtonText}
            </Button> */}
            <Tooltip title={itemsSelected ? 'Удалить выделенное' : 'Удалить все'}>
              <IconButton color="primary" aria-label="delete" onClick={removeAllHandler}>
                <DeleteIcon
                  fontSize='large'
                />
              </IconButton>
            </Tooltip>


            {itemsSelected  &&
              // <Button
              //   color="secondary"
              //   variant="outlined"
              //   onClick={clearCheckboxs}
              // >
              //   Снять выделение
              // </Button>
              <Tooltip title="Снять выделение">
                <IconButton color="primary" onClick={clearCheckboxs}>
                  <CheckBoxOutlineBlankOutlinedIcon
                    fontSize='large'
                  />
                </IconButton>
              </Tooltip>
            }
          </Stack>
        </Container>
      </Panel>
    </Portal>
  )
})

export default EditPanel;




