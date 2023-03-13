import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react'
import * as Yup from "yup";
import { CollectionCenter_updateForm } from '../../../../types/type';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import * as profileManagementService from "../../../../shared/services/profileManagement.service"

const style = {
    cardTitle: {
        background: "#778c17",
        fontColor: "white",
    },
}

const CollectionCenter_update = () => {
    let navigate = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const currentUser = profileManagementService.getCurrentUser();
    const currentCollectionCenterDetails = profileManagementService.getCurrentCollectionCenterProfileDetails();

    const validationSchema = Yup.object().shape({
        centername: Yup.string().required("Center Name is required"),
        contactnumber: Yup.string().required("Contact Number is required"),
        email: Yup.string().email("This is not a valid email.").required("This field is required!"),
        addressline1: Yup.string().required("Address is Required"),
        addressline2: Yup.string().required("Address is Required"),
        addressline3: Yup.string().required("Address is Required"),
        location: Yup.string().required("Location is Required"),
        username: Yup.string().required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        picture: Yup.mixed().test("required", "Collection Center picture is required!", value => {
            return value && value.length;
        }),
        description: Yup.string().required(" Description is required!")
            .max(400, "Exceeds the maximum size!"),
        wastetype: Yup.string().required("Mention collecting waste types"),
        payment: Yup.number().required("Mention payment"),
        working_days: Yup.array().required("Mention working days!  "),
        status: Yup.string().required("Status is required! "),
    })

    const onSubmitFull = (data: CollectionCenter_updateForm) => {
        const { username, centername, contactnumber, email, addressline1, addressline2, addressline3, location, wastetype, payment, description, status } = data;
        profileManagementService.fullcollectionCenterProfileUpdate(currentUser.username, username, centername, contactnumber, email, addressline1, addressline2, addressline3, location, wastetype, payment, description, status).then(
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
    }
    const onSubmit = (data: CollectionCenter_updateForm) => {
        const { username, centername, contactnumber, email, addressline1, addressline2, addressline3, location, wastetype, payment, description, status } = data;
        profileManagementService.collectionCenterProfileUpdate(currentUser.username, username, centername, contactnumber, email, addressline1, addressline2, addressline3, location, status).then(
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
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CollectionCenter_updateForm>({
        resolver: yupResolver(validationSchema)
    })

    return (
        <>
            <section className=" my-5">
                <div className='container col-lg-7 '>
                    <div className="card rounded-0">
                        <div style={style.cardTitle} className="p-2 text-center">
                            <h5 className="fw-bold">Update Your Profile Details</h5>
                        </div>
                        {message && (
                            <div className="form-group pt-5 px-5 mx-3">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="card-body px-5 mx-3 py-4 ">
                            {currentCollectionCenterDetails.moreDetailStatus ? (

                                <form id='collectionCenter_update' onSubmit={handleSubmit(onSubmitFull)}>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Center Name</label>
                                        <input type="text"{...register("centername")} className={`form-control ${errors.centername ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.centername} />
                                        <div className="invalid-feedback">{errors.centername?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Contact Number</label>
                                        <input type="text"{...register("contactnumber")} className={`form-control ${errors.contactnumber ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.contactNumber} />
                                        <div className="invalid-feedback">{errors.contactnumber?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Email</label>
                                        <input type="text"{...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Address</label>
                                        <input type="text"{...register("addressline1")} className={`form-control ${errors.addressline1 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine1} />
                                        <input type="text"{...register("addressline2")} className={`form-control  mt-1 ${errors.addressline2 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine2} />
                                        <input type="text"{...register("addressline3")} className={`form-control  mt-1 ${errors.addressline3 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine3} />
                                        <div className="invalid-feedback">{errors.addressline1?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Location</label>
                                        <input type="text"{...register("location")} className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder="Location(city)" />
                                        <div className="invalid-feedback">{errors.location?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>User Name</label>
                                        <input type="text"{...register("username")} className={`form-control ${errors.username ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.username} />
                                        <div className="invalid-feedback">{errors.username?.message}</div>
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className='py-1 '>Collection Center Picture</label>
                                        <input type="file" {...register("picture")} className={`form-control-file ps-3 rounded-1`} />
                                        <div className="invalid-feedback">{errors.picture?.message}</div>
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label className='py-1'>Collection Center Profile Status</label><br />
                                        <input {...register("status")} type="radio" className='mx-2 ' value="on" />Active
                                        <input {...register("status")} type="radio" className='mx-2' value="off" />Disable
                                        <div className="invalid-feedback">{errors.status?.message}</div>
                                    </div>

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

                            ) : (
                                <form id='collectionCenter_update' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Center Name</label>
                                        <input type="text"{...register("centername")} className={`form-control ${errors.centername ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.centername} />
                                        <div className="invalid-feedback">{errors.centername?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Contact Number</label>
                                        <input type="text"{...register("contactnumber")} className={`form-control ${errors.contactnumber ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.contactNumber} />
                                        <div className="invalid-feedback">{errors.contactnumber?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Email</label>
                                        <input type="text"{...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Address</label>
                                        <input type="text"{...register("addressline1")} className={`form-control ${errors.addressline1 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine1} />
                                        <input type="text"{...register("addressline2")} className={`form-control  mt-1 ${errors.addressline2 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine2} />
                                        <input type="text"{...register("addressline3")} className={`form-control  mt-1 ${errors.addressline3 ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.addressLine3} />
                                        <div className="invalid-feedback">{errors.addressline1?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Location</label>
                                        <input type="text"{...register("location")} className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder="Location(city)" />
                                        <div className="invalid-feedback">{errors.location?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>User Name</label>
                                        <input type="text"{...register("username")} className={`form-control ${errors.username ? 'is-invalid' : ''}`} value={currentCollectionCenterDetails.username} />
                                        <div className="invalid-feedback">{errors.username?.message}</div>
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className='py-1 '>Collection Center Picture</label>
                                        <input type="file" {...register("picture")} className={`form-control-file ps-3 rounded-1`} />
                                        <div className="invalid-feedback">{errors.picture?.message}</div>
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label className='py-1'>Collection Center Profile Status</label><br />
                                        <input {...register("status")} type="radio" className='mx-2 ' value="on" />Active
                                        <input {...register("status")} type="radio" className='mx-2' value="off" />Disable
                                        <div className="invalid-feedback">{errors.status?.message}</div>
                                    </div>
                                    <div className="modal-footer my-4">
                                        <button id="clear-btn" type="button" className="btn btn-dark btn-block mx-4 px-5" onClick={() => reset()}>Clear</button>
                                        <button type="submit" className="btn btn-dark btn-block px-5">Add details</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default CollectionCenter_update