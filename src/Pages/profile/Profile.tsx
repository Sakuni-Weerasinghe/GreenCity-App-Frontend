import { useEffect, useState } from "react";
import { AuthService } from '../../shared/services/auth.service'
import { useNavigate } from "react-router-dom";
import { ProfileService } from "../../shared/services/profile.service";
import { CollectionCenterProfile } from "./collection-center-profile/CollectionCenterProfile";
import { UserProfile } from "./user-profile/UserProfile";
import {
  CollectionCenterDetailsResponse,
  CollectionCenterDetailsUpdateRequest,
  CollectionCenterSettingsResponse,
  CollectionCenterSettingsUpdateRequest, ProfileRequest,
  UserSettingsResponse,
  UserSettingsUpdateRequest
} from "../../shared/models/profileModel";
import './Profile.css';

export const Profile = () => {
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [collectionCenterSettings, setCollectionCenterSettings] = useState<CollectionCenterSettingsResponse>();
  const [collectionCenterDetails, setCollectionCenterDetails] = useState<CollectionCenterDetailsResponse>();
  const [userSettings, setUserSettings] = useState<UserSettingsResponse>();

  useEffect(() => {
    if (!AuthService.getLoginStatus() || !userRole || !username) {
      navigate('/login');
    } else {
      /**
       * This function is used to get Collection center or User profile data according the role
       * @param request : ProfileRequest
       */
      const getProfileData = async (request: ProfileRequest) => {
        if (userRole && userRole === 'COLLECTION_CENTER') {
          const settings = await ProfileService.getCollectionCenterSettings(request);
          const details = await ProfileService.getCollectionCenterDetails(request);

          settings && setCollectionCenterSettings(settings);
          details && setCollectionCenterDetails(details);
        } else if (userRole && userRole === 'USER') {
          const settings = await ProfileService.getUserSettings(request);
          settings && setUserSettings(settings);
        }
      }
      const profileRequest = { username, role: userRole };
      getProfileData(profileRequest);
    }
  }, [navigate, userRole, username])

  /**
   * This function is used to update collection center settings
   * @param updatedSettings : CollectionCenterSettingsUpdateRequest
   */
  const updateCollectionCenterSettings = (updatedSettings: CollectionCenterSettingsUpdateRequest) => {
    if (updatedSettings && collectionCenterSettings) {
      setCollectionCenterSettings({ ...collectionCenterSettings, ...updatedSettings })
    }
  }

  /**
   * This function is used to update collection center details
   * @param updatedSettings : CollectionCenterDetailsUpdateRequest
   */
  const updateCollectionCenterDetails = (updatedDetails: CollectionCenterDetailsUpdateRequest) => {
    if (updatedDetails && collectionCenterDetails) {
      setCollectionCenterDetails({ ...collectionCenterDetails, ...updatedDetails })
    }
  }

  /**
   * This function is used to update collection center settings
   * @param updatedSettings : CollectionCenterSettingsUpdateRequest
   */
  const updateUserSettings = (updatedSettings: UserSettingsUpdateRequest) => {
    if (updatedSettings && userSettings) {
      setUserSettings({ ...userSettings, ...updatedSettings })
    }
  }

  return (
    <div className="container mt-5">
      {
        userRole === 'COLLECTION_CENTER' && collectionCenterSettings ?
          <CollectionCenterProfile profileSettings={collectionCenterSettings} profileDetails={collectionCenterDetails}
            settingsUpdateHandler={updateCollectionCenterSettings} detailsUpdateHandler={updateCollectionCenterDetails} />
          : userRole === 'USER' && userSettings ? <UserProfile profileSettings={userSettings} settingsUpdateHandler={updateUserSettings} /> : <></>
      }
    </div>
  );
};