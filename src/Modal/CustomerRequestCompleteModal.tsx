import React from 'react'
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';


const style = {
    button: {
        border: "none",
        width: "20%",
    },
};

const CustomerRequestCompleteModal = (props: any) => {
    const navigate = useNavigate();

    const modalStateHandler = (value: string) => {
        if (value === "cancel") {
            props.onHide();
            navigate("/collectionRequest/customer1/requestDetails");
        } else if (value === "confirm") {
            props.onHide();
            navigate("/collectionRequest/completeRequest");
        }
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h6>Are you sure, do you want to complete this request?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => modalStateHandler("cancel")} className="btn btn-dark  px-2 my-3 " style={style.button}> Cancel </button>
                    <button onClick={() => modalStateHandler("confirm")} className="btn btn-dark  px-2 my-3 " style={style.button}> Confirm </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerRequestCompleteModal