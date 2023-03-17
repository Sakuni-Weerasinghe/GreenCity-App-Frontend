import { useEffect, useRef, useState } from 'react';
import './CollectionCenterProfileSettings.css';
import { Modal } from 'bootstrap';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { ProfileManagementService } from '../../../../shared/services/profileManagement.service';
import { CollectionCenterSettingsUpdateRequest } from '../../../../shared/models/profileModel';
import { useForm } from 'react-hook-form';

export const CollectionCenterProfileSettings = (props: any) => {
    const { isShowModal, hideModal, settings, settingsUpdateHandler } = props;
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const modalRef = useRef(null);

    // Settings update form validations
    const validationSchema = Yup.object().shape({
        centerName: Yup.string().required("Center Name is required"),
        contactNumber: Yup.string().required("Contact Number is required")
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
            .matches(/^0\d{9}$/, "Invalid mobile number format"),
        addressLine1: Yup.string().required("Address is Required"),
        addressLine2: Yup.string().required("Address is Required"),
        addressLine3: Yup.string().required("Address is Required"),
        location: Yup.string().required("Location is Required"),
    })

    // useForm configurations
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CollectionCenterSettingsUpdateRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            centerName: settings.centerName,
            contactNumber: settings.contactNumber,
            addressLine1: settings.addressLine1,
            addressLine2: settings.addressLine2,
            addressLine3: settings.addressLine3,
            location: settings.location
        }
    });

    /**
     * This function is used to update collection center settings
     * @param request : CollectionCenterSettingsUpdateRequest
     */
    const updateCollectionCenterSettings = async (request: CollectionCenterSettingsUpdateRequest) => {
        try {
            // attaching username to the update request
            const response = await ProfileManagementService.updateCollectionCenterSettings({ ...request, username: settings.username });
            if (response && response.status) {
                setSuccessful(true);
                setMessage(response.response);
                settingsUpdateHandler(request);
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
                setMessage('Settings update failed, please try again!');
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
            }
        }
    }, [isShowModal])

    return (
        <>
            <div className="modal fade" data-bs-backdrop="static" tabIndex={-1} aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Your Profile Details</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            {message && (
                                <div className="form-group pt-5 px-5 mx-3 text-center">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
                                </div>
                            )}
                            <div className="card-body px-5 mx-3 py-4 ">{settings && (
                                <form>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Center Name</label>
                                        <input type="text"{...register("centerName")} className={`form-control ${errors.centerName ? 'is-invalid' : ''}`} onChange={(e) => setValue('centerName', e.target.value)} />
                                        <div className="invalid-feedback">{errors.centerName?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Contact Number</label>
                                        <input type="text"{...register("contactNumber")} className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`} onChange={(e) => setValue('contactNumber', e.target.value)} />
                                        <div className="invalid-feedback">{errors.contactNumber?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Address</label>
                                        <input type="text"{...register("addressLine1")} className={`form-control ${errors.addressLine1 ? 'is-invalid' : ''}`} onChange={(e) => setValue('addressLine1', e.target.value)} />
                                        <input type="text"{...register("addressLine2")} className={`form-control  mt-1 ${errors.addressLine2 ? 'is-invalid' : ''}`} onChange={(e) => setValue('addressLine2', e.target.value)} />
                                        <input type="text"{...register("addressLine3")} className={`form-control  mt-1 ${errors.addressLine3 ? 'is-invalid' : ''}`} onChange={(e) => setValue('addressLine3', e.target.value)} />
                                        <div className="invalid-feedback">{errors.addressLine1?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Location</label>
                                        <input type="text"{...register("location")} className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder="Location(city)" onChange={(e) => setValue('location', e.target.value)} />
                                        <div className="invalid-feedback">{errors.location?.message}</div>
                                    </div>
                                </form>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit(updateCollectionCenterSettings)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}