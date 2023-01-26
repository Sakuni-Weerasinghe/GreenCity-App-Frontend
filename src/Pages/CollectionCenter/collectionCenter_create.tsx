import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import * as Yup from "yup";
import { CollectionCenter_createForm } from '../../types/type';
import { useForm } from 'react-hook-form';
import MapComponent from '../../Component/MapComponent';

import "./collectioncenter.css";
import { useNavigate } from 'react-router-dom';

const style = {
    cardTitle: {
        background: "#778c17",
        fontColor: "white",
    },
}

const CollectionCenter_create = () => {
    let navigate = useNavigate();

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const onSubmit = () => {
        alert("SUBMIT")
        // navigate("/collectionCenter");
    };

    const validationSchema = Yup.object().shape({
        description: Yup.string().required(" Description is required!")
            .min(400, "Exceeds the maximum size!"),
        picture: Yup.string().required("Collection center picture is required!")

    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CollectionCenter_createForm>({
        resolver: yupResolver(validationSchema)
    })

    return (
        <>
            <section className=" my-5">
                <div className='container col-lg-7 '>
                    <div className="card rounded-0">
                        <div style={style.cardTitle} className="p-2 text-center">
                            <h5 className="fw-bold">Create Your Collection Center</h5>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="card-body px-5 mx-3 py-4 ">
                            <form id='create_collectioncenter' onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Center Name</label>
                                    <input type="text" className="form-control rounded-1" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Waste Type</label>
                                    <select className="form-control rounded-1" >
                                        <option value="" selected disabled>Waste Type...</option>
                                        <option value="Metal">Metal</option>
                                        <option value="Paper">Paper</option>
                                        <option value="Plastic">Plastic</option>
                                        <option value="Glass">Glass</option>
                                        <option value="E-Waste">E-Waste</option>
                                        <option value="Polythene">Polythene</option>
                                    </select>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Description</label>
                                    <textarea className={`form-control rounded-1 ${errors.description ? 'is-invalid' : ''}`} placeholder="Enter description..."></textarea>
                                    <div className="invalid-feedback">{errors.description?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1 '>Collection Center Picture</label>
                                    <input type="file" className={`form-control-file px-3 rounded-1 ${errors.picture ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.picture?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Waste Collecting Days</label><br />
                                    <input type='checkbox' className='mx-3' value="Monday" />Monday
                                    <input type="checkbox" className="mx-3" value="Tuesday" />Tuesday
                                    <input type="checkbox" className="mx-3" value="Wednesday" />Wednesday
                                    <input type="checkbox" className="mx-3" value="Thursday" />Thursday
                                    <input type="checkbox" className="mx-3" value="Friday" />Friday<br />
                                    <input type="checkbox" className="mx-3" value="Saturday" />Saturday
                                    <input type="checkbox" className="mx-3" value="Sunday" />Sunday
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Contact Number</label>
                                    <input type="text" className="form-control" placeholder="Contact Number" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Email</label>
                                    <input type="text" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Address</label>
                                    <input type="text" className="form-control mt-1" placeholder="Address line 1" />
                                    <input type="text" className="form-control mt-1" placeholder="Address line 2" />
                                    <input type="text" className="form-control mt-1" placeholder="Address line 3" />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Location</label>
                                    {/* <MapComponent /> */}
                                </div>
                                <div className="modal-footer my-4">
                                    <button id="clear-btn" type="button" className="btn btn-dark btn-block mx-4 px-5" onClick={() => reset()}>Clear</button>
                                    <button id="signup-btn" type="submit" className="btn btn-dark btn-block px-5">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default CollectionCenter_create
