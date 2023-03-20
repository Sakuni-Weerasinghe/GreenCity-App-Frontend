import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CustomerRequestConfirmationModal from '../../../Modal/CustomerRequestConfirmationModal'
//import { getCurrentCollectionCenterProfileDetails } from '../../../shared/services/profileManagement.service'
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
  const [quantity, setQuantity] = useState<number>(0);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  collectionCenterProfileDetailsPublic(username, "COLLECTION_CENTER");
  //const collectionCenterDetail = getCurrentCollectionCenterProfileDetails();

  const validationSchema = Yup.object().shape({
    addressline1: Yup.string().required("Address is Required"),
    addressline2: Yup.string().required("Address is Required"),
    addressline3: Yup.string().required("Address is Required"),
    contactNumber: Yup.string().required("Add your contact number"),
    location: Yup.string().required("Location is Required"),
    quantity: Yup.number().required("Enter Quantity"),
    payment: Yup.number().required("Mention payment"),
  });

  // const onSubmit = (data: CollectionRequest) => {
  //     const { addressline1, addressline2, addressline3,contactNumber,location,note,quantity,totalPayment } = data;
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
        {message && (
          <div className="form-group">
            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
              {message}
            </div>
          </div>
        )}
        <div className="row">
          <form>
            <div className='parent_container'>
              <div className="col-xl-6 col-sm-12 col-lg-6 col-md-6 p-3 mx-auto">
                <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
                  <h5 className="mb-0">Collecting Details</h5>
                </div>
                <div className="mt-2 p-3 border">

                  <div className="form-group mb-3">
                    <label ><h6>Address</h6></label>
                    <input type="text"{...register("addressline1")} className={`form-control ${errors.addressline1 ? 'is-invalid' : ''}`} placeholder="Address line 1" />
                    <input type="text"{...register("addressline2")} className={`form-control  mt-1 ${errors.addressline2 ? 'is-invalid' : ''}`} placeholder="Address line 2" />
                    <input type="text"{...register("addressline3")} className={`form-control  mt-1 ${errors.addressline3 ? 'is-invalid' : ''}`} placeholder="Address line 3" />
                    <div className="invalid-feedback">{errors.addressline1?.message}</div>
                  </div>
                  <div className="form-group mb-3">
                    <label><h6>Location</h6></label>
                    <input type="text" {...register("location")} className={`form-control  mt-1 ${errors.location ? 'is-invalid' : ''}`} placeholder='Location'></input>
                    <div className="invalid-feedback">{errors.location?.message}</div>
                  </div>
                  <div className="form-group mb-3">
                    <label><h6>Contact Number</h6></label>
                    <input type="text" {...register("contactNumber")} className={`form-control  mt-1 ${errors.contactNumber ? 'is-invalid' : ''}`} placeholder='Contact Number'></input>
                    <div className="invalid-feedback">{errors.contactNumber?.message}</div>
                  </div>
                  <div className="form-group mb-3">
                    <label><h6>Note</h6></label>
                    <textarea {...register("note")} className={`form-control rounded-2  mt-1 ${errors.note ? 'is-invalid' : ''}`} ></textarea>
                  </div>

                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-sm-12 col-md-6 p-3 mx-auto">
                <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
                  <h5 className="mb-0">Collection Center Details</h5>
                </div>
                <div className="mt-2 p-3 border">
                  <div>
                    {/* <h6>Collection Center Name : {collectionCenterDetail.centerName}</h6> */}
                  </div>
                  <hr />
                  <div className="border p-3 mb-3">
                    <ul className="list-group list-group-flush text-center">
                      {/* <li className="list-group-item">Waste Types : {collectionCenterDetail.wastetype}</li>
                      <li className="list-group-item">Payment for 1kg : Rs.{collectionCenterDetail.payment}</li> */}
                      <li className="list-group-item">Collecting days : Days </li>
                      {/* <li className="list-group-item">Location : {collectionCenterDetail.location} </li> */}
                    </ul>
                  </div>

                  <div className="col-auto mb-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div id="quantityLabel" {...register("quantity")} className={`input-group-text rounded-0 ${errors.quantity ? 'is-invalid' : ''}`} >Quantity :</div>
                      </div>
                      <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Enter quantity..." onChange={handleQuantityChange} />
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
                        <div id="totalPriceLabel" className="input-group-text rounded-0" >Total Payment :</div>
                      </div>
                      <input id="totalPrice" type="text" className="form-control rounded-0" placeholder="totalPayment.00 LKR"></input>
                    </div>
                  </div>

                </div>
                <hr />
                <div className="text-right">
                  <button className="btn" id="submit-btn" type="button">Submit</button>
                  {/* <CustomerRequestConfirmationModal show={showRequestConfirmationModal} onHide={() => setShowRequestConfirmationModal(false)} /> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default CollectionRequest_requirement
