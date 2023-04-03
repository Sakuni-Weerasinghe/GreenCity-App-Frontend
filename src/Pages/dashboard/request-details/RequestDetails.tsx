import { useState, useEffect } from 'react';
import CustomerRequestAcceptModal from '../../../Modal/CustomerRequestAcceptModal';
import CustomerRequestCompleteModal from '../../../Modal/CustomerRequestCompleteModal';
import CustomerRequestDeclineModal from '../../../Modal/CustomerRequestDeclineModal';
import './RequestDetails.css';

export const RequestDetails = () => {
    const [showRequestCompletionModal, setShowRequestCompletionModal] = useState(false)
    const [showCustomerRequestDeclineModal, setShowCustomerRequestDeclineModal] = useState(false)
    const [showCustomerRequestAcceptModal, setShowCustomerRequestAcceptModal] = useState(false)
    const [wastCollector, setWasteCollector] = useState("");

    const note = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur quam justo, ut rutrum sapien porta accumsan. Maecenas sit amet molestie urna, id rutrum leo. Nullam viverra venenatis nisl, at tempor mauris viverra vitae. Mauris mattis vel sapien egestas placerat. Mauris orci aliquam.';




    // Timer
    const [time, setTime] = useState(0);

    // update the time value every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        // cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // convert the time value to a date object
    const date = new Date();
    date.setSeconds(time);

    return (
        <>
            <div className="container mt-5">

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
                        <p>This request is still not accepted, Do you want to accept it now?</p>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-danger mx-1" onClick={() => setShowCustomerRequestDeclineModal(true)}>Decline</button>
                            <button type="button" className="btn btn-success mx-1" onClick={() => setShowCustomerRequestAcceptModal(true)}>Accept</button>
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
                    <h4 className="text-left my-3">Customer Name: Sakuni Weerasinghe</h4>
                    <hr />
                    <div className="row my-3">
                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                            <p className="mb-1">Created On: 2023-01-03</p>
                        </div>
                    </div>
                </div>

                {/* <!----------------Countdown CLOCK-----------------------> */}

                <div className="text-center">

                    <div className="title jumbotron-fluid py-3">
                        <h4>Elapsed Duration</h4>
                    </div>

                    <div className="row py-5 px-2 m-0">
                        <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                            <h5>DAYS</h5>
                            <h5>{date.getDay()}</h5>
                        </div>
                        <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                            <h5>HOURS</h5>
                            <h5>{date.getHours()}</h5>
                        </div>
                        <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                            <h5>MINUTES</h5>
                            <h5>{date.getMinutes()}</h5>
                        </div>
                        <div className="clock-box col-xl-3 col-l-3 col-md-3 col-sm-6 p-2">
                            <h5>SECONDS</h5>
                            <h5>{date.getSeconds()}</h5>
                        </div>
                    </div>
                </div>
                <hr />
                <div id="note" className="row mt-3 mx-0">
                    <h5 className="col py-2 text-center">Note</h5>
                </div>
                <div>
                    <p className="text-justify p-3">{note}</p>
                </div>
                <div id="details" className="mb-3 text-center">
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Waste Type</p>
                            <p>Plastic</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting in</p>
                            <p>Monday, Tuesday</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Quantity</p>
                            <p>400 kg</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Total Payment</p>
                            <p>4500.00 LKR</p>
                        </div>
                        <div className="col">
                            <p className="title p-2">Location</p>
                            <p>Kandy</p>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col">
                            <p className="title p-2">Collecting Address</p>
                            <p>125/B, Thennekumbura, Kandy</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='mb-5'>
                    <button type="button"
                        className="bigButton col-12 btn text-light py-3" onClick={() => { setShowRequestCompletionModal(true) }}>
                        <h6>Complete Order</h6>
                    </button>
                    <CustomerRequestCompleteModal show={showRequestCompletionModal} onHide={() => setShowRequestCompletionModal(false)} />
                </div>
            </div>
        </>
    )
}