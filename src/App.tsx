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

import * as authService from '../src/services/auth.service';
import * as profileManagementService from '../src/services/profileManagement.service';

// import BoardAdmin from './Pages/Admin/admin';
import CollectionCenter from './Pages/CollectionCenter/center';
import CollectionCenter_update from './Pages/CollectionCenter/collectionCenter_update';
import CollectionRequest_requirement from './Pages/CollectionRequest/collectionRequest_requirement/collectionRequest_requirement';
import RequestDashboard from './Pages/CollectionRequest/collectionRequestDashboard/requestDashboard';
import InprogressRequest from './Pages/CollectionRequest/inprogressRequest/inprogressRequest';
import ActiveRequest from './Pages/CollectionRequest/activeRequest/activeRequest';
import CompleteRequest from './Pages/CollectionRequest/completeRequest/completeRequest';
import CollectionRequestDetails from './Pages/CollectionRequest/collectionRequestDetails/collectionRequestDetails';
import Request from './Pages/Request/request';
import CustomerActiveRequest from "./Pages/Request/active_request/active_request";
import CustomerCancelRequest from "./Pages/Request/cancel_request/cancel_request";
import CustomerCompleteRequest from "./Pages/Request/complete_request/complete_request";
import CustomerProfile from "./Pages/User/Profile/customerProfile/customerProfile";
import CollectionCenterProfile from './Pages/User/Profile/collectionCenterProfile/collectionCenterProfile';
import CollectionCenter_addDetails from './Pages/CollectionCenter/collectionCenter_addDetails';
import Customer_update from './Pages/Customer/customer_update';

function App() {
  const currentUserRole = profileManagementService.getCurrentUser();
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
          <Route path="signup/userSignup" element={<UserSignup />} />
          <Route path="signup/centerSignup" element={<CcenterSignup />} />
          {loginStatus ? <Route path="userProfile/:userName" element={
            currentUserRole.userRole === "USER" ? (<CustomerProfile />) :
              currentUserRole.userRole === "COLLECTION_CENTER" ? (<CollectionCenterProfile />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          <Route path="collectionCenter" element={<CollectionCenter loginStatus={loginStatus} loginStatusHandler={loginStatusHandler} />} />
          {loginStatus ? <Route path="userProfile/:userName/collectionCenter_addDetail" element={
            currentUserRole.userRole === "COLLECTION_CENTER" ? (<CollectionCenter_addDetails />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          {loginStatus ? <Route path="userProfile/:userName/customer_update" element={
            currentUserRole.userRole === "USER" ? (<Customer_update />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}

          {loginStatus ? <Route path="userProfile/:userName/collectionCenter_update" element={
            currentUserRole.userRole === "COLLECTION_CENTER" ? (<CollectionCenter_update />) : <></>
          } />
            : <Route path="/" element={<Home />}
            />}
          <Route path='collectionRequest/collectionRequest_requirement' element={<CollectionRequest_requirement />} />
          <Route path='collectionRequest/requestDashboard' element={<RequestDashboard />} />
          <Route path='collectionRequest/inprogressRequest' element={<InprogressRequest />} />
          <Route path='collectionRequest/activeRequest' element={<ActiveRequest />} />
          <Route path='collectionRequest/completeRequest' element={<CompleteRequest />} />
          <Route path='collectionRequest/customer1/requestDetails' element={<CollectionRequestDetails />} />
          <Route path='customer/request' element={<Request />} />
          <Route path='customer/request/activeRequest' element={<CustomerActiveRequest />} />
          <Route path='customer/request/cancelRequest' element={<CustomerCancelRequest />} />
          <Route path='customer/request/completeRequest' element={<CustomerCompleteRequest />} />


          {/* <Route path="admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
