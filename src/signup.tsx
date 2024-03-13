import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { error } from 'console';
import { getCurrentUser } from './getcurrentuser';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// import { Tooltip, withTooltip } from 'react-tippy';

export default function Signup() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [userNameValue, setUserNameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitButtonClicked, setSubmitButtonClicked] =
    useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [missingFieldsAlert, setMissingFieldsAlert] = useState<boolean>(false);
  const [passwordDoesNotMatchAlertOpen, setPasswordDoesNotMatchAlertOpen] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  let navigate = useNavigate();

  const cloudurl = import.meta.env.VITE_CLOUDURL;
  const localhosturl = import.meta.env.VITE_LOCALHOSTURL;
  // console.log(cloudurl, 'cloudurl');
  // console.log(localhosturl, 'localhosturlAn');

  // closes the mui alert
  const handleClose = () => {
    setAlertOpen(false);
    setMissingFieldsAlert(false);
    setPasswordDoesNotMatchAlertOpen(false);
  };

  // register the user function
  const register = async (e: any) => {
    e.preventDefault();
    if (emailValue == '' || userNameValue == '' || passwordValue == '') {
      setSubmitButtonClicked(true);
      setMissingFieldsAlert(true);
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      setPasswordDoesNotMatchAlertOpen(true);
      return;
    }

    // console.log(emailValue, 'emailvalue');
    // console.log(userNameValue, 'usernamevalue');
    // console.log(passwordValue, 'passwordvalue');

    try {
      setSubmitButtonClicked(false);
      const createduserinformation = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      // console.log(createduserinformation);
      let userid = getCurrentUser();

      const response = await axios.post(
        `${cloudurl || localhosturl}/createuser`,
        {
          email: emailValue,
          username: userNameValue,
          uid: userid,
        }
      );
      // console.log(response.data);
      navigate(`/dashboard/${userid}`);
    } catch (error: any) {
      // console.log(error.message);
      if (
        error.message ==
        'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
        setErrorMessage('Password should be atleast 6 characters');
        setAlertOpen(true);
      } else if (
        error.message == 'Firebase: Error (auth/email-already-in-use).'
      ) {
        setErrorMessage('Email already exists please choose another one');
        setAlertOpen(true);
      } else if ((error.message = 'Firebase: Error (auth/invalid-email).')) {
        setErrorMessage('The email is not a valid email address');
        setAlertOpen(true);
      }
    }
  };

  function handleEmailOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(e.target.value);
  }

  function handleUserNameOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserNameValue(e.target.value);
  }

  function handlePasswordOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  }

  function handleConfirmPasswordOnChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPasswordValue(e.target.value);
  }

  // const handleCheckboxChange = () => {
  //   setRememberMe(!rememberMe);
  // };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(emailValue, 'email value');
    // console.log(passwordValue, 'password value');

    // console.log('submitted');
  }

  return (
    <ThemeProvider theme={theme}>
      <section className="sektion">
        {' '}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={passwordDoesNotMatchAlertOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            <AlertTitle>Error</AlertTitle>
            Password Does Not Match...
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={missingFieldsAlert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Sets Modal to be at the top center
        >
          <MuiAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            <AlertTitle>Error</AlertTitle>
            The Red Input Field is Empty
          </MuiAlert>
        </Snackbar>
        {/* <div className="loginheaderdiv">
        {' '}
        <h2> Loginx </h2>{' '}
      </div> */}
        <div className="usedforalignment">
          <Tooltip title="Go Back to Login Page">
            <IconButton
              sx={{
                position: 'absolute',
                left: '10px',
                top: '10px',
                '@media (max-height: 360px)': {
                  top: '-4px',
                },
              }}
              onClick={function () {
                navigate('/login');
              }}
            >
              {' '}
              <ArrowBackRoundedIcon />
            </IconButton>
          </Tooltip>

          <div className="medialoginformdiv">
            <form className="signupform">
              <div className="createanaccountheaderdiv">
                {' '}
                {/* <h2 className="loginheader"> Signup </h2>{' '} */}
                <Typography
                  variant={window.innerHeight <= 465 ? 'h6' : 'h5'}
                  color="primary"
                >
                  {' '}
                  Create an Account
                </Typography>{' '}
              </div>

              <Stack>
                <Stack
                  spacing={4}
                  direction="row"
                  justifyContent="center"
                  sx={{
                    marginTop: '20px',
                    '@media (max-height: 460px)': {
                      marginTop: '10px',
                    },
                  }}
                >
                  <TextField
                    label="Email"
                    error={submitButtonClicked && emailValue === ''}
                    // helperText={
                    //   emailValue === '' && submitButtonClicked == true
                    //     ? 'Please enter your email'
                    //     : ''
                    // }
                    type="text"
                    required
                    size="small"
                    sx={{
                      marginTop: '5px',
                      backgroundColor: 'white',
                      width: '400px',
                      outline: 'none',
                      '@media (max-width: 450px)': {
                        width: '350px',
                      },
                      '@media (max-width: 376px)': {
                        width: '300px',
                      },
                      '& .MuiInput-root': {
                        borderColor:
                          submitButtonClicked && emailValue === '' ? 'red' : '', // Change border color to red when there's an error
                      },
                    }}
                    onChange={handleEmailOnChange}
                    value={emailValue}
                  />
                </Stack>

                <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
                  <TextField
                    label="Username"
                    type="text"
                    error={submitButtonClicked && userNameValue === ''}
                    required
                    size="small"
                    sx={{
                      marginTop: '5px',
                      backgroundColor: 'white',
                      width: '400px',
                      outline: 'none',
                      '@media (max-width: 450px)': {
                        width: '350px',
                      },
                      '@media (max-width: 376px)': {
                        width: '300px',
                      },
                      '& .MuiInput-root': {
                        borderColor:
                          submitButtonClicked && userNameValue === ''
                            ? 'red'
                            : '',
                      },
                    }}
                    onChange={handleUserNameOnChange}
                    value={userNameValue}
                  />
                </Stack>
                <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    size="small"
                    error={submitButtonClicked && passwordValue === ''}
                    sx={{
                      marginTop: '5px',
                      backgroundColor: 'white',
                      width: '400px',
                      outline: 'none',
                      '@media (max-width: 450px)': {
                        width: '350px',
                      },
                      '@media (max-width: 376px)': {
                        width: '300px',
                      },
                      '& .MuiInput-root': {
                        borderColor:
                          submitButtonClicked && passwordValue === ''
                            ? 'red'
                            : '', // Changes border color to red when there's an error
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

                <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
                  <TextField
                    label="Confirm Password"
                    error={submitButtonClicked && passwordValue === ''}
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    size="small"
                    sx={{
                      marginTop: '5px',
                      backgroundColor: 'white',
                      width: '400px',
                      outline: 'none',
                      '@media (max-width: 450px)': {
                        width: '350px',
                      },
                      '@media (max-width: 376px)': {
                        width: '300px',
                      },
                      '& .MuiInput-root': {
                        borderColor:
                          submitButtonClicked && confirmPasswordValue === ''
                            ? 'red'
                            : '', // Changes border color to red when there's an error
                      },
                    }}
                    value={confirmPasswordValue}
                    onChange={handleConfirmPasswordOnChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            aria-label={
                              showConfirmPassword
                                ? 'Hide password'
                                : 'Show password'
                            }
                          >
                            {showConfirmPassword ? (
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
              </Stack>
              <div className="createanaccountcomponentloginbuttondiv">
                {' '}
                {/* <button type="submit" className="logincomponentloginbutton">
              Register
            </button>{' '} */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '250px' }}
                  onClick={register}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
