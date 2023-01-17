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
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';


const pages = [
	{
		linkText: 'О Laktime',
		to: '/'
	},
	{
		linkText: 'Портфолио',
		to: '../portfolio'
	},
	{
		linkText: 'Услуги',
		to: '../services'
	},
	{
		linkText: 'Запись online',
		to: '/'
	}
];

interface IAppBarProps {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderAppBar = observer(({ setMenuState }: IAppBarProps) => {

	const isAuth = authStore.isAuth;

	const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
		// setAnchorEl(event.currentTarget);
		setMenuState(true);
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
						sx={{
							mr: 2,
							display: { sx: 'flex', md: 'none' }
						}}
						onClick={handleMainMenu}
					>
						<MenuIcon />
					</IconButton>


					<Typography variant="h5" component="h1" sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
						<Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>
							Laktime
						</Link>
					</Typography>

					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<NavLink
								key={page.linkText}
								to={page.to}
								style={{ textDecoration: 'none' }}
							>
								{({ isActive }) => (
									<Button
										component="button"
										sx={{ my: 2, color: isActive ? 'yellow' : 'white', display: 'block' }}
									>
										{page.linkText}
									</Button>
								)}
							</NavLink>
						))}
					</Box>

					{/* //////////////////////////////////////////////////////////// */}
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
					{/* //////////////////////////////////////////////////////////// */}
					{isAuth && <ProfileMenu />}

				</Toolbar>
			</AppBar>
		</Box>
	);
})

export default HeaderAppBar;





const ProfileMenu = () => {

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
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
		</>
	)
}