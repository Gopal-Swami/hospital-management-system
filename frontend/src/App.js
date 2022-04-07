import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Bookings from './screens/Bookings';
import HomeScreen from './screens/HomeScreen';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <Router>
      <NavigationBar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
};

export default App;
