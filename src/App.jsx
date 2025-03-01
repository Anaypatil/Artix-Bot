// src/App.jsx
import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import RazorpayPayment from './Components/Payment/RazorpayPayment'; // Correct path and file name

const App = () => {
  return (
    <>
      <Sidebar />
      <Main />
      <RazorpayPayment /> {/* Render RazorpayPayment component here */}
    </>
  );
};

export default App;
