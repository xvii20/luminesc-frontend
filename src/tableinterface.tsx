import React from 'react';
import { useState, useEffect } from 'react';
import 'react-tippy/dist/tippy.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Tooltip, withTooltip } from 'react-tippy';
import { getCurrentUser } from './getcurrentuser';
import axios from 'axios';
import { Stack, Typography, IconButton, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { auth } from './firebase';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

interface TableinterfaceProps {
  // toggleModal: boolean;
  // setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
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

const date = new Date();

// Checks the user's locale
const userLocale = navigator.language || 'en-US';

// Chooses the appropriate format
const formattedDate = date.toLocaleDateString(userLocale, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

// Replaces single-digit days and months without leading zeros
const adjustedDate = formattedDate.replace(/\b\d\b/g, '0$&');

// console.log(adjustedDate);

// other version
function formatDateTwo(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

const cloudurl = import.meta.env.VITE_CLOUDURL;
const localhosturl = import.meta.env.VITE_LOCALHOSTURL;
// console.log(cloudurl, 'cloudurl');
// console.log(localhosturl, 'localhosturl');

const Tableinterface: React.FC<TableinterfaceProps> = ({
  text_And_Amount,
  set_Text_And_Amount,
}) => {
  const [createdDate, setCreatedDate] = useState(''); // the date of the created item entry. will show on tippy tooltip

  useEffect(() => {
    const uid = getCurrentUser();

    if (auth.currentUser?.providerData[0].providerId == 'google.com') {
      axios
        .get(`${cloudurl || localhosturl}/googlegettextandamount/${uid}`)
        .then((response) => {
          // console.log(response.data, 'responedata');
          set_Text_And_Amount(response.data);
        })
        .catch((error: Error) => {
          // console.error('Error fetching income data:', error);
        });
    } else {
      const uid = getCurrentUser();

      axios
        .get(`${cloudurl || localhosturl}/gettextandamount/${uid}`)
        .then((response) => {
          // console.log(response.data, 'otherdata');
          set_Text_And_Amount(response.data);
        })
        .catch((error: Error) => {
          // console.error('Error fetching income data:', error);
        });
    }
  }, [set_Text_And_Amount]);

  const date = new Date();
  const userLocale = navigator.language || 'en-US';
  const formattedDate = date.toLocaleDateString(userLocale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const adjustedDate = formattedDate.replace(/\b\d\b/g, '0$&');

  const deleteEntry = async (googleuid: string, id: number, source: string) => {
    try {
      // console.log(googleuid, 'googleuid of user');
      // console.log(id, 'this is the id of item that we are deleting');

      if (source === 'Income') {
        if (auth.currentUser?.providerData[0].providerId == 'google.com') {
          await axios.delete(`${cloudurl || localhosturl}/googledeleteincome`, {
            data: {
              googleuid: googleuid,
              id: id,
              source: source,
            },
          });

          const uid = getCurrentUser();
          axios
            .get(`${cloudurl || localhosturl}/googlegettextandamount/${uid}`)
            .then((response) => {
              // console.log(response.data, 'responedata');
              set_Text_And_Amount(response.data);
            });
        } else {
          const uid = getCurrentUser();
          // delete it from the non-google-account income table
          await axios.delete(`${cloudurl || localhosturl}/deleteincome`, {
            data: {
              uid: googleuid,
              id: id,
              source: source,
            },
          });

          axios
            .get(`${cloudurl || localhosturl}/gettextandamount/${uid}`)
            .then((response) => {
              // console.log(response.data, 'responedata');
              set_Text_And_Amount(response.data);
            });
        }
      } else if (source == 'Expense') {
        if (auth.currentUser?.providerData[0].providerId == 'google.com') {
          await axios.delete(
            `${cloudurl || localhosturl}/googledeleteexpense`,
            {
              data: {
                googleuid: googleuid,
                id: id,
                source: source,
              },
            }
          );

          const uid = getCurrentUser();
          axios
            .get(`${cloudurl || localhosturl}/googlegettextandamount/${uid}`)
            .then((response) => {
              // console.log(response.data, 'responedata');
              set_Text_And_Amount(response.data);
            });
        } else {
          await axios.delete(`${cloudurl || localhosturl}/deleteexpense`, {
            data: {
              uid: googleuid,
              id: id,
              source: source,
            },
          });

          const uid = getCurrentUser();
          axios
            .get(`${cloudurl || localhosturl}/gettextandamount/${uid}`)
            .then((response) => {
              // console.log(response.data, 'responedata');
              set_Text_And_Amount(response.data);
            });
        }
        return;
      }
    } catch (error) {
      // console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <div className="historyparentdiv">
        <div className="historydiv">
          <h1>
            {' '}
            {window.location.href.includes('history')
              ? 'Full History'
              : 'Transactions'}{' '}
          </h1>
        </div>
        <div className="tablewrapper">
          <div className="date">{adjustedDate}</div>
          <div className="table">
            {text_And_Amount
              .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map((item, index) => (
                <Tippy
                  content={`Entry Created on ${formatDateTwo(
                    text_And_Amount[index].date
                  )}`}
                >
                  <Paper>
                    <Box key={item.id} className="mapparent">
                      <Box className="tablerow" sx={{ width: '500px' }}>
                        <Typography
                          sx={{
                            '@media (max-width: 650px)': {
                              overflow: 'auto',
                              width: '200px',
                            },
                          }}
                        >
                          {item.text}
                        </Typography>
                        <Typography
                          className={item.source === 'Income' ? 'green' : 'red'}
                        >
                          {item.source === 'Income' ? '+' : '-'} {item.amount}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            deleteEntry(item.googleuid, item.id, item.source)
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Tippy>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tableinterface;
