import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from './getcurrentuser';
import { auth } from './firebase';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

interface BalanceProps {
  isTransactionMenuOpen: boolean;
  setIsTransactionMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
  text_And_Amount: {
    text: string;
    amount: number;
    source: string;
    googleuid: string;
    id: number;
    date: string;
  }[];
  set_Text_And_Amount: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        amount: number;
        source: string;
        googleuid: string;
        id: number;
        date: string;
      }[]
    >
  >;
}

const Balance: React.FC<BalanceProps> = ({
  isTransactionMenuOpen,
  setIsTransactionMenuOpen,
  amount,
  set_Text_And_Amount,
  text_And_Amount,
}) => {
  let [totalAmount, setTotalAmount] = useState(0);
  let [incomeAmount, setIncomeAmount] = useState(0);
  let [expenseAmount, setExpenseAmount] = useState(0);
  let [balanceLoading, setBalanceLoading] = useState(true);

  const cloudurl = import.meta.env.VITE_CLOUDURL;
  const localhosturl = import.meta.env.VITE_LOCALHOSTURL;

  useEffect(() => {
    let uid = getCurrentUser();
    // console.log(uid, 'this is the uid');
    if (auth.currentUser?.providerData[0].providerId == 'google.com') {
      axios
        .get(`${cloudurl || localhosturl}/googlegetbalance/${uid}`)
        .then((response) => {
          const totalamount = response.data.netIncome;
          const incomeamount = Number(response.data.incomeAmount);
          const expenseamount = response.data.expenseAmount;
          // console.log(
          //   response.data,
          //   'response this is the Total that the user has'
          // );
          // Updates the state with the income amount if available, otherwise set it to 0
          setTotalAmount(totalamount !== undefined ? totalamount : 0);
          setIncomeAmount(totalamount !== undefined ? incomeamount : 0);
          setExpenseAmount(totalamount !== undefined ? expenseamount : 0);
          setBalanceLoading(false);
        })
        .catch((error) => {
          // console.error('Error fetching income data:', error);
          // If there's an error fetching data, set the income amount to 0 or display an error message
          setTotalAmount(0);
          setBalanceLoading(false);
        });
    } else if (auth.currentUser?.providerData[0].providerId !== 'google.com') {
      axios
        .get(`${cloudurl || localhosturl}/getbalance/${uid}`)
        .then((response) => {
          const totalamount = response.data.netIncome;
          const incomeamount = Number(response.data.incomeAmount);
          const expenseamount = response.data.expenseAmount;

          // Update the state with the income amount if available, otherwise set it to 0
          setTotalAmount(totalamount !== undefined ? totalamount : 0);
          setIncomeAmount(totalamount !== undefined ? incomeamount : 0);
          setExpenseAmount(totalamount !== undefined ? expenseamount : 0);
          setBalanceLoading(false);
        })
        .catch((error) => {
          // console.error('Error fetching income data:', error);
          // If there's an error fetching data, set the income amount to 0 or display an error message
          setTotalAmount(0);
          setBalanceLoading(false);
        });
    }
  }, [text_And_Amount]);

  return (
    <div
      className={
        isTransactionMenuOpen ? 'parentbalancediv' : 'modifiedparentbalancediv'
      }
    >
      <div className="addnewtransactionbuttondiv">
        <button
          onClick={() => setIsTransactionMenuOpen(true)}
          className={isTransactionMenuOpen ? 'hide' : 'newtransactionbutton'}
        >
          New Transaction
        </button>
      </div>
      <div className="yourbalance">Your Balance</div>
      <div style={{ color: totalAmount < 0 ? 'red' : 'green' }}>
        {balanceLoading ? 'loading...' : `${totalAmount}`}
      </div>

      <Paper elevation={3}>
        <Box display="flex">
          <Box sx={{ marginTop: '5px', padding: '20px' }}>
            {' '}
            <Typography sx={{ fontSize: '18px' }}> Total Income </Typography>
            <Box display="flex" justifyContent="center">
              {' '}
              <Typography variant="h6" sx={{ color: 'green' }}>
                {' '}
                {balanceLoading ? 'loading...' : `${incomeAmount}`}
              </Typography>{' '}
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ marginTop: '5px', padding: '20px' }}>
            <Typography sx={{ fontSize: '18px' }}> Total Expense </Typography>

            <Box display="flex" justifyContent="center" sx={{ color: 'red' }}>
              {' '}
              <Typography variant="h6">
                {' '}
                {balanceLoading ? 'loading...' : `${expenseAmount}`}{' '}
              </Typography>{' '}
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Balance;
