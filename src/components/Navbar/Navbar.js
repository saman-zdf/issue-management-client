import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useStyles } from './NavbarStyle';
import { useGlobalContext } from '../../contextReducer/Context';

const Navbar = () => {
  const classes = useStyles();
  const { state } = useGlobalContext();

  if (!state.userLoggedIn || !state.userProfile) {
    return null;
  }

  return (
    <>
      <Toolbar className={classes.navbar}>
        <span className={classes.userGreeting}>
          Hi {state.userProfile.fullName}
        </span>
        <Box sx={{ flexGrow: 0 }}>
          <Avatar alt="Remy Sharp" src={state.userProfile.image} />
          {/* <Menu
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
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
        </Box>
      </Toolbar>
    </>
  );
};

export default Navbar;
