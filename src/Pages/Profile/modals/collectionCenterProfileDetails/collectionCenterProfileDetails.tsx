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
        description: Yup.string().required(" Description is required!").max(400, "Exceeds the maximum size!"),
        active: Yup.string().required("Active is required")
    })

    // useForm configurations
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CollectionCenterDetailsUpdateRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            wasteType: details?.wasteType,
            payment: details?.payment,
            description: details?.description,
            active: details?.active,
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
                                <form>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Waste Type</label>
                                        <input type="text"{...register("wasteType")} className={`form-control ${errors.wasteType ? 'is-invalid' : ''}`} onChange={(e) => setValue('wasteType', e.target.value)} />
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
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Active</label>
                                        <input type="text"{...register("active")} className={`form-control ${errors.active ? 'is-invalid' : ''}`} onChange={(e) => setValue('active', true)} />
                                        <div className="invalid-feedback">{errors.active?.message}</div>
                                    </div>
                                </form>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit(updateCollectionCenterDetails)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}