import thumbnail from "../../../assets/Images/customer_profile.svg";

import "./UserProfile.css"
import { UserProfileSettings } from '../../profile/modals/user-profile-settings/UserProfileSettings';
import { useState } from 'react';

export const UserProfile = (props: any) => {
  const { profileSettings } = props;
  const [showSettingsModal, setShowSettingsModal] = useState(false);


  /**
  * This function is used to hide opened modals
  */
  const hideModals = () => {
    setShowSettingsModal(false);
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
            <div className='col text-start'><h3 className='m-0'>{`${profileSettings.firstName} ${profileSettings.lastName}`}</h3></div>
            <div className='col text-end'>
              <button className='btn btn-dark px-4 btn-custom-1' onClick={() => setShowSettingsModal(true)}>Update Settings</button>
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
          </div>
        </div>
      </div>
      {/* Settings modal */}
      <UserProfileSettings isShowModal={showSettingsModal} hideModal={hideModals} settings={profileSettings} settingsUpdateHandler={props.settingsUpdateHandler} />
    </>
  )
}

