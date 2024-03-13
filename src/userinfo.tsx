// import React from 'react';
// import { useState } from 'react';
// import Navbar from './Navbar';
// import Sidebar from './sidebar';
// import {
//   Typography,
//   Box,
//   Stack,
//   Avatar,
//   Paper,
//   TextField,
//   IconButton,
//   Button,
// } from '@mui/material';
// import { auth } from './firebase';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import 'react-tippy/dist/tippy.css';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import { Tooltip, withTooltip } from 'react-tippy';
// import Divider from '@mui/material/Divider';
// import axios from 'axios';
// import { getCurrentUser } from './getcurrentuser';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import {
//   getAuth,
//   reauthenticateWithCredential,
//   updateEmail,
//   EmailAuthProvider,
//   verifyBeforeUpdateEmail,
//   sendEmailVerification,
// } from 'firebase/auth';
// import { AutoFixHighSharp } from '@mui/icons-material';

// interface UserInfoProps {
//   googname: string;
//   setgoogname: React.Dispatch<React.SetStateAction<string>>;
//   googemail: string;
//   setgoogemail: React.Dispatch<React.SetStateAction<string>>;
//   googpic: string;
//   setgoogpic: React.Dispatch<React.SetStateAction<string>>;
//   sidebarOpen: boolean;
//   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   // text_And_Amount: {
//   //   text: string;
//   //   amount: number;
//   //   source: string;
//   //   googleuid: string;
//   //   id: number;
//   // }[];
//   // set_Text_And_Amount: React.Dispatch<
//   //   React.SetStateAction<
//   //     {
//   //       text: string;
//   //       amount: number;
//   //       source: string;
//   //       googleuid: string;
//   //       id: number;
//   //     }[]
//   //   >
//   // >;
// }

// export const Userinfo: React.FC<UserInfoProps> = ({
//   // text_And_Amount,
//   // set_Text_And_Amount,
//   googpic,
//   googname,
//   googemail,
//   sidebarOpen,
//   setSidebarOpen,
//   setgoogemail,
//   setgoogpic,
//   setgoogname,
// }) => {
//   const [wantToEditEmailField, setWantToEditEmailField] =
//     useState<boolean>(false);

//   const [newEmail, setNewEmail] = useState<string>('');
//   const [alertErrorOpen, setErrorAlertOpen] = useState<boolean>(false);

//   const handleClose = () => {
//     setErrorAlertOpen(false);
//   };

//   // when the user focuses away from the Email field, the text field becomes read only
//   const handleBlur = () => {
//     // Check if wantToEditEmailField is true to ensure the blur event is handled only when editing is active
//     if (wantToEditEmailField) {
//       setWantToEditEmailField(false);
//     }
//   };

//   const handleSaveChanges = () => {
//     // Check if the email is valid
//     const isValidEmail = /\S+@\S+\.\S+/.test(newEmail);

//     if (wantToEditEmailField === false) {
//       return;
//     }

//     if (!isValidEmail) {
//       // If the email is not valid, displays an error modal
//       console.log('Invalid email format');
//       setErrorAlertOpen(true);
//       return;
//     }

//     const auths = getAuth();

//     // Send a verification email to the new email address
//     sendEmailVerification(auths.currentUser, 'xample@yahoo.com')
//       .then(() => {
//         // Verification email sent
//         console.log('Verification email sent');
//       })
//       .catch((error) => {
//         console.error('Error sending verification email:', error);
//       });

//     const promptemail: null | string = prompt('Enter your email:');
//     const promptpassword = prompt('Enter your password:');
//     const credential = EmailAuthProvider.credential(
//       promptemail,
//       promptpassword
//     );

//     // Re-authenticate the user with their current credentials
//     reauthenticateWithCredential(auths.currentUser, credential)
//       .then(() => {
//         // Re-authentication successful
//         console.log('User re-authenticated successfully');
//         console.log(auths.currentUser?.emailVerified, 'email verified');

//         // Updates the user's email to the new email address
//         updateEmail(auths.currentUser, 'kkupop3@yahoo.com')
//           .then(() => {
//             // console.log('Email updated successfully');
//           })
//           .catch((error) => {
//             console.error('Error updating email:', error);
//           });
//       })
//       .catch((error) => {
//         // Re-authentication failed
//         console.error('Error re-authenticating user:', error);
//       });
//   };

//   const paddingLeftValue =
//     auth.currentUser?.providerData[0].providerId === 'google.com'
//       ? '0px'
//       : '30px';

//   return (
//     <>
//       <Navbar
//         googname={googname}
//         setgoogname={setgoogname}
//         googemail={googemail}
//         setgoogemail={setgoogemail}
//         googpic={googpic}
//         setgoogpic={setgoogpic}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div className="userinfoparentdiv">
//         <Snackbar
//           open={alertErrorOpen}
//           autoHideDuration={6000}
//           onClose={handleClose}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         >
//           <MuiAlert
//             onClose={handleClose}
//             severity="error"
//             sx={{ width: '100%', textAlign: 'center' }}
//           >
//             <AlertTitle>Error</AlertTitle>
//             The Input You Have Entered Is Not A Valid Email
//           </MuiAlert>
//         </Snackbar>

//         <Stack
//           display="flex"
//           direction="column"
//           align-items="center"
//           spacing={3}
//           sx={{ outline: '2px solid green', marginTop: '20px' }}
//         >
//           {auth.currentUser?.providerData[0].providerId == 'google.com' ? (
//             <Stack
//               display="flex"
//               direction="row"
//               align-items="center"
//               justifyContent="center"
//             >
//               <Avatar
//                 alt="User Avatar"
//                 src={googpic}
//                 aria-label="User Avatar"
//                 sx={{
//                   cursor: 'pointer',
//                   height: '80px',
//                   width: '80px',
//                 }}
//               />
//             </Stack>
//           ) : (
//             <Stack
//               display="flex"
//               direction="row"
//               align-items="center"
//               justifyContent="center"
//             >
//               <Avatar
//                 aria-label="Text Avatar"
//                 sx={{
//                   cursor: 'pointer',
//                   height: '70px',
//                   width: '70px',
//                 }}
//               >
//                 {auth.currentUser?.email?.charAt(0)}
//               </Avatar>
//             </Stack>
//           )}{' '}
//           <Stack
//             spacing={2}
//             direction="row"
//             sx={{
//               marginTop: '20px',
//               paddingLeft: paddingLeftValue,
//             }}
//           >
//             <TextField
//               helperText="Your Current Email"
//               type="email"
//               value={wantToEditEmailField ? newEmail : googemail}
//               InputProps={{ readOnly: !wantToEditEmailField }}
//               onChange={function (e) {
//                 setNewEmail(e.currentTarget.value);
//               }}
//               onBlur={handleBlur}
//               size="small"
//             />

//             {auth.currentUser?.providerData[0].providerId == 'google.com' ? (
//               ''
//             ) : (
//               <Stack>
//                 <Tippy content="Edit Current Email">
//                   <IconButton sx={{ marginTop: '-2px' }}>
//                     <EditRoundedIcon
//                       sx={{
//                         cursor: 'pointer',
//                         color: 'black',
//                       }}
//                       onClick={function () {
//                         setWantToEditEmailField(true);
//                       }}
//                     />
//                   </IconButton>
//                 </Tippy>
//               </Stack>
//             )}
//           </Stack>
//           {auth.currentUser?.providerData[0].providerId == 'google.com' ? (
//             ''
//           ) : (
//             <>
//               <Stack>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     marginLeft: '30px',
//                     textDecoration: 'underline',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {' '}
//                   Change Password
//                 </Typography>
//               </Stack>
//               <Divider orientation="horizontal" flexItem />
//               <Stack display="flex" justifyContent="center" direction="row">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     width: '200px',
//                     backgroundColor: 'black',
//                     '&:hover': {
//                       backgroundColor: '#333333',
//                     },
//                   }}
//                   onClick={handleSaveChanges}
//                 >
//                   {' '}
//                   Update{' '}
//                 </Button>
//               </Stack>
//             </>
//           )}
//         </Stack>
//       </div>
//     </>
//   );
// };
