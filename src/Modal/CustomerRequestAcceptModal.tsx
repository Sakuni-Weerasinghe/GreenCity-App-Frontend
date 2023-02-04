import React from 'react'
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';


const style = {
    button: {
        border: "none",
        width: "20%",
    },
};

const CustomerRequestAcceptModal = (props: any) => {
    const navigate = useNavigate();

    const modalStateHandler = (value: string) => {
        if (value === "yes") {
            props.onHide();
            navigate("/collectionRequest/activeRequest");
        } else if (value === "no") {
            props.onHide();
            navigate("/collectionRequest/customer1/requestDetails");
        }
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h6>Are you sure, do you want to accept this request?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => modalStateHandler("yes")} className="btn btn-dark  px-2 my-3 " style={style.button}> Yes </button>
                    <button onClick={() => modalStateHandler("no")} className="btn btn-danger  px-2 my-3 " style={style.button}> No </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerRequestAcceptModal