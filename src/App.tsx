import { useEffect, useState } from 'react';
import Header from "./Core/Header/Header"
import Footer from "./Core/Footer/Footer"
import { Home } from "./Pages/Home/Home"
import { UserSignUp } from "./Pages/SignUp/user_signup/UserSignup"
import { CollectionCenterSignUp } from "./Pages/SignUp/collection_center_signup/CcenterSignup"

import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from './Pages/Login/Login';

import CollectionCenter from './Pages/CollectionCenter/center';
import CollectionRequest_requirement from './Pages/CollectionRequest/collectionRequest_requirement/collectionRequest_requirement';
import RequestDashboard from './Pages/CollectionRequest/collectionRequestDashboard/requestDashboard';
import CollectionRequestDetails from './Pages/CollectionRequest/collectionRequestDetails/collectionRequestDetails';
import Request from './Pages/Request/request';
import CustomerActiveRequest from "./Pages/Request/active_request/active_request";
import CustomerCancelRequest from "./Pages/Request/cancel_request/cancel_request";
import CustomerCompleteRequest from "./Pages/Request/complete_request/complete_request";
import Request_details from './Pages/Request/request_details/request_details';
import { SignUp } from './Pages/SignUp/SignUp';
import { ScrollToTop } from './shared/components/scroll-to-top/ScrollToTop';
import { Profile } from './Pages/Profile/profile';

import { AuthService } from './shared/services/auth.service';


function App() {
  const currentUserRole = localStorage.getItem("userRole");
  const location = useLocation();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<boolean>();

  useEffect(() => {
    setLoginStatus(AuthService.getLoginStatus());
    if (loginStatus !== undefined && loginStatus === false) {
      // prevent unauthorized route access
      if (location.pathname.includes('/profile/')) {
        navigate('/login');
      }
    }
  }, [location, loginStatus]);

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
          <Route path="collectionCenter" element={<CollectionCenter />} />
          <Route path='collectionRequest/collectionRequest_requirement' element={<CollectionRequest_requirement />} />
          <Route path='collectionRequest/requestDashboard' element={<RequestDashboard />} />
          <Route path='collectionRequest/customer1/requestDetails' element={<CollectionRequestDetails />} />
          <Route path='customer/request' element={<Request />} />
          <Route path='customer/requestDetails' element={<Request_details />} />
          <Route path='customer/request/activeRequest' element={<CustomerActiveRequest />} />
          <Route path='customer/request/cancelRequest' element={<CustomerCancelRequest />} />
          <Route path='customer/request/completeRequest' element={<CustomerCompleteRequest />} />
          <Route path="profile/:userName" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
