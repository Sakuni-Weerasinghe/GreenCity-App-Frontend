import { useEffect, useRef, useState } from 'react';
import './CollectionCenterProfileDetails.css';
import { Modal } from 'bootstrap';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { CollectionCenterDetailsUpdateRequest } from '../../../../shared/models/profileModel';
import { useForm } from 'react-hook-form';
import { ProfileManagementService } from '../../../../shared/services/profileManagement.service';

export const CollectionCenterProfileDetails = (props: any) => {
    const { isShowModal, hideModal, details, detailsUpdateHandler } = props;
    const modalRef = useRef(null);
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState('');

    // Details update form validations
    const validationSchema = Yup.object().shape({
        wasteType: Yup.string().required("Waste type is required"),
        payment: Yup.string().required("Payment is required").matches(/^[0-9]+$/, "Invalid payment"),
        description: Yup.string().required("Description is required!").max(400, "Exceeds the maximum size!"),
        workingDays: Yup.array().nullable().required('Please select at least one option').min(1, 'Please select at least one option'),
        active: Yup.string().required("Active is required")
    })

    // useForm configurations
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CollectionCenterDetailsUpdateRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            wasteType: details?.wasteType,
            payment: details?.payment,
            description: details?.description,
            workingDays: details?.workingDays,
            active: details?.active?.toString(),
        }
    });

    /**
     * This function is used to update collection center details
     * @param request : CollectionCenterDetailsUpdateRequest
     */
    const updateCollectionCenterDetails = async (request: CollectionCenterDetailsUpdateRequest) => {
        try {
            // attaching username to the update request
            const response = await ProfileManagementService.updateCollectionCenterDetails({ ...request, username: details.username });
            if (response && response.status) {
                setSuccessful(true);
                setMessage(response.response);
                detailsUpdateHandler(request);
            } else if (response) {
                setSuccessful(false);
                setMessage(response.response);
            }
        } catch (error: any) {
            console.error(error?.message);
            setSuccessful(false);
            if (error && error.message) {
                setMessage(error?.message);
            } else {
                setMessage('Details update failed, please try again!');
            }
        }
    }

    // Handle show/hide settings modal
    useEffect(() => {
        const element = modalRef.current;
        if (element) {
            if (isShowModal) {
                const modal = new Modal(element);
                modal?.show();
            } else {
                const modal = Modal.getInstance(element);
                modal?.hide();
                setMessage('');
            }
        }
    }, [isShowModal])

    return (
        <>
            <div className="modal fade" data-bs-backdrop="static" tabIndex={-1} aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Collection Center Details</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            {message && (
                                <div className="form-group pt-5 px-5 mx-3 text-center">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
                                </div>
                            )}
                            <div className="card-body px-5 mx-3 py-4 ">{details && (
                                <form className='profile-form'>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Waste Type</label>
                                        <select {...register("wasteType")} className={`form-control rounded-1 ${errors.wasteType ? 'is-invalid' : ''}`} >
                                            <option value="">Waste Type</option>
                                            <option value="Plastic">Plastic </option>
                                            <option value="Metal">Metal </option>
                                            <option value="Glass">Glass</option>
                                            <option value="Polythene">Polythene</option>
                                            <option value="E-Waste">E-Waste</option>
                                            <option value="Paper">Paper</option>
                                            <option value="Rubber">Rubber</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.wasteType?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Payment for 1kg</label>
                                        <input type="text"{...register("payment")} className={`form-control ${errors.payment ? 'is-invalid' : ''}`} onChange={(e) => setValue('payment', e.target.value)} />
                                        <div className="invalid-feedback">{errors.payment?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Description</label>
                                        <input type="text"{...register("description")} className={`form-control ${errors.description ? 'is-invalid' : ''}`} onChange={(e) => setValue('description', e.target.value)} />
                                        <div className="invalid-feedback">{errors.description?.message}</div>
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className='py-1'>Working Days</label><br />
                                        <input {...register('workingDays')} type='checkbox' className='mx-3' value="Monday" />Monday
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Tuesday" />Tuesday
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Wednesday" />Wednesday
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Thursday" />Thursday
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Friday" />Friday<br />
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Saturday" />Saturday
                                        <input {...register('workingDays')} type="checkbox" className="mx-3" value="Sunday" />Sunday
                                        <div className="invalid-feedback d-block">{errors.workingDays?.message}</div>
                                    </div>
                                    <div className='form-outline mb-3'>
                                        <label className='py-1'>Collection Center Status</label><br />
                                        <input className='mx-2' type="radio" value="true" name='active' onChange={(e) => setValue("active", e.target.value)} checked={watch("active") === "true"} />Active
                                        <input className='mx-2' type="radio" value="false" name='active' onChange={(e) => setValue("active", e.target.value)} checked={watch("active") === "false"} />Disable
                                        <div className="invalid-feedback d-block">{errors.active?.message}</div>
                                    </div>
                                </form>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-dark btn-custom-1" onClick={handleSubmit(updateCollectionCenterDetails)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}