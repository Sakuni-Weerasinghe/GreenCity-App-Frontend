import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { CollectionCenter_addDetailForm, Customer_updateForm } from '../../../../types/type';
import { useForm } from 'react-hook-form';

import "./customer.css";
import { useNavigate } from 'react-router-dom';
import * as profileManagementService from "../../../../shared/services/profileManagement.service"

const style = {
    cardTitle: {
        background: "#778c17",
        fontColor: "white",
    },
}

const Customer_update = () => {
    let navigate = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    //const currentUser = profileManagementService.getCurrentUser();
    //const currentUserDetails = profileManagementService.getCurrentUserProfileDetails();

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("First Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        contactnumber: Yup.string().required("Contact Number is required"),
        email: Yup.string().email("This is not a valid email.").required("This field is required!"),
        addressline1: Yup.string().required("Address is Required"),
        addressline2: Yup.string().required("Address is Required"),
        addressline3: Yup.string().required("Address is Required"),
        username: Yup.string().required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        picture: Yup.mixed().test("required", "Collection Center picture is required!", value => {
            return value && value.length;
        }),
        status: Yup.string().required("Status is required! "),
    })

    const onSubmit = (data: Customer_updateForm) => {
        // const { firstname, lastname, contactnumber, email, addressline1, addressline2, addressline3, username, status } = data;
        // profileManagementService.customerProfileUpdate(currentUser.username, firstname, lastname, contactnumber, email, addressline1, addressline2, addressline3, username, status).then(
        //     (response) => {
        //         setMessage(response.data.response);
        //         if (response.data.responseStatus) {
        //             reset();
        //             setSuccessful(true);
        //         } else {
        //             setSuccessful(false);
        //         }
        //         navigate("/userProfile/" + currentUser.username)
        //     },
        //     (error) => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();
        //         setSuccessful(false);
        //         setMessage(resMessage);
        //     }
        // );
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Customer_updateForm>({
        resolver: yupResolver(validationSchema)
    })

    return (
        <>
            <section className=" my-5">
                <div className='container col-lg-7 '>
                    <div className="card rounded-0">
                        <div style={style.cardTitle} className="p-2 text-center">
                            <h5 className="fw-bold">Update Your Profile Details</h5>
                        </div>
                        {message && (
                            <div className="form-group pt-5 px-5 mx-3">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="card-body px-5 mx-3 py-4 ">
                            <form id='customer_update' onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className='form-outline'>
                                            <label className='py-1'>First Name</label>
                                            {/* <input type="text"{...register("firstname")} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} value={currentUserDetails.firstName} /> */}
                                            <div className="invalid-feedback">{errors.firstname?.message}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className='form-outline'>
                                            <label className='py-1'>Last Name</label>
                                            {/* <input type="text"{...register("lastname")} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} value={currentUserDetails.lastName} /> */}
                                            <div className="invalid-feedback">{errors.lastname?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className='py-1'>Contact Number</label>
                                    {/* <input type="text"{...register("contactnumber")} className={`form-control ${errors.contactnumber ? 'is-invalid' : ''}`} value={currentUserDetails.contactNumber} /> */}
                                    <div className="invalid-feedback">{errors.contactnumber?.message}</div>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className='py-1'>Email</label>
                                    <input type="text"{...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className='py-1'>Address</label>
                                    {/* <input type="text"{...register("addressline1")} className={`form-control ${errors.addressline1 ? 'is-invalid' : ''}`} value={currentUserDetails.addressLine1} />
                                    <input type="text"{...register("addressline2")} className={`form-control  mt-1 ${errors.addressline2 ? 'is-invalid' : ''}`} value={currentUserDetails.addressLine2} />
                                    <input type="text"{...register("addressline3")} className={`form-control  mt-1 ${errors.addressline3 ? 'is-invalid' : ''}`} value={currentUserDetails.addressLine3} /> */}
                                    <div className="invalid-feedback">{errors.addressline1?.message}</div>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className='py-1'>User Name</label>
                                    {/* <input type="text"{...register("username")} className={`form-control ${errors.username ? 'is-invalid' : ''}`} value={currentUserDetails.username} /> */}
                                    <div className="invalid-feedback">{errors.username?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1 '>Customer Picture</label>
                                    <input type="file" {...register("picture")} className={`form-control-file ps-3 rounded-1`} />
                                    <div className="invalid-feedback">{errors.picture?.message}</div>
                                </div>
                                <div className='form-outline mb-3'>
                                    <label className='py-1'>Customer Profile Status</label><br />
                                    <input {...register("status")} type="radio" className='mx-2 ' value="on" />Active
                                    <input {...register("status")} type="radio" className='mx-2' value="off" />Disable
                                    <div className="invalid-feedback">{errors.status?.message}</div>
                                </div>
                                <div className="modal-footer my-4">
                                    <button id="clear-btn" type="button" className="btn btn-dark btn-block mx-4 px-5" onClick={() => reset()}>Clear</button>
                                    <button type="submit" className="btn btn-dark btn-block px-5">Add details</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Customer_update