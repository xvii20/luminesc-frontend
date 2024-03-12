import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Balance from './balance';
import Tableinterface from './tableinterface';
import Addtransaction from './addtransaction';
import Loginpage from './loginpage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  useParams,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Dashboard from './dashboard';
import Logout from './logout';

import Signup from './signup';
import LoadingComponent from './loading';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase';
import { User } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';
import { Fullhistory } from './fullhistory';
import { Userinfo } from './userinfo';
import Forgotpassword from './forgotpassword';

function App() {
  let [text_And_Amount, set_Text_And_Amount] = useState<
    {
      text: string;
      amount: number;
      source: string;
      googleuid: string;
      id: number;
      date: string;
    }[]
  >([]); // an array of objects with text and amount

  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<number>(0);

  const [user, setUser] = useState<User | null>(null);

  const [incomeOrExpense, setIncomeOrExpense] = useState<string>('');

  const [isTransactionMenuOpen, setIsTransactionMenuOpen] =
    useState<boolean>(true);

  let [googname, setgoogname] = useState('');
  let [googemail, setgoogemail] = useState('');
  let [googpic, setgoogpic] = useState('');

  let [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // Sets up an authentication state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false); // Once the authentication state is determined, set isLoading to false

      setUser(user);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // If isLoading is true, render a loading component
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard/:userid" /> : <Loginpage />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard/:userid" /> : <Signup />}
        />

        <Route
          path="/dashboard/:userid"
          element={
            user ? (
              <Dashboard
                text={text}
                setText={setText}
                amount={amount}
                setAmount={setAmount}
                incomeOrExpense={incomeOrExpense}
                setIncomeOrExpense={setIncomeOrExpense}
                isTransactionMenuOpen={isTransactionMenuOpen}
                setIsTransactionMenuOpen={setIsTransactionMenuOpen}
                googname={googname}
                setgoogname={setgoogname}
                googemail={googemail}
                setgoogemail={setgoogemail}
                googpic={googpic}
                setgoogpic={setgoogpic}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                text_And_Amount={text_And_Amount}
                set_Text_And_Amount={set_Text_And_Amount}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/:userid/newtransaction"
          element={
            user ? (
              <Addtransaction
                text={text}
                setText={setText}
                amount={amount}
                setAmount={setAmount}
                incomeOrExpense={incomeOrExpense}
                setIncomeOrExpense={setIncomeOrExpense}
                isTransactionMenuOpen={isTransactionMenuOpen}
                setIsTransactionMenuOpen={setIsTransactionMenuOpen}
                googname={googname}
                setgoogname={setgoogname}
                googemail={googemail}
                setgoogemail={setgoogemail}
                googpic={googpic}
                setgoogpic={setgoogpic}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/:uid/history"
          element={
            user ? (
              <Fullhistory
                text_And_Amount={text_And_Amount}
                set_Text_And_Amount={set_Text_And_Amount}
                googname={googname}
                setgoogname={setgoogname}
                googemail={googemail}
                setgoogemail={setgoogemail}
                googpic={googpic}
                setgoogpic={setgoogpic}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/:uid/userinfo"
          element={
            user ? (
              <Userinfo
                // text_And_Amount={text_And_Amount}
                // set_Text_And_Amount={set_Text_And_Amount}
                googname={googname}
                setgoogname={setgoogname}
                googemail={googemail}
                setgoogemail={setgoogemail}
                googpic={googpic}
                setgoogpic={setgoogpic}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
