import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import NavbarAuth from './components/NavbarAuth';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import { Toaster } from 'react-hot-toast';
import SwapCenter from './components/pages/SwapCenter';
import SwapRequestPage from './components/SwapRequestPage';
const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const publicRoutes = ['/', '/login', '/signup'];
  const showDefaultNavbar = publicRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#F9F3EF] overflow-x-hidden">
      <Toaster/>
      {showDefaultNavbar ? <Navbar /> : <NavbarAuth />}

      <main className="pt-4 px-4 sm:px-8 max-w-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          {/* add the profile */}
          <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/login" />} />
          {/* Add more routes as needed */}
          {/* Add the SwapCenter */}
          <Route path="/swap-request" element={isLoggedIn ? <SwapCenter /> : <Navigate to="/login" />} />
          {/* Fallback route */}
           <Route path="/swap-request/:userId" element={<SwapRequestPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;



