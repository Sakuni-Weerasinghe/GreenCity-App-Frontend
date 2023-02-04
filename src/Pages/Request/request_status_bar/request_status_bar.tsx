import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./request_status_bar.css"

const Request_status_bar = () => {
    const navigate = useNavigate();

    const onHandleCancel = () => {
        navigate("/customer/request/cancelRequest")
    }
    const onHandleActive = () => {
        navigate("/customer/request/activeRequest")
    }
    const onHandleComplete = () => {
        navigate("/customer/request/completeRequest")
    }
    return (
        <>
            <div id="request_search_bar" className=" p-3">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={onHandleActive}>Active</button>
                        </div>
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={onHandleCancel}>Cancel</button>
                        </div>
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={onHandleComplete}>Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Request_status_bar
