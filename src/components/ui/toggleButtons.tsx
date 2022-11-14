import React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container } from '@mui/material';

interface IToggleButtonProps {
  view: string;
  toggleButtonChange: (event: React.MouseEvent<HTMLElement>, nextView: string) => void;
}

export const ToggleButtons: React.FC<IToggleButtonProps> = ({ view, toggleButtonChange }) => {
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'right',
      marginBottom: 2
    }}>
      <ToggleButtonGroup
        orientation="horizontal"
        value={view}
        exclusive
        onChange={toggleButtonChange}
      >
        <ToggleButton value='module' aria-label='module'>
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value='list' aria-label='list'>
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Container >
  );
}
