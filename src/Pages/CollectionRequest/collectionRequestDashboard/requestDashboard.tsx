import React, { useState } from 'react'
import collectionRequestBanner from "../../../assets/Images/collectionRequestBanner.jpg"
import ActiveRequest from '../activeRequest/activeRequest'
import CompleteRequest from '../completeRequest/completeRequest'
import InprogressRequest from '../inprogressRequest/inprogressRequest'
import CollectionRequestStatusBar from './collectionRequestStatusBar/collectionRequestStatusBar'

import "./requestDashboard.css"

const RequestDashboard = () => {

    const [showInprogressRequest, setShowInprogressRequest] = useState(true);
    const [showActiveRequest, setShowActiveRequest] = useState(false);
    const [showCompleteRequest, setShowCompleteRequest] = useState(false);

    const handleButtonClicked = (buttonName: string): void => {
        switch (buttonName) {
            case 'inprogress':
                setShowInprogressRequest(true);
                setShowActiveRequest(false);
                setShowCompleteRequest(false);
                break;
            case 'active':
                setShowInprogressRequest(false);
                setShowActiveRequest(true);
                setShowCompleteRequest(false);
                break;
            case 'complete':
                setShowInprogressRequest(false);
                setShowActiveRequest(false);
                setShowCompleteRequest(true);
                break;
            default:
                setShowInprogressRequest(false);
                setShowActiveRequest(false);
                setShowCompleteRequest(false);
                break;
        }
    }

    return (
        <>
            <div id="collectionRequestBanner">
                <img src={collectionRequestBanner}></img>
            </div>
            <CollectionRequestStatusBar onButtonClicked={handleButtonClicked} />
            {showInprogressRequest && <InprogressRequest />}
            {showActiveRequest && <ActiveRequest />}
            {showCompleteRequest && <CompleteRequest />}
        </>
    )
}

export default RequestDashboard
