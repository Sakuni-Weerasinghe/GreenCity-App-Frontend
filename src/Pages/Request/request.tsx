import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import customerRequestBanner from "../../assets/Images/customerRequestBanner.jpg"
import CustomerInprogressRequest from './inprogress_request/inprogress_request';
import CustomerCancelRequest from './cancel_request/cancel_request';
import CustomerActiveRequest from './active_request/active_request';
import CustomerCompleteRequest from './complete_request/complete_request';


import "./request.css"
import Request_status_bar from './request_status_bar/request_status_bar';

const Request = () => {
    const [showInprogressRequest, setShowInprogressRequest] = useState(false);
    const [showCancelRequest, setShowCancelRequest] = useState(false);
    const [showActiveRequest, setShowActiveRequest] = useState(true);
    const [showCompleteRequest, setShowCompleteRequest] = useState(false);

    const handleButtonClicked = (buttonName: string): void => {
        switch (buttonName) {
            case 'inprogress':
                setShowInprogressRequest(true);
                setShowCancelRequest(false);
                setShowActiveRequest(false);
                setShowCompleteRequest(false);
                break;
            case 'cancel':
                setShowInprogressRequest(false);
                setShowCancelRequest(true);
                setShowActiveRequest(false);
                setShowCompleteRequest(false);
                break;
            case 'active':
                setShowInprogressRequest(false);
                setShowCancelRequest(false);
                setShowActiveRequest(true);
                setShowCompleteRequest(false);
                break;
            case 'complete':
                setShowInprogressRequest(false);
                setShowCancelRequest(false);
                setShowActiveRequest(false);
                setShowCompleteRequest(true);
                break;
            default:
                setShowInprogressRequest(false);
                setShowCancelRequest(false);
                setShowActiveRequest(false);
                setShowCompleteRequest(false);
                break;
        }
    }
    const navigate = useNavigate();
    return (
        <>
            <div id="requestBanner">
                <img src={customerRequestBanner}></img>
            </div>
            <Request_status_bar onButtonClicked={handleButtonClicked} />
            {showActiveRequest && <CustomerActiveRequest />}
            {showInprogressRequest && <CustomerInprogressRequest />}
            {showCancelRequest && <CustomerCancelRequest />}
            {showCompleteRequest && <CustomerCompleteRequest />}

        </>
    )
}

export default Request