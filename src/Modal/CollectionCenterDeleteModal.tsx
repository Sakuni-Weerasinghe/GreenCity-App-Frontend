import React from 'react'
import { useNavigate } from 'react-router-dom';


const style = {
    button: {
        border: "none",
        width: "20%",
    },
};

const CollectionCenterDeleteModal = (props: any) => {
    const navigate = useNavigate();

    const modalStateHandler = (value: string) => {
        if (value === "Yes") {
            props.onHide();
            navigate("/");
        } else if (value === "No") {
            props.onHide();
            navigate("/collectionCenter");
        }
    };

    return (
        <>
            {/* <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h6>Are you sure do you want to delete collection center?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => modalStateHandler("No")} className="btn btn-dark  px-2 my-3 " style={style.button}> No </button>
                    <button onClick={() => modalStateHandler("Yes")} className="btn btn-danger  px-2 my-3 " style={style.button}> Yes </button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};

export default CollectionCenterDeleteModal