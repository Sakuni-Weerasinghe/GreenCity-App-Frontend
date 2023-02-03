import React from 'react'
import collectionRequestBanner from "../../../assets/Images/collectionRequestBanner.jpg"
import InprogressRequest from '../inprogressRequest/inprogressRequest'
import CollectionRequestStatusBar from './collectionRequestStatusBar/collectionRequestStatusBar'

import "./requestDashboard.css"

const RequestDashboard = () => {
    return (
        <>
            <div id="collectionRequestBanner">
                <img src={collectionRequestBanner}></img>
            </div>
            <CollectionRequestStatusBar />
        </>
    )
}

export default RequestDashboard
