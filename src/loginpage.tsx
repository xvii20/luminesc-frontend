import { useState, useEffect } from 'react';
import axios from 'axios';
import SvgComponent from './svgcomponent';
import { useNavigate } from 'react-router-dom';

import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  browserSessionPersistence,
  setPersistence,
  sendPasswordResetEmail,
  inMemoryPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';
import { getCurrentUser } from './getcurrentuser';

import Button from '@mui/material/Button';
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // custom theme
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export default function Loginpage() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false); // used for the error modal
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const cloudurl = import.meta.env.VITE_CLOUDURL;
  const localhosturl = import.meta.env.VITE_LOCALHOSTURL; // backend localhost url

  let navigate = useNavigate();

  // closes the mui alert
  const handleClose = () => {
    setAlertOpen(false);
  };

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async (isRememberMeChecked: boolean) => {
    try {
      // if the user closes the browser or navigates away from the page, they will need to sign in again when they return.
      if (isRememberMeChecked == false) {
        setPersistence(auth, browserSessionPersistence);
      }

      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);

      //  console.log(result.user.providerData[0].uid); // the uid of the account
      // Checks if the user is signed in
      if (result.user) {
        // console.log('logged in successfully');
        let userid = getCurrentUser();
        navigate(`/dashboard/${userid}`);

        const { email } = result.user;
        const username = result.user.displayName; // gets the display name of the logged in user
        const googleuid = result.user.uid; // Accesses the UID from result.user

        // console.log(email);
        // console.log(username);
        // Makes a POST request to the backend to insert the user data
        await axios.post(`${cloudurl || localhosturl}/creategoogleuser`, {
          username,
          email,
          googleuid,
        });
      } else {
        // console.log('authentication failed');
      }
    } catch (error: any) {
      // console.error('Error signing in with Google:', error.message);
    }
  };

  function handleEmailOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(e.target.value); // access the current value of the email input field.
  }

  function handlePasswordOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value); // access the current value of the email input field.
  }

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rememberMe == false) {
      setPersistence(auth, browserSessionPersistence);
    }

    try {
      let result = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      // console.log('Sign in successful!');

      let uid = getCurrentUser();
      navigate(`/dashboard/${uid}`);
    } catch (error: any) {
      // console.error('Error signing in:', error);

      if (error.message == 'Firebase: Error (auth/invalid-credential).') {
        setErrorMessage('Wrong Password or Email');
        setAlertOpen(true);
      }

      if (error.message == 'Firebase: Error (auth/invalid-email).') {
        setErrorMessage('The Contents In The Email Input Is Not A Valid Email');
        setAlertOpen(true);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="sektion">
        {/* <div className="loginheaderdiv">
        {' '}
        <h2> Loginx </h2>{' '}
      </div> */}

        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ textAlign: 'center' }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </MuiAlert>
        </Snackbar>

        <div className="loginformdiv">
          <form onSubmit={handleSubmit}>
            <div className="loginheaderdiv">
              {' '}
              {/* <h2 className="loginheader"> Login </h2>{' '} */}
              <Typography variant="h5" color="primary">
                {' '}
                Login
              </Typography>{' '}
            </div>
            {/* <div className="form-group">
              <div>
                {' '}
                <label
                  htmlFor="logincomponentemail"
                  className="loginemaillabel"
                >
                  Email
                </label>{' '}
              </div>
              <input
                type="email"
                id="logincomponentemail"
                name="email"
                required
                className="logincomponentemailinput"
                value={emailValue}
                onChange={handleEmailOnChange}
              />
            </div> */}
            <Stack
              spacing={4}
              direction="row"
              justifyContent="center"
              sx={{ marginTop: '20px' }}
            >
              <TextField
                label="Email"
                type="text"
                required
                size="small"
                sx={{
                  marginTop: '5px',
                  backgroundColor: 'white',
                  width: '400px',
                  outline: 'none',
                  '@media (max-width: 424px)': {
                    width: '350px',
                  },
                  '@media (max-width: 376px)': {
                    width: '300px',
                  },
                }}
                onChange={handleEmailOnChange}
                value={emailValue}
              />
            </Stack>

            <div className="form-group">
              <Stack
                spacing={4}
                direction="row"
                justifyContent="center"
                sx={{ marginTop: '20px' }}
              >
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  size="small"
                  sx={{
                    marginTop: '5px',
                    backgroundColor: 'white',
                    width: '400px',
                    outline: 'none',
                    '@media (max-width: 424px)': {
                      width: '350px',
                    },
                    '@media (max-width: 376px)': {
                      width: '300px',
                    },
                  }}
                  value={passwordValue}
                  onChange={handlePasswordOnChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <div className="logincomponentremembermediv">
                {' '}
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  id="logincomponentcheckbox"
                />{' '}
                <label htmlFor="logincomponentcheckbox"> Remember Me </label>{' '}
                <p
                  className="mediaforgotyourpasswordforlogincomponent"
                  onClick={function () {
                    navigate('/forgotpassword');
                  }}
                >
                  {' '}
                  Forgot Your Password?{' '}
                </p>{' '}
              </div>
            </div>

            <div className="forgotyourpasswordforlogincomponentdiv">
              {' '}
              <p
                className="forgotyourpasswordforlogincomponent"
                onClick={function () {
                  navigate('/forgotpassword');
                }}
              >
                {' '}
                Forgot Your Password?{' '}
              </p>{' '}
            </div>

            <div className="logincomponentloginbuttondiv">
              {' '}
              <button type="submit" className="logincomponentloginbutton">
                Login
              </button>{' '}
            </div>
            <div className="googlebuttondiv">
              <div className="medialogincomponentloginbuttondiv">
                {' '}
                <button
                  type="submit"
                  className="medialogincomponentloginbutton"
                >
                  Login
                </button>{' '}
              </div>

              <button
                className="gsi-material-button"
                onClick={async function () {
                  let finalresult = await signInWithGoogle(rememberMe);
                  // console.log(finalresult, 'finalresult');
                }}
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <SvgComponent />
                  </div>
                  <span className="gsi-material-button-contents">
                    Sign in with Google
                  </span>
                  <span style={{ display: 'none' }}>Sign in with Google</span>
                </div>
              </button>
            </div>
            <div className="createanaccountdiv">
              {' '}
              Don't have an account?{' '}
              <span
                onClick={() => {
                  navigate('/signup');
                }}
              >
                {' '}
                Sign Up{' '}
              </span>
            </div>
          </form>
        </div>
      </section>
    </ThemeProvider>
  );
}
