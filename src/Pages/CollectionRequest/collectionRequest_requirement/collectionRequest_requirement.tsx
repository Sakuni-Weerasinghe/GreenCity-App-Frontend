import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CustomerRequestConfirmationModal from '../../../Modal/CustomerRequestConfirmationModal'
import { getCurrentCollectionCenterProfileDetails } from '../../../services/profileManagement.service'
import { collectionCenterProfileDetailsPublic } from '../../../services/public.service'
import "./collectionRequest_requirement.css"
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CollectionRequest } from '../../../types/type'

const CollectionRequest_requirement = () => {
  const [showRequestConfirmationModal, setShowRequestConfirmationModal] = useState(false)
  const location = useLocation();
  const username = location.state.parameter;
  const [quantity, setQuantity] = useState<String>();

  collectionCenterProfileDetailsPublic(username, "COLLECTION_CENTER");
  const collectionCenterDetail = getCurrentCollectionCenterProfileDetails();

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Mention collecting waste types"),
    addressline1: Yup.string().required("Address is Required"),
    addressline2: Yup.string().required("Address is Required"),
    addressline3: Yup.string().required("Address is Required"),
    location: Yup.string().required("Location is Required"),
    payment: Yup.number().required("Mention payment"),
  });

  // const onSubmit = (data: CollectionRequest) => {
  //     const { wastetype, payment, description } = data;
  //     profileManagementService.collectionCenterProfileAddDetails(currentUser.username, wastetype, payment, description).then(
  //         (response) => {
  //             setMessage(response.data.response);
  //             if (response.data.responseStatus) {
  //                 reset();
  //                 setSuccessful(true);
  //             } else {
  //                 setSuccessful(false);
  //             }
  //             navigate("/userProfile/" + currentUser.username)
  //         },
  //         (error) => {
  //             const resMessage =
  //                 (error.response &&
  //                     error.response.data &&
  //                     error.response.data.message) ||
  //                 error.message ||
  //                 error.toString();
  //             setSuccessful(false);
  //             setMessage(resMessage);
  //         }
  //     );
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CollectionRequest>({
    resolver: yupResolver(validationSchema)
  })

  return (
    <>
      <div className="container mt-5 border mb-5">
        {/* <div className="message alert alert-danger text-center mt-3" role="alert">
          <h5 className="alert-heading">Order Creating is failed!</h5>
        </div> */}
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-lg-6 col-md-6 p-3 mx-auto">
            <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
              <h5 className="mb-0">Collecting Details</h5>
            </div>
            <div className="mt-2 p-3 border">
              <form >
                <div className="form-group mb-3">
                  <label><h6>Category</h6></label>
                  <select className="form-control rounded-1" >
                    <option value="" selected disabled>Waste Type.....</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Glass">Glass</option>
                    <option value="E-Waste">E-Waste</option>
                    <option value="Polythene">Polythene</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label ><h6>Address</h6></label>
                  <input type="text" className="form-control" placeholder="Address line 1" />
                  <input type="text" className="form-control mt-1" placeholder="Address line 2" />
                  <input type="text" className="form-control mt-1" placeholder="Address line 3" />
                </div>
                <div className="form-group mb-3">
                  <label><h6>Location</h6></label>
                  <input type="text" className='form-control' placeholder='Location'></input>
                </div>
                <div className="form-group mb-3">
                  <label><h6>Contact Number</h6></label>
                  <input type="text" className='form-control' placeholder='Contact Number'></input>
                </div>
                <div className="form-group mb-3">
                  <label><h6>Note</h6></label>
                  <textarea className="form-control rounded-2" ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-sm-12 col-md-6 p-3 mx-auto">
            <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
              <h5 className="mb-0">Collection Center Details</h5>
            </div>
            <div className="mt-2 p-3 border">
              <div>
                <h6>Collection Center Name : {collectionCenterDetail.centerName}</h6>
              </div>
              <hr />
              <div className="border p-3 mb-3">
                <ul className="list-group list-group-flush text-center">
                  <li className="list-group-item">Waste Types : {collectionCenterDetail.wastetype}</li>
                  <li className="list-group-item">Payment for 1kg : Rs.{collectionCenterDetail.payment}</li>
                  <li className="list-group-item">Collecting days : Days </li>
                  <li className="list-group-item">Location : {collectionCenterDetail.location} </li>
                </ul>
              </div>
              <form>
                <div className="col-auto mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div id="quantityLabel" className="input-group-text rounded-0" >Quantity :</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Enter quantity..." />
                    <div className="input-group-prepend">
                      <div className="input-group-text rounded-0">Kg</div>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
                <div className="col-auto">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend ">
                      <div id="totalPriceLabel" className="input-group-text rounded-0" >Total Payment : {quantity}</div>
                    </div>
                    <input id="totalPrice" type="text" className="form-control rounded-0" placeholder="totalPayment.00 LKR" />
                  </div>
                </div>
              </form>
            </div>
            <hr />
            <div className="text-right">
              <button className="btn" id="submit-btn" type="button" onClick={() => { setShowRequestConfirmationModal(true) }}>Submit</button>
              <CustomerRequestConfirmationModal show={showRequestConfirmationModal} onHide={() => setShowRequestConfirmationModal(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default CollectionRequest_requirement
