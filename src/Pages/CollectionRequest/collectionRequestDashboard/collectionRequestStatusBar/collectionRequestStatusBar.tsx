import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./collectionRequestStatusBar.css"

interface Props {
    onButtonClicked: (buttonName: string) => void;
}

const CollectionRequestStatusBar: React.FC<Props> = ({ onButtonClicked }) => {
    const handleInprogressClick = () => {
        onButtonClicked('inprogress');
    };

    const handleActiveClick = () => {
        onButtonClicked('active');
    };

    const handleCompleteClick = () => {
        onButtonClicked('complete');
    };

    return (
        <>
            <div id="request_search_bar" className=" p-3">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleInprogressClick}>Inprogress</button>
                        </div>
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleActiveClick}>Active</button>
                        </div>
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={handleCompleteClick}>Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionRequestStatusBar
