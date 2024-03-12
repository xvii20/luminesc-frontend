import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faChartSimple,
  faPlus,
  faHouse,
  faRightFromBracket,
  faUser,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { Typography, Box, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const sidebarClass = sidebarOpen ? '' : 'sidebar-closed';
  const navigate = useNavigate();

  // signs the user out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // console.error('Error signing out:', error);
    }
  };

  // gets the users user id
  const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      // The user is signed in
      const googleId = user.uid; // This is the Google ID of the user
      // console.log(googleId);
      //  console.log(auth.currentUser);
      return googleId;
    } else {
      // No user is signed in
      return null;
    }
  };

  let userid = getCurrentUser();

  return (
    // <div className={sidebarOpen ? 'sidebar' : 'hide'}>
    <div
      className={`sidebar ${sidebarClass}`}
      style={{ position: 'fixed', top: '-6px', zIndex: '999999999999' }}
    >
      <button
        className={`hamburger-menu ${sidebarOpen ? 'open' : 'hide'}`}
        // onClick={handleClick}
        onClick={function () {
          setSidebarOpen(false);
        }}
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
      <div className="overviewparent">
        <h2 className="overview">Overview</h2>
      </div>
      <ul>
        <li
          className="home"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/dashboard/${userid}`);
            setSidebarOpen(false); // closes the sidebar after user clicks the Home on the sidebar
          }}
        >
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                ? 'sidebareleactive'
                : 'sidebarele'
            }
            to={`/dashboard/${userid}`}
            end
            onClick={(event) => {
              event.preventDefault();
              navigate(`/dashboard/${userid}`);
              setSidebarOpen(false);
            }}
          >
            <div className="alignment">
              <FontAwesomeIcon icon={faHouse} className="sidebarhomeicon" />
              <span className="homespan"> Home </span>
            </div>
          </NavLink>
        </li>

        <li
          className="newtransaction"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/dashboard/${userid}/newtransaction`);
            setSidebarOpen(false);
          }}
        >
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                ? 'sidebareleactive'
                : 'sidebarele'
            }
            to={`/dashboard/${userid}/newtransaction`}
            end
            onClick={(event) => {
              event.preventDefault();
              navigate(`/dashboard/${userid}/newtransaction`);
              setSidebarOpen(false);
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faPlus} />
            <span className="newtransactionspan"> New Transaction</span>
          </NavLink>
        </li>
        <li
          className="charts"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/dashboard/${userid}/history`);
            setSidebarOpen(false);
          }}
        >
          {/* <FontAwesomeIcon icon={faChartSimple} />{' '} */}
          {/* <Link to="/dashboard/:uid/history" className="fcharts">
            <span className="chartspan"> History </span>
          </Link> */}
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                ? 'sidebareleactive'
                : 'sidebarele'
            }
            to={`/dashboard/${userid}/history`}
            end
            onClick={(event) => {
              event.preventDefault();
              navigate(`/dashboard/${userid}/history`);
              setSidebarOpen(false);
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faReceipt} />
            <span className="newtransactionspan"> History </span>
          </NavLink>
        </li>

        <li className="sidebarlogout" onClick={handleSignOut}>
          <Link to="/login">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className="logoutspan"> Logout </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
