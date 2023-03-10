import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import center from "../../../assets/Images/center1.jpg"
import CollectionCenterDeleteModal from '../../../Modal/CollectionCenterDeleteModal';
import { getCurrentUser } from '../../../shared/services/profileManagement.service';
import "./CenterProfile.css"

export const CollectionCenterProfile = (props: any) => {
    const { profileSettings } = props;
    const [showCollectionCenterDeleteModal, setShowCollectionCenterDeleteModal] = useState(false)
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    return (
        <>
            <div className="row">
                <div id="profile_picture_position" className="col-xl-3 col-lg-4 col-md-5 col-sm-12 my-auto">
                    <img id="profile_picture" className="rounded-circle"
                        src={center} alt="profile_picture" />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 pt-3">
                    <h3>{profileSettings.centerName}</h3>

                    <hr />
                    <div className="text-secondary text-left collectioncenter_details">
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Username : </h5>
                            </div>
                            <div className="col data">
                                <h5>{profileSettings.username}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Email :</h5>
                            </div>
                            <div className="col data">
                                <h5>{profileSettings.email}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Mobile Number :</h5>
                            </div>
                            <div className="col data">
                                <h5>{profileSettings.contactNumber}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Address :</h5>
                            </div>
                            <div className="col data">
                                <h5>{profileSettings.addressLine1 + ", "
                                    + profileSettings.addressLine2 + ", "
                                    + profileSettings.addressLine3}
                                </h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Location :</h5>
                            </div>
                            <div className="col data">
                                <h5>{profileSettings.location}</h5>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className='update_btn pt-3'>
                        <button className='btn' onClick={() => navigate("/userProfile/" + currentUser.username + "/collectionCenter_update")}>Edit Profile</button>
                        <button className="btn btn-danger btn-block px-3 mb-3 mt-1" onClick={() => { setShowCollectionCenterDeleteModal(true) }}> Delete </button>
                        <CollectionCenterDeleteModal show={showCollectionCenterDeleteModal} onHide={() => setShowCollectionCenterDeleteModal(false)} />
                    </div>
                </div>
            </div>
            <hr className="mt-5"></hr>
            {profileSettings.moreDetailStatus ?
                (
                    <div className="col-xl-9 col-lg-8 col-md-7  col-sm-12 pt-3">
                        <div className='pb-2'>
                            <h4>More About Us .....</h4>
                        </div>
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Waste Type</h5>
                            </div>
                            <div className="col">
                                <h5>{profileSettings.wastetype}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Payment for 1kg </h5>
                            </div>
                            <div className="col">
                                <h5>Rs. {profileSettings.payment}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Working days </h5>
                            </div>
                            <div className="col">
                                <h5> </h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4">
                                <h5>Description</h5>
                            </div>
                            <div className="col">
                                <h5>{profileSettings.description}</h5>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="col-xl-9 col-lg-8 col-md-7  col-sm-12 pt-3">
                        <div className='pb-2'>
                            <h4>More About Us .....</h4>
                            <p>Add details to show your collection center in home page</p>
                        </div>
                        <div className='update_btn pt-3'>
                            <button className='btn me-4' onClick={() => navigate("/userProfile/" + currentUser.username + "/collectionCenter_addDetail")}>Add more details</button>
                        </div>
                    </div>

                )}
        </>
    )
}

