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
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { observe } from 'mobx';
import authStore from '../../store/authStore';


interface AppBarProps {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderAppBar: React.FC<AppBarProps> = observer(({setMenuState}) => {

	const isAuth = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// setAuth(event.target.checked);
	};

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
			<AppBar position="fixed" sx={{backgroundColor: '#4444b0'}}>
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
					<Link style={{color: 'yellow'}} to='../price'>Прайс</Link>
					<Button
						style={{color: 'yellow'}}
						onClick={() => {
							authStore.logout()
						}}
					>
						LogOut
					</Button>
					<Button
						style={{color: 'yellow'}}
						onClick={() => {
							authStore.login()
						}}
					>
						LogIn
					</Button>
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
					{!isAuth &&
						<Button color="inherit">Login</Button>
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
})


export default HeaderAppBar;