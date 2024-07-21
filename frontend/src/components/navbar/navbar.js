import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle, ExitToApp, Person } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
 import { Link } from 'react-router-dom';
import { logout } from '../utils/redux/reducers/authActions';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IPANGRAM
        </Typography>
        {isLoggedIn ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
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
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}><Person /> Profile</MenuItem>
              <MenuItem onClick={handleLogout}><ExitToApp /> Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <IconButton
            size="small"
            edge="end"
            aria-label="login"
            aria-haspopup="true"
            component={Link}
            to="/login"
            color="inherit"
          >
            Login
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
