import React from 'react';
import Tableinterface from './tableinterface';
import Navbar from './Navbar';
import Sidebar from './sidebar';

interface FullhistoryProps {
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

export const Fullhistory: React.FC<FullhistoryProps> = ({
  text_And_Amount,
  set_Text_And_Amount,
  googpic,
  googname,
  googemail,
  sidebarOpen,
  setSidebarOpen,
  setgoogemail,
  setgoogpic,
  setgoogname,
}) => {
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

      <Tableinterface
        text_And_Amount={text_And_Amount}
        set_Text_And_Amount={set_Text_And_Amount}
      />
    </>
  );
};
