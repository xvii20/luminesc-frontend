import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Balance from './balance';
import Tableinterface from './tableinterface';
import Addtransaction from './addtransaction';
import Loginpage from './loginpage';
import { useState, useEffect } from 'react';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import Sidebar from './sidebar';
import { getCurrentUser } from './getcurrentuser';
import ScrollToTopButton from './scrolltotop';

interface DashboardProps {
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
  text_And_Amount: {
    text: string;
    amount: number;
    source: string;
    googleuid: string;
    id: number;
  }[];
  set_Text_And_Amount: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        amount: number;
        source: string;
        googleuid: string;
        id: number;
      }[]
    >
  >;
}

export default function Dashboard({
  text,
  setText,
  amount,
  setAmount,
  incomeOrExpense,
  setIncomeOrExpense,
  setIsTransactionMenuOpen,
  isTransactionMenuOpen,

  googname,
  setgoogname,
  googemail,
  setgoogemail,
  googpic,
  setgoogpic,
  sidebarOpen,
  setSidebarOpen,
  set_Text_And_Amount,
  text_And_Amount,
}: DashboardProps) {
  // let [googname, setgoogname] = useState('');
  // let [googemail, setgoogemail] = useState('');
  // let [googpic, setgoogpic] = useState('');

  // let [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (data: any) => {
      if (data) {
        // console.log(auth.currentUser);
        // set  google info
        // console.log(data, 'data');
        // console.log(data.photoURL, 'data.photourl');
        setgoogname(data.displayName);
        setgoogemail(data.email);
        setgoogpic(data.photoURL);
      } else {
        // sets users name,email and pic to empty string when logged out
        setgoogname('');
        setgoogemail('');
        setgoogpic('');
      }
    });
  }, []);
  getCurrentUser();
  return (
    <div className="parentbody">
      <Navbar
        googpic={googpic}
        googemail={googemail}
        googname={googname}
        setgoogemail={setgoogemail}
        setgoogpic={setgoogpic}
        setgoogname={setgoogname}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Balance
        isTransactionMenuOpen={isTransactionMenuOpen}
        setIsTransactionMenuOpen={setIsTransactionMenuOpen}
        text_And_Amount={text_And_Amount}
        set_Text_And_Amount={set_Text_And_Amount}
        amount={amount}
      />

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Tableinterface
        text_And_Amount={text_And_Amount}
        set_Text_And_Amount={set_Text_And_Amount}
      />
      <ScrollToTopButton />
    </div>
  );
}
