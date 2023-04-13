import { useEffect, useState } from 'react';
import Header from "./Core/Header/Header"
import { Footer } from "./Core/Footer/Footer"
import { Home } from "./Pages/Home/Home"
import { UserSignUp } from "./Pages/SignUp/user_signup/UserSignup"
import { CollectionCenterSignUp } from "./Pages/SignUp/collection_center_signup/CcenterSignup"

import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from './Pages/Login/Login';

import { CollectionCenterDetails } from './Pages/CollectionCenterDetails/CollectionCenterDetails';
import { PickupRequest } from './Pages/pickup-request/PickupRequest';
import { Dashboard } from './Pages/dashboard/Dashboard';
import { RequestDetails } from './Pages/dashboard/request-details/RequestDetails';
import { SignUp } from './Pages/SignUp/SignUp';
import { ScrollToTop } from './shared/components/scroll-to-top/ScrollToTop';
import { Profile } from './Pages/Profile/profile';

import { AuthService } from './shared/services/auth.service';
import { Error } from './Core/error/Error';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<boolean>();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setLoginStatus(AuthService.getLoginStatus());
    if (loginStatus !== undefined && loginStatus === false) {
      // prevent unauthorized route access
      if (location.pathname.includes('/profile/') || location.pathname.includes('/pickupRequest') || location.pathname.includes('/dashboard') || location.pathname.includes('/dashboard/request/')) {
        navigate('/login');
      }
    }
    if (loginStatus && location.pathname.includes('/pickupRequest') && userRole && userRole !== 'USER') {
      navigate('/404');
    }
  }, [location, loginStatus, navigate]);

  /**
   * This function is used to handle login status
   * @param value : status
   */
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
          <Route path="signup" element={<SignUp />} />
          <Route path="signup/user-signup" element={<UserSignUp />} />
          <Route path="signup/collection-center-signup" element={<CollectionCenterSignUp />} />
          <Route path="collectionCenterDetails/:username" element={<CollectionCenterDetails />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path='pickupRequest' element={<PickupRequest />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='dashboard/request/:requestId' element={<RequestDetails />} />
          <Route path='404' element={<Error />} />
          <Route path='*' element={<Error />} />

        </Routes>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

