import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Core/Header/Header"
import Footer from "./Core/Footer/Footer"
import Home from "./Pages/Home/Home"
import UserSignup from "./Pages/SignUp/Components/UserSignup"
import CcenterSignup from "./Pages/SignUp/Components/CcenterSignup"


import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/profile';
import CollectionCenter from './Pages/CollectionCenter/center';
import BoardUser from './Pages/User/user';
import BoardAdmin from './Pages/Admin/admin';
import * as authService from '../src/services/auth.service';
import UserRequest from './Pages/CollectionCenter/userRequest';

function App() {
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      authService.setLoginStatusValue(true);
    } else {
      authService.setLoginStatusValue(false);
    }
  }, [])

  return (
    <div>
      <Header></Header>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path="signup/userSignup" element={<UserSignup />} />
          <Route path="signup/centerSignup" element={<CcenterSignup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collectionCenter" element={<CollectionCenter />} />
          <Route path="collectionCenter/userRequest" element={<UserRequest />} />
          <Route path="user" element={<BoardUser />} />
          <Route path="admin" element={<BoardAdmin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
