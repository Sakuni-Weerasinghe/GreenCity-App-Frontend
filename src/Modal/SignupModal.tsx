import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const style = {
  button: {
    backgroundColor: "#778c17",
    border: "none",
    width: "100%",
  },
};

const SignupModal = (props: any) => {
  const navigate = useNavigate();

  const modalStateHandler = (selectedCategory: String) => {
    if (selectedCategory === "user") {
      props.onHide();
      navigate("/signup/userSignup");
    } else if (selectedCategory === "collectionCenter") {
      props.onHide();
      navigate("/signup/centerSignup");
    }
  };

  return (
    <>
      <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body><h5>Register As,</h5></Modal.Body>
        <Modal.Footer>
          <button onClick={() => modalStateHandler("user")} className="btn btn-dark btn-block px-5 mb-3" style={style.button}> USER </button>
          <button onClick={() => modalStateHandler("collectionCenter")} className="btn btn-dark btn-block px-5" style={style.button} > COLLECTION CENTER </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupModal;
