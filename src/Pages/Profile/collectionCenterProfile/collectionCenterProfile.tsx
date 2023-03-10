import { useNavigate } from 'react-router-dom';
import thumbnail from "../../../assets/Images/collection_center_profile.svg"
import "./CenterProfile.css"

export const CollectionCenterProfile = (props: any) => {
    const { profileSettings } = props;
    const navigate = useNavigate();

    /**
     * This function is used to handle onclick events of Update Settings & Update Details buttons
     * @param page : settings, details
     */
    const onClickHandler = (page: string) => {
        const path = `/profile/${profileSettings.username}/${page}`;
        navigate(path);
    }

    return (
        <>
            <div className="row">
                {/* Profile picture */}
                <div className="profile-picture col-xl-3 col-lg-4 col-md-5 col-sm-12 my-auto">
                    <img className="rounded-circle" src={thumbnail} alt="profile_picture" />
                </div>
                {/* Collection center settings */}
                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 pt-3">
                    <div className='row'>
                        <div className='col text-start'><h3 className='m-0'>{profileSettings.centerName}</h3></div>
                        <div className='col text-end'>
                            <button className='btn btn-dark px-4 btn-custom-1' onClick={() => onClickHandler('settings')}>Update Settings</button>
                        </div>
                    </div>
                    <hr />
                    <div className="text-left profile-settings">
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4 text-secondary"><h5>Username : </h5></div>
                            <div className="col">
                                <h5>{profileSettings.username}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4 text-secondary"><h5>Email :</h5></div>
                            <div className="col">
                                <h5>{profileSettings.email}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4 text-secondary"><h5>Mobile Number :</h5></div>
                            <div className="col">
                                <h5>{profileSettings.contactNumber}</h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4 text-secondary"> <h5>Address :</h5></div>
                            <div className="col">
                                <h5>
                                    {`${profileSettings.addressLine1}, 
                                    ${profileSettings.addressLine2}, 
                                    ${profileSettings.addressLine3}`}
                                </h5>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col col-xl-3 col-lg-3 col-sm-4 text-secondary"><h5>Location :</h5></div>
                            <div className="col">
                                <h5>{profileSettings.location}</h5>
                            </div>
                        </div>
                        <hr />
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
                            <span>Details</span>
                            <button className='btn float-end' onClick={() => onClickHandler('details')}>Update Details</button>
                        </div>
                    </div>

                )}
        </>
    )
}

