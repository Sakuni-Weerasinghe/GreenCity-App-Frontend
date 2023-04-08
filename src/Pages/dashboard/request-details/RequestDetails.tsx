import { useState, useEffect } from 'react';
import './RequestDetails.css';
import { RequestService } from '../../../shared/services/request.service';
import { useNavigate, useParams } from 'react-router-dom';
import { PickupRequestDetailsResponse } from '../../../shared/models/pickupRequestModel';
import { formatDateTime } from '../../../config/request-headers';

export const RequestDetails = () => {
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const [pickupRequestDetails, setPickupRequestDetails] = useState<PickupRequestDetailsResponse>();
    const [success, setSuccess] = useState<Boolean>();
    const [successMessage, setSuccessMessage] = useState<String>();
    const [requestStatus, setRequestStatus] = useState('');
    const [time, setTime] = useState(new Date().getSeconds());
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * This function is used to get pickup request details using pickup request ID
         * @param id : string
         */
        const getPickupRequestDetails = async (id: string) => {
            try {
                const response = await RequestService.getPickupRequestDetails(id);
                if (response) {
                    if (response.status && typeof response.response === "object") {
                        setPickupRequestDetails(response.response as PickupRequestDetailsResponse);
                    } else {
                        navigate('/404');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (requestId) {
            getPickupRequestDetails(requestId);
        }

        /**
         * This function will calculate elapsed duration of the pickup request using accepted time
         */
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, [requestId]);

    useEffect(() => {
        setRequestStatus(pickupRequestDetails?.status as string);
    }, [pickupRequestDetails?.status])

    /**
     * This function is used to handle pickup request confirmation alert and update pickup request status
     * @param value : boolean
     */
    const onClickHandler = async (value: string) => {
        try {
            if (value === 'completed') {
                window.scrollTo(0, 0);
            }
            if (username && userRole && requestId) {
                const request = { username, userRole, updatedStatus: value, requestId: requestId };
                const response = await RequestService.updatePickupRequestStatus(request);
                if (response) {
                    if (response.status) {
                        setRequestStatus(value);
                        setSuccess(true);
                        setSuccessMessage(response.response as string);
                    } else {
                        setSuccess(false);
                        setSuccessMessage(response.response as string);
                    }
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 2000);
                }
            }
        } catch (error) {
            console.error(error);
            setSuccess(false);
            setSuccessMessage('Sorry, pickup request update is Failed!')
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }

    // convert the time value to a date object
    const date = new Date();
    date.setSeconds(time);

    return (
        <>
            <div className="container mt-5">

                {/* Request update fail alert */}
                {successMessage && !success &&
                    <div className="message alert alert-danger text-center" role="alert">
                        <p className="alert-heading m-0">Sorry, pickup request update is Failed!</p>
                    </div>
                }
                {/* Request update success alert */}
                {successMessage && success &&
                    <div className="message alert alert-success text-center" role="alert">
                        <p className="alert-heading m-0">{successMessage}</p>
                    </div>
                }
                {/* Request confirmation alert */}
                {userRole === 'COLLECTION_CENTER' && requestStatus === 'INPROGRESS' &&
                    (<div className="jumbotron p-3 mb-3 success">
                        <h5>Pickup Confirmation</h5>
                        <hr />
                        <p>This pickup request is still not accepted, Do you want to accept and continue?</p>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-danger mx-1" onClick={() => onClickHandler('CANCELED')}>Decline</button>
                            <button type="button" className="btn btn-success mx-1" onClick={() => onClickHandler('ACTIVE')}>Accept</button>
                        </div>
                    </div>)
                }
                {/* Request completed alert */}
                {requestStatus === 'COMPLETED' &&
                    <div className="jumbotron p-3 mb-3 text-center success">
                        <h4>Whoooha! This Pick request is Completed!.</h4>
                    </div>
                }
                {/* Pickup request header details */}
                <div id="order_header" className="jumbotron px-3 py-2 mb-3">
                    <h4 className="text-left my-3">
                        {
                            userRole === 'USER' ? `Collection Center Name: ${pickupRequestDetails?.collectionCenterName}`
                                : userRole === 'COLLECTION_CENTER' ? `Customer Name: ${pickupRequestDetails?.customerName}` : ''
                        }
                    </h4>
                    <hr />
                    <div className="row my-3">
                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 text-md-start text-sm-center">
                            <p className="mb-1">Created On: {formatDateTime(pickupRequestDetails?.createdDate as string)}</p>
                        </div>
                        {requestStatus && requestStatus !== 'INPROGRESS' &&
                            <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 text-md-end text-sm-center">
                                <p className="mb-1">
                                    {
                                        requestStatus === 'ACTIVE' && pickupRequestDetails?.acceptedDate ? `Accepted On: ${formatDateTime(pickupRequestDetails?.acceptedDate as string)}`
                                            : requestStatus === 'COMPLETED' && pickupRequestDetails?.completedDate ? `Completed On: ${formatDateTime(pickupRequestDetails?.completedDate as string)}`
                                                : requestStatus === 'CANCELED' && pickupRequestDetails?.canceledDate ? `Canceled On: ${formatDateTime(pickupRequestDetails?.canceledDate as string)}`
                                                    : ''
                                    }
                                </p>
                            </div>
                        }
                    </div>
                </div>
                {/* Countdown CLOCK */}
                {requestStatus === 'ACTIVE' &&
                    <div className="text-center">
                        <div className="title jumbotron-fluid py-3">
                            <h4>Elapsed Duration</h4>
                        </div>
                        <div className="row py-5 px-2 m-0">
                            <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                                <h5>DAYS</h5>
                                <h5>{date.getDay()}</h5>
                            </div>
                            <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                                <h5>HOURS</h5>
                                <h5>{date.getHours()}</h5>
                            </div>
                            <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                                <h5>MINUTES</h5>
                                <h5>{date.getMinutes()}</h5>
                            </div>
                            <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                                <h5>SECONDS</h5>
                                <h5>{date.getSeconds()}</h5>
                            </div>
                        </div>
                    </div>
                }
                {/* Pickup request other details */}
                <hr />
                <div id="note" className="row mt-3 mx-0">
                    <h5 className="col py-2 text-center">Note</h5>
                </div>
                <div>
                    <p className="text-justify p-3">{pickupRequestDetails?.note}</p>
                </div>
                <div id="details" className="mb-3 text-center">
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Waste Type</p>
                            <p>{pickupRequestDetails?.wasteType}</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting in</p>
                            <p>{pickupRequestDetails?.workingDays && pickupRequestDetails?.workingDays.length > 0 && pickupRequestDetails?.workingDays.toString()}</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Quantity</p>
                            <p>{pickupRequestDetails?.quantity}</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Total Payment</p>
                            <p>{pickupRequestDetails?.totalPayment}</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Location</p>
                            <p>{pickupRequestDetails?.location}</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting Address</p>
                            <p>{`${pickupRequestDetails?.addressLine1}, 
                                 ${pickupRequestDetails?.addressLine2}, 
                                 ${pickupRequestDetails?.addressLine3}.`}</p>
                        </div>
                    </div>
                </div>
                {requestStatus !== 'ACTIVE' && userRole === 'USER' &&
                    <>
                        <hr />
                        <div className="d-grid gap-2 mx-auto mt-3 mb-5">
                            <button className="btn btn-dark px-3 mb-3 mt-1 btn-custom-1 py-3" type="button"
                                onClick={() => onClickHandler('COMPLETED')}>Complete Pickup</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}