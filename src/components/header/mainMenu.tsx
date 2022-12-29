import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const mainMenuItems = [
	{linkText: 'О Лактайм', to: '../'},
	{linkText: 'Портфолио', to: '../portfolio'},
	{linkText: 'Услуги', to: '../services'},
	{linkText: 'Запись online', to: '../services'},
	{linkText: 'Контакты', to: '../'},
]

interface IMainMenuProps {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
	menuState: boolean
}

const MainMenu = ({ setMenuState, menuState }: IMainMenuProps) => {
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
				{/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 100, height: 100 }}
      /> */}
			<PersonOutlineOutlinedIcon />
			</Box>
			{/* <Divider /> */}
			<List>
				{mainMenuItems.map((item, index) => (
					<ListItem key={item.linkText} disablePadding >
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								{/* {index % 2 === 0 ? <InboxIcon sx={{color: "#999"}} /> : <MailIcon />} */}
							</ListItemIcon>
							<Link style={{ color: '#999' }} to={item.to}><ListItemText primary={item.linkText} /></Link>
							
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