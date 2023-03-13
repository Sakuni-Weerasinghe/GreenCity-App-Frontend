import React from 'react'
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import center from "../assets/Images/Collection_center_thumbnail.png";

const style = {
    button: {
        backgroundColor: "#778c17",
        border: "none",
        width: "100%",
    },
};

const MapIconModal = (props: any) => {
    const navigate = useNavigate();

    const modalStateHandler = (selectedCategory: String) => {
        if (selectedCategory === "user") {
            props.onHide();
            navigate("/collectionCenter/userRequest");
        } else if (selectedCategory === "collectioncenter") {
            props.onHide();
            navigate("/collectionCenter");
        }
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h5>Center Name</h5>
                </Modal.Body>
                <Modal.Footer>
                    <div >
                        <img src={center} className="w-100 h-500 " alt="" />
                        <p>Center Description</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo minus sint iure? Magnam error illo assumenda dignissimos hic harum odio? Odio eligendi vitae quos est ipsa, optio mollitia quo at.</p>
                    </div>
                    <button onClick={() => modalStateHandler("user")} className="btn btn-dark btn-block px-3 mb-3 mt-3" style={style.button}> Request </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MapIconModal