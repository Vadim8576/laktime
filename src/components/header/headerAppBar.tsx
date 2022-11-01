import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';


interface AppBarProps {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderAppBar: React.FC<AppBarProps> = observer(({ setMenuState }) => {

	const isAuth = authStore.isAuth;

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
		// setAnchorEl(event.currentTarget);
		setMenuState(true);
	};


	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{
			flexGrow: 1
		}}>
			<AppBar position="fixed" sx={{ backgroundColor: '#4444b0' }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={handleMainMenu}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Laktime

					</Typography>
					
					<Link style={{ color: 'yellow' }} to='../login'>login</Link>
					<Link style={{ color: 'yellow' }} to='../price'>Прайс</Link>
					<Link style={{ color: 'yellow' }} to='../portfolio'>Портфолио</Link>

					{isAuth
						?
						<Button
							style={{ color: 'yellow' }}
							onClick={() => {
								authStore.logout()
							}}
						>
							LogOut
						</Button>
						:
						<Button
							style={{ color: 'yellow' }}
							onClick={() => {
								authStore.login({
									email: 'admin101@mail.ru',
									password: '123'
								})
							}}
						>
							LogIn
						</Button>
					}



					{isAuth && (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile ({'user'})</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
})


export default HeaderAppBar;