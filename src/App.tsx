import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Core/Header/Header"
import Footer from "./Core/Footer/Footer"
import Home from "./Pages/Home/Home"
import UserSignup from "./Pages/SignUp/user_signup/UserSignup"
import CollectionCenterSignUp from "./Pages/SignUp/collection_center_signup/CcenterSignup"

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login/Login';

import * as authService from './shared/services/auth.service';

// import BoardAdmin from './Pages/Admin/admin';
import CollectionCenter from './Pages/CollectionCenter/center';
import CollectionCenter_update from './Pages/CollectionCenter/collectionCenter_update';
import CollectionRequest_requirement from './Pages/CollectionRequest/collectionRequest_requirement/collectionRequest_requirement';
import RequestDashboard from './Pages/CollectionRequest/collectionRequestDashboard/requestDashboard';
import CollectionRequestDetails from './Pages/CollectionRequest/collectionRequestDetails/collectionRequestDetails';
import Request from './Pages/Request/request';
import CustomerActiveRequest from "./Pages/Request/active_request/active_request";
import CustomerCancelRequest from "./Pages/Request/cancel_request/cancel_request";
import CustomerCompleteRequest from "./Pages/Request/complete_request/complete_request";
import CustomerProfile from "./Pages/User/Profile/customerProfile/customerProfile";
import CollectionCenterProfile from './Pages/User/Profile/collectionCenterProfile/collectionCenterProfile';
import CollectionCenter_addDetails from './Pages/CollectionCenter/collectionCenter_addDetails';
import Customer_update from './Pages/Customer/customer_update';
import Request_details from './Pages/Request/request_details/request_details';
import { SignUp } from './Pages/SignUp/SignUp';
import { ScrollToTop } from './shared/components/scroll-to-top/ScrollToTop';

function App() {
  const currentUserRole = localStorage.getItem("userRole");
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
          <Route path="/" element={<Home loginStatus={loginStatus} loginStatusHandler={loginStatusHandler} />} />
          <Route path='login' element={<Login loginStatusHandler={loginStatusHandler} />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signup/user-signup" element={<UserSignup />} />
          <Route path="signup/collection-center-signup" element={<CollectionCenterSignUp />} />
          {loginStatus ? <Route path="userProfile/:userName" element={
            currentUserRole === "USER" ? (<CustomerProfile />) :
              currentUserRole === "COLLECTION_CENTER" ? (<CollectionCenterProfile />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          <Route path="collectionCenter" element={<CollectionCenter loginStatus={loginStatus} loginStatusHandler={loginStatusHandler} />} />
          {loginStatus ? <Route path="userProfile/:userName/collectionCenter_addDetail" element={
            currentUserRole === "COLLECTION_CENTER" ? (<CollectionCenter_addDetails />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          {loginStatus ? <Route path="userProfile/:userName/customer_update" element={
            currentUserRole === "USER" ? (<Customer_update />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}

          {loginStatus ? <Route path="userProfile/:userName/collectionCenter_update" element={
            currentUserRole === "COLLECTION_CENTER" ? (<CollectionCenter_update />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          <Route path='collectionRequest/collectionRequest_requirement' element={<CollectionRequest_requirement />} />
          <Route path='collectionRequest/requestDashboard' element={<RequestDashboard />} />
          <Route path='collectionRequest/customer1/requestDetails' element={<CollectionRequestDetails />} />
          <Route path='customer/request' element={<Request />} />
          <Route path='customer/requestDetails' element={<Request_details />} />
          <Route path='customer/request/activeRequest' element={<CustomerActiveRequest />} />
          <Route path='customer/request/cancelRequest' element={<CustomerCancelRequest />} />
          <Route path='customer/request/completeRequest' element={<CustomerCompleteRequest />} />


          {/* <Route path="admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
