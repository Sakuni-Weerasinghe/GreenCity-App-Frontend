import React, { useEffect, useState } from 'react';
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
import CollectionCenter_create from './Pages/CollectionCenter/collectionCenter_create';
import CollectionCenter_update from './Pages/CollectionCenter/collectionCenter_update';
import CollectionRequest_requirement from './Pages/CollectionRequest/collectionRequest_requirement';

function App() {

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoginStatus(authService.getLoginStatus());
  }, [loginStatus]);

  const loginStatusHandler = (value: boolean) => {
    setLoginStatus(value);
  };

  return (
    <div>
      <Header loginStatus={loginStatus} loginStatusHandler={loginStatusHandler}></Header>
      <div className="content p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='login' element={<Login loginStatusHandler={loginStatusHandler} />} />
          <Route path="signup/userSignup" element={<UserSignup />} />
          <Route path="signup/centerSignup" element={<CcenterSignup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collectionCenter" element={<CollectionCenter />} />
          <Route path='collectionCenter/collectionCenter_create' element={<CollectionCenter_create />} />
          <Route path='collectionCenter/collectionCenter_update' element={<CollectionCenter_update />} />
          <Route path='collectionRequest/collectionRequest_requirement' element={<CollectionRequest_requirement />} />
          <Route path="user" element={<BoardUser />} />
          <Route path="admin" element={<BoardAdmin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
