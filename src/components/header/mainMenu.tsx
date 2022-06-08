import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';


interface MainMenuProps {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
	menuState: boolean
}

const MainMenu: React.FC<MainMenuProps> = ({ setMenuState, menuState }) => {
	const anchor = 'left';

	const toggleDrawer = (open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setMenuState(open);
		};

	const list = () => (
		<Box
			sx={{
				width: 250,
				height: '100%',
				// background: 'linear-gradient(to bottom, #4444b0, #ca4aca)'
			}}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<Box sx={{ width: 250, display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
				<Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 100, height: 100 }}
      />
			</Box>
			{/* <Divider /> */}
			<List>
				{['О Лактайм', 'Услуги и цены', 'Портфолио', 'Запись online', 'Контакты'].map((text, index) => (
					<ListItem key={text} disablePadding >
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								{/* {index % 2 === 0 ? <InboxIcon sx={{color: "#999"}} /> : <MailIcon />} */}
							</ListItemIcon>
							<ListItemText primary={text} />
							{/* <ListItemText primary={text} sx={{color: '#fff'}} /> */}
						</ListItemButton>
					</ListItem>
				))}
			</List>

		</Box>
	);

	return (
		<>
			<Drawer
				anchor={anchor}
				open={menuState}
				onClose={toggleDrawer(false)}
			>
				{list()}
			</Drawer>
		</>
	);
}


export default MainMenu;