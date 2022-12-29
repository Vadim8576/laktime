import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['О Laktime', 'Портфолио', 'Услуги', 'Запись online'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HeaderAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderAppBar;



// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import Button from '@mui/material/Button';
// import { Link, NavLink } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import authStore from '../../store/authStore';


// interface IAppBarProps {
// 	setMenuState: React.Dispatch<React.SetStateAction<boolean>>
// }


// const HeaderAppBar = observer(({ setMenuState }: IAppBarProps) => {

// 	const isAuth = authStore.isAuth;

// 	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

// 	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
// 		// setAnchorEl(event.currentTarget);
// 		setMenuState(true);
// 	};


// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};

// 	return (
// 		<Box sx={{
// 			flexGrow: 1
// 		}}>
// 			<AppBar position="fixed" sx={{ backgroundColor: '#4444b0' }}>
// 				<Toolbar>
// 					<IconButton
// 						size="large"
// 						edge="start"
// 						color="inherit"
// 						aria-label="menu"
// 						sx={{ mr: 2 }}
// 						onClick={handleMainMenu}
// 					>
// 						<MenuIcon />
// 					</IconButton>
// 					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// 						Laktime
// 					</Typography>

// 					<NavLink style={{ color: 'yellow' }} to='../login'>login</NavLink>
// 					<NavLink style={{ color: 'yellow' }} to='../services'>Прайс</NavLink>
// 					<NavLink style={{ color: 'yellow' }} to='../portfolio'>Портфолио</NavLink>

// 					{isAuth
// 						?
// 						<Button
// 							style={{ color: 'yellow' }}
// 							onClick={() => {
// 								authStore.logout()
// 							}}
// 						>
// 							LogOut
// 						</Button>
// 						:
// 						<Button
// 							style={{ color: 'yellow' }}
// 							onClick={() => {
// 								authStore.login({
// 									email: 'admin101@mail.ru',
// 									password: '123'
// 								})
// 							}}
// 						>
// 							LogIn
// 						</Button>
// 					}



// 					{isAuth && (
// 						<div>
// 							<IconButton
// 								size="large"
// 								aria-label="account of current user"
// 								aria-controls="menu-appbar"
// 								aria-haspopup="true"
// 								onClick={handleMenu}
// 								color="inherit"
// 							>
// 								<AccountCircle />
// 							</IconButton>
// 							<Menu
// 								id="menu-appbar"
// 								anchorEl={anchorEl}
// 								anchorOrigin={{
// 									vertical: 'top',
// 									horizontal: 'right',
// 								}}
// 								keepMounted
// 								transformOrigin={{
// 									vertical: 'top',
// 									horizontal: 'right',
// 								}}
// 								open={Boolean(anchorEl)}
// 								onClose={handleClose}
// 							>
// 								<MenuItem onClick={handleClose}>Profile ({'user'})</MenuItem>
// 								<MenuItem onClick={handleClose}>My account</MenuItem>
// 							</Menu>
// 						</div>
// 					)}
// 				</Toolbar>
// 			</AppBar>
// 		</Box>
// 	);
// })


// export default HeaderAppBar;