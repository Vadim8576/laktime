import React from 'react'
import { Container, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { PagesTitle } from '../../pagesTitle/pagesTitle'
import { ToggleButtons } from '../../ui/toggleButtons';
import Prices from './prices';
import { observer } from 'mobx-react-lite';
import priceStore from "../../../store/priceStore";
import { Spiner } from '../../ui/spiner';
import AddOutlined from '@mui/icons-material/AddOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import PriceForm from './priceForm';

const actions = [
  { icon: <AddOutlined />, name: 'Добавить' },
  { icon: <DeleteSweepOutlinedIcon />, name: 'Удалить все' },
];



const PricePage: React.FC = observer(() => {
  const { priceIsLoading, priceList, priceError } = priceStore.getPriceStore();
  const [view, setView] = React.useState('module');

  const toggleButtonChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };


  const [formOpen, setFormOpen] = React.useState(true);

  const handleSpeedDialClick = () => {
    setFormOpen(true);
  }

  return (
    <>
      <Container maxWidth='lg' sx={{
        // background: '#fff',
        marginBottom: 10,
        position: 'relative',
        marginTop: '102px'
      }}>
        <PagesTitle title={'Услуги и цены'} />
        <ToggleButtons view={view} toggleButtonChange={toggleButtonChange} />

        {!priceIsLoading
          ?
          <Prices view={view} priceList={priceList} />
          :
          <Spiner open={priceIsLoading} />
        }

        <PriceForm formOpen={formOpen} setFormOpen={setFormOpen} addPrice={priceStore.addPrice} />

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
      </Container>
    </>
  )
})

export default PricePage;