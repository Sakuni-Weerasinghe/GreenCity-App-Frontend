import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./collectionRequestStatusBar.css"

const CollectionRequestStatusBar = () => {
    const navigate = useNavigate();

    const onHandleInprogress = () => {
        navigate("/collectionRequest/inprogressRequest")
    }
    const onHandleActive = () => {
        navigate("/collectionRequest/activeRequest")
    }
    const onHandleComplete = () => {
        navigate("/collectionRequest/completeRequest")
    }

    return (
        <>
            <div id="request_search_bar" className=" p-3">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={onHandleInprogress}>Inprogress</button>
                        </div>
                        <div className="col-md-4 col-sm-6 my-1 ">
                            <button className="btn  rounded-0" type='button' onClick={onHandleActive}>Active</button>
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

export default CollectionRequestStatusBar
