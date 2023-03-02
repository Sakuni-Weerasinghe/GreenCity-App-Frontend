import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./request_status_bar.css"

interface Props {
    onButtonClicked: (buttonName: string) => void;
}

const Request_status_bar: React.FC<Props> = ({ onButtonClicked }) => {
    const handleInprogressClick = () => {
        onButtonClicked('inprogress');
    };

    const handleActiveClick = () => {
        onButtonClicked('active');
    };

    const handleCancelClick = () => {
        onButtonClicked('cancel');
    };

    const handleCompleteClick = () => {
        onButtonClicked('complete');
    };

    return (
        <>
            <div id="request_search_bar" className=" p-3">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleInprogressClick}>Inprogress</button>
                        </div>
                        <div className="col-md-3 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleActiveClick}>Active</button>
                        </div>
                        <div className="col-md-3 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleCancelClick}>Cancel</button>
                        </div>
                        <div className="col-md-3 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleCompleteClick}>Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Request_status_bar
