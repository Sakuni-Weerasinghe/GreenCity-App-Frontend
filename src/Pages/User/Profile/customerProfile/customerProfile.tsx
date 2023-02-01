import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import center from "../../../../assets/Images/center1.jpg"
import { getLoginStatus } from '../../../../services/auth.service';
import { getCurrentUser, getCurrentUserProfileDetails, userProfileDetails } from '../../../../services/profileManagement.service';

import "./customerProfile.css"

const CustomerProfile = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  let { } = useParams();

  // const profileUserName = location.state.parameter;
  // console.log(profileUserName);
  // userProfileDetails(profileUserName, "USER")


  // useEffect(() => {
  //   setLoginStatus(getLoginStatus());
  //   profile();
  // }, [loginStatus]);

  // const profile = () => {
  //   const userData = localStorage.getItem("userData");
  //   if (userData) {
  //     userProfileDetails(currentUser.username, "USER")
  //   }
  // }

  const userDetails = getCurrentUserProfileDetails();

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div id="profile_picture_position" className="col-xl-3 col-lg-4 col-md-5 col-sm-12 my-auto">
            <img id="profile_picture" className="rounded-circle"
              src={center} alt="profile_picture" />
            {/* <img id="profile_picture" className="rounded-circle"
                src="../../assets/Profile.jpg" alt="profile_picture"/> */}
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7  col-sm-12 pt-3">
            <h3>{userDetails.firstName + " " + userDetails.lastName}</h3>
            <hr />
            <div id="customer_details" className="text-secondary text-left">
              <div className="row">
                <div className="col col-xl-3 col-lg-3 col-sm-4">
                  <h5>Username : </h5>
                </div>
                <div className="col data">
                  <h5>{userDetails.username}</h5>
                </div>
              </div>
              <hr className="my-2" />
              <div className="row">
                <div className="col col-xl-3 col-lg-3 col-sm-4">
                  <h5>Email :</h5>
                </div>
                <div className="col data">
                  <h5>{userDetails.email}</h5>
                </div>
              </div>
              <hr className="my-2" />
              <div className="row">
                <div className="col col-xl-3 col-lg-3 col-sm-4">
                  <h5>Mobile Number :</h5>
                </div>
                <div className="col data">
                  <h5>{userDetails.contactNumber}</h5>
                </div>
              </div>
              <hr className="my-2" />
              <div className="row">
                <div className="col col-xl-3 col-lg-3 col-sm-4">
                  <h5>Address :</h5>
                </div>
                <div className="col data">
                  <h5>{userDetails.addressLine1 + ", "
                    + userDetails.addressLine2 + ", "
                    + userDetails.addressLine3}
                  </h5>
                </div>
              </div>
              <hr />
            </div>
            <div className='update_btn pt-3'>
              <button className='btn' onClick={() => navigate("/userProfile/" + currentUser.username + "/customer_update")}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5"></hr>
    </>
  )
}

export default CustomerProfile
