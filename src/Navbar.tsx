import React from 'react';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

import 'react-tippy/dist/tippy.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import { Tooltip, withTooltip } from 'react-tippy';
import {
  Button,
  IconButton,
  Box,
  Stack,
  Avatar,
  Typography,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { onAuthStateChanged } from 'firebase/auth';

// prop types for the Navbar component
interface NavbarProps {
  googname: string;
  setgoogname: React.Dispatch<React.SetStateAction<string>>;
  googemail: string;
  setgoogemail: React.Dispatch<React.SetStateAction<string>>;
  googpic: string;
  setgoogpic: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// line 178

const Navbar: React.FC<NavbarProps> = ({
  googpic,
  googname,
  googemail,
  sidebarOpen,
  setgoogpic,
  setSidebarOpen,
}) => {
  const [profileModalOpened, setProfileModalOpened] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // console.log('User signed out successfully');
    } catch (error) {
      // console.error('Error signing out:', error);
    }
  };

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <ul className="chromalogodiv">
        <Tooltip
          title={sidebarOpen ? '' : 'Open Sidebar'}
          className="tooltipforhamburger"
        >
          <button
            className={`hamburger-menu ${sidebarOpen ? 'open' : ''}`}
            onClick={handleClick}
          >
            <span
              className={sidebarOpen ? 'linewhenhamburgermenuopened' : 'line'}
            />
            <span
              className={sidebarOpen ? 'linewhenhamburgermenuopened' : 'line'}
            />
            <span
              className={sidebarOpen ? 'linewhenhamburgermenuopened' : 'line'}
            />
          </button>
        </Tooltip>

        <li></li>

        <Typography variant="h5" sx={{ color: '#fdfdfd' }}>
          {' '}
          Luminesc
        </Typography>

        {auth.currentUser?.providerData[0].providerId == 'google.com' ? (
          <Avatar
            alt="User Avatar"
            src={googpic}
            aria-label="User Avatar"
            sx={{
              position: 'absolute',
              right: '10px',
              cursor: 'pointer',
              height: '45px',
              width: '45px',
            }}
            className="googleprofilepic"
            onClick={function () {
              setProfileModalOpened(!profileModalOpened);
            }}
          />
        ) : (
          <Avatar
            aria-label="Text Avatar"
            sx={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
            className="googleprofilepic"
            onClick={function () {
              setProfileModalOpened(!profileModalOpened);
            }}
          >
            {auth.currentUser?.email?.charAt(0)}
          </Avatar>
        )}

        {profileModalOpened ? (
          <div
            className="profilemodal"
            style={{
              height: auth.currentUser?.displayName ? '280px' : '260px',
            }}
          >
            <div className="profilemodalimagediv">
              {auth.currentUser?.providerData[0].providerId == 'google.com' ? (
                <Avatar
                  alt="User Avatar"
                  src={googpic}
                  aria-label="User Avatar"
                  sx={{
                    cursor: 'pointer',
                    height: '50px',
                    width: '50px',
                  }}
                  onClick={function () {
                    setProfileModalOpened(!profileModalOpened);
                  }}
                />
              ) : (
                <Box display="flex" justifyContent="center">
                  <Avatar
                    aria-label="Text Avatar"
                    sx={{
                      cursor: 'pointer',
                      height: '50px',
                      width: '50px',
                    }}
                    onClick={function () {
                      setProfileModalOpened(!profileModalOpened);
                    }}
                  >
                    {auth.currentUser?.email?.charAt(0)}
                  </Avatar>
                </Box>
              )}
            </div>
            <div className="profileinfodiv">
              <div className="profilemodalemail"> Email: {googemail} </div>

              {auth.currentUser?.displayName ? (
                <div className="profilemodalname"> Name: {googname} </div>
              ) : (
                ''
              )}
            </div>
            <div className="signoutbuttondiv">
              {' '}
              <div>
                {' '}
                <Button
                  onClick={handleSignOut}
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  // color="secondary"
                  sx={{
                    color: '#fdfdfd',
                    // backgroundColor: 'lightpurple',

                    '&:hover': {
                      // backgroundColor: 'scarlet',
                    },
                  }}
                >
                  Logout{' '}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
