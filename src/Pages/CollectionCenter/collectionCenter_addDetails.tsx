import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import * as Yup from "yup";
import { CollectionCenter_addDetailForm } from '../../types/type';
import { useForm } from 'react-hook-form';

import "./collectioncenter.css";
import { useNavigate } from 'react-router-dom';
import * as profileManagementService from "../../services/profileManagement.service"

const style = {
    cardTitle: {
        background: "#778c17",
        fontColor: "white",
    },
}

const CollectionCenter_addDetails = () => {
    let navigate = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [picture, setPicture] = useState<string>("");
    const currentUser = profileManagementService.getCurrentUser();

    const validationSchema = Yup.object().shape({
        description: Yup.string().required(" Description is required!")
            .max(400, "Exceeds the maximum size!"),
        picture: Yup.mixed().test("required", "Collection Center picture is required!", value => {
            return value && value.length;
        }),
        wastetype: Yup.string().required("Mention collecting waste types"),
        payment: Yup.number().required("Mention payment"),
        working_days: Yup.array().required("Mention working days!  ")
    });

    const onSubmit = (data: CollectionCenter_addDetailForm) => {
        const { wastetype, payment, description } = data;
        profileManagementService.collectionCenterProfileAddDetails(currentUser.username, wastetype, payment, description).then(
            (response) => {
                setMessage(response.data.response);
                if (response.data.responseStatus) {
                    reset();
                    setSuccessful(true);
                } else {
                    setSuccessful(false);
                }
                navigate("/userProfile/" + currentUser.username)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setSuccessful(false);
                setMessage(resMessage);
            }
        );
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CollectionCenter_addDetailForm>({
        resolver: yupResolver(validationSchema)
    })

    return (
        <>
            <section className=" my-5">
                <div className='container col-lg-7 '>
                    <div className="card rounded-0">
                        <div style={style.cardTitle} className="p-2 text-center">
                            <h5 className="fw-bold">Add details about your collection center</h5>
                        </div>
                        {message && (
                            <div className="form-group pt-5 px-5 mx-3">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="card-body px-5 mx-3 py-4 ">
                            <form id='addDetails_collectioncenter' onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Waste Type</label><br />
                                    <select {...register("wastetype")} className={`form-control rounded-1 ${errors.wastetype ? 'is-invalid' : ''}`} >
                                        <option value="">Waste Type</option>
                                        <option value="Plastic">Plastic </option>
                                        <option value="Metal">Metal </option>
                                        <option value="Glass">Glass</option>
                                        <option value="Polythene">Polythene</option>
                                        <option value="E-Waste">E-Waste</option>
                                        <option value="Paper">Paper</option>
                                        <option value="Rubber">Rubber</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.wastetype?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Payment for 1kg in Rupees: </label>

                                    <input type="number" {...register("payment")} className={`form-control rounded-1 ${errors.payment ? 'is-invalid' : ''}`} placeholder="Enter payment for 1kg"></input>
                                    <div className="invalid-feedback">{errors.payment?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Description</label>
                                    <textarea {...register("description")} className={`form-control rounded-1 ${errors.description ? 'is-invalid' : ''}`} placeholder="Enter description..."></textarea>
                                    <div className="invalid-feedback">{errors.description?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1 '>Collection Center Picture</label>
                                    <input type="file" {...register("picture")} className={`form-control-file ps-3 rounded-1`} />
                                    <div className="invalid-feedback">{errors.picture?.message}</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className='py-1'>Waste Collecting Days</label><br />
                                    <input {...register("working_days")} type='checkbox' className='mx-3' value="Monday" />Monday
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Tuesday" />Tuesday
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Wednesday" />Wednesday
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Thursday" />Thursday
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Friday" />Friday<br />
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Saturday" />Saturday
                                    <input {...register("working_days")} type="checkbox" className="mx-3" value="Sunday" />Sunday
                                    <div className="invalid-feedback">{errors.working_days?.message}</div>
                                </div>
                                <div className="modal-footer my-4">
                                    <button id="clear-btn" type="button" className="btn btn-dark btn-block mx-4 px-5" onClick={() => reset()}>Clear</button>
                                    <button type="submit" className="btn btn-dark btn-block px-5">Add details</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default CollectionCenter_addDetails