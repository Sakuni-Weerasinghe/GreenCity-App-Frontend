import React from 'react'
import { useNavigate } from 'react-router-dom';
import customerRequestBanner from "../../assets/Images/customerRequestBanner.jpg"

import "./request.css"
import Request_status_bar from './request_status_bar/request_status_bar';

const Request = () => {
    const navigate = useNavigate();
    return (
        <>
            <div id="requestBanner">
                <img src={customerRequestBanner}></img>
            </div>
            <Request_status_bar />


        </>
    )
}

export default Request