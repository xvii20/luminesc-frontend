import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Sidebar from './sidebar';
import { getCurrentUser } from './getcurrentuser';
import axios from 'axios';
import {
  Stack,
  AlertTitle,
  Typography,
  TextField,
  Box,
  MenuItem,
  Select,
  Button,
  Link,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { auth } from './firebase';

interface AddTransactionProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  incomeOrExpense: string;
  setIncomeOrExpense: React.Dispatch<React.SetStateAction<string>>;
  isTransactionMenuOpen: boolean;
  setIsTransactionMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  googname: string;
  setgoogname: React.Dispatch<React.SetStateAction<string>>;
  googemail: string;
  setgoogemail: React.Dispatch<React.SetStateAction<string>>;
  googpic: string;
  setgoogpic: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  text,
  setText,
  amount,
  setAmount,
  incomeOrExpense,
  setIncomeOrExpense,
  isTransactionMenuOpen,
  setIsTransactionMenuOpen,
  googname,
  setgoogname,
  googemail,
  setgoogemail,
  googpic,
  setgoogpic,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const cloudurl = import.meta.env.VITE_CLOUDURL;
  const localhosturl = import.meta.env.VITE_LOCALHOSTURL;
  // console.log(cloudurl, 'cloudurl');
  // console.log(localhosturl, 'localhosturl');

  async function submitTransaction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // console.log(text, 'text');
    // console.log(amount, 'amount');
    // console.log(incomeOrExpense, 'incomeorexpense');

    const currentDate = new Date(); // Gets the current date
    const formattedDate = currentDate.toISOString(); // Formats the date as ISO string
    let googleuid = getCurrentUser();
    const requestBody = {
      amount: amount,
      source: incomeOrExpense,
      date: formattedDate,
      text: text,
      googleuid: googleuid,
    };

    console.log(requestBody, 'requestbody');

    // if the incomeOrExpense variable is Income post this data to the googleincomeroute
    if (incomeOrExpense == 'Income') {
      // if the amount field is empty, then amount will be 0
      if (amount == '') {
        requestBody.amount = 0;

        try {
          if (auth.currentUser?.providerData[0].providerId == 'google.com') {
            await axios.post(
              `${cloudurl || localhosturl}/googleincome`,
              requestBody
            );
            setAlertOpen(true);
            return;
          }

          // This posts the data to the non google account income
          await axios.post(`${cloudurl || localhosturl}/income`, requestBody);
          setAlertOpen(true);
          return;
        } catch (error) {
          //  console.error('Error posting income:', error);
          setAlertOpen(true);
          return;
        }
      }

      try {
        if (auth.currentUser?.providerData[0].providerId == 'google.com') {
          await axios.post(
            `${cloudurl || localhosturl}/googleincome`,
            requestBody
          );
          setAlertOpen(true);
        } else {
          // this posts the data to the non google account income table
          await axios.post(`${cloudurl || localhosturl}/income`, requestBody);
          setAlertOpen(true);
        }
      } catch (error) {
        // console.error('Error posting income:', error);
        setAlertOpen(true);
        return;
      }
    }
    // if the incomeOrExpense variable is Expense post this data to the googleexpense route
    else {
      // if the amount field is empty, then amount will be 0
      if (amount == '') {
        requestBody.amount = 0;

        try {
          if (auth.currentUser?.providerData[0].providerId == 'google.com') {
            await axios.post(
              `${cloudurl || localhosturl}/googleexpense`,
              requestBody
            );
            setAlertOpen(true);
            return;
          } else {
            await axios.post(
              `${cloudurl || localhosturl}/expense`,
              requestBody
            );
            setAlertOpen(true);
            return;
          }
        } catch (error) {
          // console.error('Error posting expense:', error);
          setAlertOpen(true);
          return;
        }
      }

      try {
        if (auth.currentUser?.providerData[0].providerId == 'google.com') {
          await axios.post(
            `${cloudurl || localhosturl}/googleexpense`,
            requestBody
          );
          setAlertOpen(true);
        } else {
          let response = await axios.post(
            `${cloudurl || localhosturl}/expense`,
            requestBody
          );
          // console.log('Expense posted successfully:', response);
          setAlertOpen(true);
        }
      } catch (error) {
        // console.error('Error posting expense:', error);
        setAlertOpen(true);
        return;
      }
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Only allows digits and a single decimal point
      setAmount(parseFloat(value));
    }
  };

  // closes the mui alert
  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleAlert = () => {
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 5000);
  };

  return (
    <>
      <Navbar
        googname={googname}
        setgoogname={setgoogname}
        googemail={googemail}
        setgoogemail={setgoogemail}
        googpic={googpic}
        setgoogpic={setgoogpic}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set anchorOrigin to top center
        sx={{ zIndex: '900000000000' }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%', textAlign: 'center' }}
        >
          <AlertTitle>Success</AlertTitle>
          Transaction successfully logged!
          <Link
            component="button"
            onClick={function () {
              navigate(`/dashboard/${getCurrentUser()}`);
            }}
            sx={{ marginLeft: '4px' }}
          >
            {' '}
            click here to view{' '}
          </Link>
        </MuiAlert>
      </Snackbar>

      <div
        className={isTransactionMenuOpen ? 'addtransactionparentdiv' : 'hide'}
      >
        <div className="addtransactiondiv">
          <div className="addnewtransaction">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h6"> Add New Transaction </Typography>
            </Box>
          </div>

          <form onSubmit={submitTransaction}>
            <Box display="flex" justifyContent="center">
              <TextField
                id="text"
                label="Description"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                inputProps={{ maxLength: 36 }} // 36 characters can only fit in this input bar
                required
                size="small"
                sx={{
                  width: '520px',
                  backgroundColor: '#fdfdfd',
                  outline: 'none',
                  marginTop: '10px',
                  marginBottom: '15px',
                  '@media (max-width: 546px)': {
                    width: '400px',
                  },
                  '@media (max-height: 360px)': {
                    marginTop: '0px',
                  },
                }}
              />
            </Box>

            <Box
              // className="typeinputdiv"
              display="flex"
              justifyContent="center"
            >
              <TextField
                id="text"
                value={incomeOrExpense}
                onChange={(e) => setIncomeOrExpense(e.target.value)}
                // className="textinput"
                select
                required
                size="small"
                label="Type"
                sx={{
                  backgroundColor: '#fdfdfd',
                  width: '520px',
                  marginBottom: '15px',
                  '@media (max-width: 546px)': {
                    width: '400px',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </TextField>
            </Box>

            <Box display="flex" justifyContent="center">
              <TextField
                type="number"
                id="amount"
                value={amount}
                label="Enter an Amount"
                onChange={handleAmountChange}
                placeholder="Enter amount"
                inputProps={{ maxLength: 8 }}
                required
                size="small"
                sx={{
                  backgroundColor: '#fdfdfd',
                  width: '520px',
                  '@media (max-width: 546px)': {
                    width: '400px',
                  },
                }}
              />
            </Box>

            <div className="addtransactionbuttondiv">
              {' '}
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#222222',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
              >
                {' '}
                <Typography> Add Transaction</Typography>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTransaction;
