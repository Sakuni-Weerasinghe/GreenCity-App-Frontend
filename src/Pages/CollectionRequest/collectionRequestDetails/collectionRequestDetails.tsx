import React, { useState } from 'react'
import CustomerRequestDeclineModal from '../../../Modal/CustomerRequestDeclineModal'
import CustomerRequestCompleteModal from '../../../Modal/CustomerRequestCompleteModal'
import "./collectionRequestDetails.css"
import CustomerRequestAcceptModal from '../../../Modal/CustomerRequestAcceptModal'

const CollectionRequestDetails = () => {
    const [showRequestCompletionModal, setShowRequestCompletionModal] = useState(false)
    const [showCustomerRequestDeclineModal, setShowCustomerRequestDeclineModal] = useState(false)
    const [showCustomerRequestAcceptModal, setShowCustomerRequestAcceptModal] = useState(false)
    const [wastCollector, setWasteCollector] = useState("");

    return (
        <>
            <div className="container mt-5">

                <div className="text-center">
                    <button id="contact-btn" className="btn btn-dark">Contact Customer1</button>
                </div>
                <hr />
                {/* <div className="message alert alert-danger text-center" role="alert">
                    <h4 className="alert-heading">Order Status Change Failed!</h4>
                </div>
                <div className="message alert alert-danger text-center" role="alert">
                    <h4 className="alert-heading">Order Decline Failed!</h4>
                </div> */}

                {/* Visible for Farmers */}

                <div>
                    <div className="jumbotron p-3 mb-3 success">
                        <h5>Order Confirmation</h5>
                        <hr />
                        <p>This order does not start yet. Do you want to accept and start this order now?</p>
                        <div className='row'>
                            <div className='col-lg-3 px-5 pt-2'>
                                <label><h6>Assign Waste Collector : </h6></label>
                            </div>
                            <div className='col-lg-6'>
                                <select id='assignWasteCollector' className="form-select form-select mb-3" aria-label=".form-select-lg example" onChange={(e) => setWasteCollector(e.target.value)} required>
                                    <option selected>Assign Waste Collector</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>

                        </div>
                        <hr />
                        <div className="text-right">
                            <button type="button" className="btn btn-danger mx-1" onClick={() => setShowCustomerRequestDeclineModal(true)}>Decline</button>
                            <CustomerRequestDeclineModal show={showCustomerRequestDeclineModal} onHide={() => setShowCustomerRequestDeclineModal(false)} />
                            <button type="button" className="btn btn-success mx-1" onClick={() => setShowCustomerRequestAcceptModal(true)}>Accept</button>
                            <CustomerRequestAcceptModal show={showCustomerRequestAcceptModal} onHide={() => setShowCustomerRequestAcceptModal(false)} />
                        </div>
                    </div>

                    {/* <div className="jumbotron p-3 mb-3 text-center success">
                        <h4>Whoooha! This order was completed on 2023-01-05.</h4>
                    </div> */}
                </div>

                {/* Visible for Buyers */}

                <div >

                    {/* <div className="jumbotron p-3 mb-3 text-center success">
                        <h4>Whoooha! This order was completed on 2023-01-03.</h4>
                    </div> */}
                </div>

                {/* Visible for both farmers and buyers */}

                <div id="order_header" className="jumbotron p-3">
                    <h4 className="text-left my-3">Category</h4>
                    <hr />
                    <div className="row my-3">
                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                            <p className="mb-1">Created on: created date</p>
                        </div>
                    </div>
                </div>

                {/* <!----------------Countdown CLOCK-----------------------> */}

                {/* <div class="text-center" *ngIf="!isInprogressOrder && !isCompletedOrder">

    <div class="title jumbotron-fluid py-3">
        <h4>Remaining Time</h4>
    </div>

    <div class="row py-5 px-2 m-0">
        <div class="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
            <h5>DAYS</h5>
            <h5>{{countdown?.days}}</h5>
        </div>
        <div class="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
            <h5>HOURS</h5>
            <h5>{{countdown?.hours}}</h5>
        </div>
        <div class="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
            <h5>MINUTES</h5>
            <h5>{{countdown?.minutes}}</h5>
        </div>
        <div class="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
            <h5>SECONDS</h5>
            <h5>{{countdown?.seconds}}</h5>
        </div>
    </div>
</div> */}
                <hr />
                <div id="note" className="row mt-3 mx-0">
                    <h5 className="col py-2 text-center">Request Note</h5>
                </div>
                <div>
                    <p className="text-justify p-3">request note</p>
                </div>
                <div id="details" className="mb-3 text-center">
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Category</p>
                            <p>category</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting in</p>
                            <p>collecting in days</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Quantity</p>
                            <p>quantity - unit</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Total Payment</p>
                            <p>payment.00 LKR</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Location</p>
                            <p>collecting location</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting Address</p>
                            <p>AddressLine1, AddressLine2,AddressLine3.</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div >
                    <button type="button"
                        className="bigButton col-12 btn text-light py-3" onClick={() => { setShowRequestCompletionModal(true) }}>
                        <h6>Complete Order</h6>
                    </button>
                    <CustomerRequestCompleteModal show={showRequestCompletionModal} onHide={() => setShowRequestCompletionModal(false)} />
                    <hr />
                </div>
            </div>
        </>
    )
}

export default CollectionRequestDetails