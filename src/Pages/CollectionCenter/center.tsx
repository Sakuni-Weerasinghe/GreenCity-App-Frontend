import { useState, useEffect } from "react";

import { getCenterBoard } from "../../services/user.service";
import center from "../../assets/Images/center1.jpg";
import "./collectioncenter.css";
import { useNavigate, useLocation } from "react-router-dom";
import { collectionCenterProfileDetails, getCurrentCollectionCenterProfileDetails } from "../../shared/services/profileManagement.service";
import { collectionCenterProfileDetailsPublic } from "../../services/public.service";

const BoardCenter = (props: any) => {
  let navigate = useNavigate();
  const { loginStatus } = props;
  const location = useLocation();
  const username = location.state.parameter;

  collectionCenterProfileDetailsPublic(username, "COLLECTION_CENTER");
  // useEffect(() => {

  const collectionCenterDetails = getCurrentCollectionCenterProfileDetails();
  // },[])

  const onClickRequest = () => {
    if (loginStatus) {
      navigate("/collectionRequest/collectionRequest_requirement",
        { state: { parameter: collectionCenterDetails.username } });
    } else
      alert("Please Login Your Profile")
  }

  return (
    <>
      {/* <div id="main_banner">
         <img src={banner} alt="" />
        
      </div> */}
      <div className="container mt-4">
        <div>
          <h2>Center Name : {collectionCenterDetails.centerName}</h2>
          <p>Created On: | Created By:</p>
        </div>

        <div className="row mx-auto">
          <div id="shopPicture" className="col-xl-6 col-lg-6 col-md-9 col-sm-12 px-0 my-auto">
            <img src={center} className="w-100 h-500 " />
          </div>
          <div className="col-xl-6 col-md-3 col-lg-6 col-sm-12 p-0 my-auto">
            <ul className="list-group text-center">
              <li className="list-group-item text-light p-1 title">Category</li>
              <li className="list-group-item p-2 data">{collectionCenterDetails.wastetype} -
                Rs.{collectionCenterDetails.payment} for 1kg</li>
              <li className="list-group-item text-light p-1 title">Address</li>
              <li className="list-group-item p-2 data">{collectionCenterDetails.addressLine1} ,
                {collectionCenterDetails.addressLine2} ,
                {collectionCenterDetails.addressLine3}</li>
              <li className="list-group-item text-light p-1 title">Location</li>
              <li className="list-group-item p-2 data">{collectionCenterDetails.location}</li>
              <li className="list-group-item text-light p-1 title">Contact Details</li>
              <li className="list-group-item p-2 data">{collectionCenterDetails.contactNumber}</li>
              <li className="list-group-item p-2 data">{collectionCenterDetails.email}</li>
              <li className="list-group-item text-light p-1 title">Working days</li>
              <li className="list-group-item p-2 data">Weekdays</li>
            </ul>
          </div>
        </div>

        <div id="description" className="row mt-3 mx-0">
          <h4 className="col py-3 text-center">Description</h4>
        </div>
        <div>
          <p className="text-justify p-3 py-1">{collectionCenterDetails.description}</p>
        </div>
        <div>
          <button className="btn btn-dark btn-block px-3 mb-3 mt-1" onClick={onClickRequest}> Request PickUp  </button>
        </div>
      </div>
    </>
  );

};

export default BoardCenter;