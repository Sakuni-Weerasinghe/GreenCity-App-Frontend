import { useEffect, useRef, useState } from 'react';
import './UserProfileSettings.css';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { UserSettingsUpdateRequest } from '../../../../shared/models/profileModel';
import { ProfileManagementService } from '../../../../shared/services/profileManagement.service';
import { Modal } from 'bootstrap';
export const UserProfileSettings = (props: any) => {
    const { isShowModal, hideModal, settings, settingsUpdateHandler } = props;
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const modalRef = useRef(null);
    // Settings update form validations
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        contactNumber: Yup.string().required("Contact Number is required")
            .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
            .matches(/^0\d{9}$/, "Invalid mobile number format"),
        addressLine1: Yup.string().required("Address is Required"),
        addressLine2: Yup.string().required("Address is Required"),
        addressLine3: Yup.string().required("Address is Required"),
    })
    // useForm configurations
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserSettingsUpdateRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: settings?.firstName,
            lastName: settings?.lastName,
            contactNumber: settings?.contactNumber,
            addressLine1: settings?.addressLine1,
            addressLine2: settings?.addressLine2,
            addressLine3: settings?.addressLine3
        }
    });
    /**
     * This function is used to update collection center settings
     * @param request : CollectionCenterSettingsUpdateRequest
     */
    const updateUserSettings = async (request: UserSettingsUpdateRequest) => {
        try {
            // attaching username to the update request
            const response = await ProfileManagementService.updateUserSettings({ ...request, username: settings.username });
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
                            <h5 className="modal-title">Update Collection Center Settings</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            {message && (
                                <div className="form-group pt-5 px-5 mx-3 text-center">
                                    <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">{message}</div>
                                </div>
                            )}
                            <div className="card-body px-5 mx-3 py-4 ">{settings && (
                                <form className='profile-form'>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>First Name</label>
                                        <input type="text"{...register("firstName")} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} onChange={(e) => setValue('firstName', e.target.value)} />
                                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className='py-1'>Last Name</label>
                                        <input type="text"{...register("lastName")} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} onChange={(e) => setValue('lastName', e.target.value)} />
                                        <div className="invalid-feedback">{errors.lastName?.message}</div>
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
                                </form>
                            )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-dark btn-custom-1" onClick={handleSubmit(updateUserSettings)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}