import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./PickupRequest.css"
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { PublicService } from '../../shared/services/public.service';
import { CollectionCenterDetailsResponse } from '../../shared/models/publicModals';
import { ProfileRequest, UserSettingsResponse } from '../../shared/models/profileModel';
import { ProfileService } from '../../shared/services/profile.service';
import { PickupRequestRequest } from '../../shared/models/pickupRequestModel';
import { RequestService } from '../../shared/services/request.service';

export const PickupRequest = () => {

    const location = useLocation();
    const collectionCenterUsername = location.state.parameter;
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const [collectionCenterDetails, setCollectionCenterDetails] = useState<CollectionCenterDetailsResponse>();
    const [userSettings, setUserSettings] = useState<UserSettingsResponse>();
    const [totalPayment, setTotalPayment] = useState(0);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Pickup request form form validations
    const validationSchema = Yup.object().shape({
        customerAddressLine1: Yup.string().required("Address is Required"),
        customerAddressLine2: Yup.string().required("Address is Required"),
        customerAddressLine3: Yup.string().required("Address is Required"),
        customerContactNumber: Yup.string().required("Contact number is Required"),
        customerLocation: Yup.string().required("Location is Required"),
        quantity: Yup.string().required("Quantity is Required")
    });

    // useForm configurations
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PickupRequestRequest>({ resolver: yupResolver(validationSchema) });

    useEffect(() => {
        /**
         * This function is used to get collection center details using collection center username
         * @param collectionCenterUsername : string
         */
        const getCollectionCenterDetails = async (collectionCenterUsername: string, request: ProfileRequest) => {
            try {
                const collectionCenterDetailsResponse = await PublicService.getCollectionCenterDetails(collectionCenterUsername);
                const userSettingsResponse = await ProfileService.getUserSettings(request);
                userSettingsResponse && setUserSettings(userSettingsResponse);
                collectionCenterDetailsResponse && setCollectionCenterDetails(collectionCenterDetailsResponse);
            } catch (error) {
                console.error(error);
            }
        }
        if (username && userRole && collectionCenterUsername) {
            const profileRequest = { username, role: userRole };
            getCollectionCenterDetails(collectionCenterUsername, profileRequest);
        }
    }, [collectionCenterUsername, setValue, userRole, username])


    useEffect(() => {
        // set form values after fetching the user settings
        if (userSettings) {
            setValue('customerContactNumber', userSettings.contactNumber || '');
            setValue('customerAddressLine1', userSettings.addressLine1 || '');
            setValue('customerAddressLine2', userSettings.addressLine2 || '');
            setValue('customerAddressLine3', userSettings.addressLine3 || '');
        }
    }, [setValue, userSettings])

    /**
     * This function is used to calculate total payment using use input quantity
     * @param quantity : string
     */
    const totalPaymentHandler = (quantity: string) => {
        const inputQuantity = parseInt(quantity);
        let total = 0;
        if (collectionCenterDetails && collectionCenterDetails?.payment && inputQuantity > -1) {
            total = inputQuantity * collectionCenterDetails?.payment;
        }
        setTotalPayment(total);
    };


    const submitPickupRequest = async (request: PickupRequestRequest) => {
        // add missing values to the final request
        const missingValues = { totalPayment: totalPayment ? totalPayment : 0, customerUsername: username ? username : '', collectionCenterUsername };
        const finalRequest = { ...request, ...missingValues };

        try {
            const response = await RequestService.createNewPickupRequest(finalRequest);
            if (response && response.status && typeof response.response === 'string') {
                setSuccessful(true);
                setMessage(response.response);
                navigate("/dashboard", { state: { parameter: username } })
            } else if (response && typeof response.response === 'string') {
                setSuccessful(false);
                setMessage(response.response);
            }
        } catch (error: any) {
            console.error(error?.message);
            setSuccessful(false);
            if (error && error.message) {
                setMessage(error?.message);
            } else {
                setMessage('Request submission failed, please try again!');
            }
        }
    }

    return (
        <>
            {message && (
                <div className='container p-0 mt-5'>
                    <div className={`text-center mb-0 ${successful ? "alert alert-success" : "alert alert-danger"}`} role="alert"> {message}</div>
                </div>
            )}
            <div className="container mt-3 border mb-5">
                <div className="row">
                    <form>
                        <div className='pick-up-request-container'>
                            {/* Customer details */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-3 mx-auto request-card">
                                <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
                                    <h5 className="mb-0">Your Details</h5>
                                </div>
                                <div className="mt-2 p-3 border">
                                    <div className="form-group mb-3">
                                        <label ><h6>Address</h6></label>
                                        <input type="text"{...register("customerAddressLine1")} className={`form-control ${errors.customerAddressLine1 ? 'is-invalid' : ''}`} placeholder="Address line 1" />
                                        <div className="invalid-feedback">{errors.customerAddressLine1?.message}</div>
                                        <input type="text"{...register("customerAddressLine2")} className={`form-control  mt-1 ${errors.customerAddressLine2 ? 'is-invalid' : ''}`} placeholder="Address line 2" />
                                        <div className="invalid-feedback">{errors.customerAddressLine2?.message}</div>
                                        <input type="text"{...register("customerAddressLine3")} className={`form-control  mt-1 ${errors.customerAddressLine3 ? 'is-invalid' : ''}`} placeholder="Address line 3" />
                                        <div className="invalid-feedback">{errors.customerAddressLine3?.message}</div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label><h6>Location</h6></label>
                                        <input type="text" {...register("customerLocation")} className={`form-control mt-1 ${errors.customerLocation ? 'is-invalid' : ''}`} placeholder='Location'></input>
                                        <div className="invalid-feedback">{errors.customerLocation?.message}</div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label><h6>Contact Number</h6></label>
                                        <input type="text" {...register("customerContactNumber")} className={`form-control mt-1 ${errors.customerContactNumber ? 'is-invalid' : ''}`} placeholder='Contact Number'></input>
                                        <div className="invalid-feedback">{errors.customerContactNumber?.message}</div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label><h6>Note</h6></label>
                                        <textarea {...register("note")} className={`form-control rounded-2 mt-1 ${errors.note ? 'is-invalid' : ''}`} ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Collection center details */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-3 mx-auto">
                                <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
                                    <h5 className="mb-0">Collection Center Details</h5>
                                </div>
                                <div className="mt-2 p-3 border">
                                    <div>
                                        <h6>Name : {collectionCenterDetails?.centerName}</h6>
                                    </div>
                                    <hr />
                                    <div className="border p-3 mb-3">
                                        <ul className="list-group list-group-flush text-center">
                                            <li className="list-group-item">Waste Types : {collectionCenterDetails?.wasteType}</li>
                                            <li className="list-group-item">Payment for 1kg : Rs.{collectionCenterDetails?.payment}</li>
                                            <li className="list-group-item text-truncate">Collecting days : {collectionCenterDetails?.workingDays.toString()} </li>
                                            <li className="list-group-item">Location : {collectionCenterDetails?.location} </li>
                                        </ul>
                                    </div>
                                    <div className="col-auto mb-2">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div id="quantityLabel" className={`input-group-text rounded-0`} >Quantity :</div>
                                            </div>
                                            <input type="text" {...register("quantity")} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} placeholder="Enter quantity..." onChange={(e) => totalPaymentHandler(e.target.value)} />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text rounded-0">Kg</div>
                                            </div>
                                        </div>
                                        <div className="invalid-feedback d-block">{errors.quantity?.message}</div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend ">
                                                <div id="totalPriceLabel" className="input-group-text rounded-0" >Total Payment (LKR) :</div>
                                            </div>
                                            <input id="totalPrice" {...register("totalPayment")} type="text" className="form-control rounded-0" placeholder="totalPayment.00 LKR" value={totalPayment} disabled></input>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ marginBottom: '40px' }} />
                                <div className="text-end">
                                    <button className="btn btn-dark btn-custom-1 px-4" id="submit-btn" type="button" onClick={handleSubmit(submitPickupRequest)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}