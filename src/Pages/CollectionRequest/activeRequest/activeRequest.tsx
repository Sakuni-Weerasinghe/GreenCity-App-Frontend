import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./activeRequest.css"

const ActiveRequest = () => {
    const navigate = useNavigate()

    const onRequestConfirm = () => {
        navigate("/collectionRequest/customer1/requestDetails")
    }

    return (
        <>
            <div className="container mt-5 mb-5">
                <div id="header" className="py-3 text-light text-center mb-3">
                    <h5>Active Orders</h5>
                </div>
                {/* <div className="message alert text-center" role="alert">
                    <h5 className="alert-heading">There is no inprogress orders for your shops.</h5>
                </div>
                <div className="message alert text-center" role="alert">
                    <h5 className="alert-heading">There are no inprogress orders ordered by you.</h5>
                </div> */}
                <div id="active_header_bar" className="jumbotron p-4 mb-2">
                    <div className="row">
                        <div className="col-xl-10 col-lg-9 col-md-9 col-sm-12">
                            <h5>Category : </h5>
                            <h6>Amount : </h6>
                            <h6>Waste Collector : </h6>
                            <hr className="my-0 mt-3 mb-2" />
                            <p className="mb-0">Created On: 2023-01-03</p>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 text-right">
                            <button className="btn w-100 mt-3" onClick={onRequestConfirm}>View</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveRequest