import { useEffect, useState } from "react";
import { AuthService } from '../../shared/services/auth.service'
import { useNavigate } from "react-router-dom";
import { ProfileManagementService } from "../../shared/services/profileManagement.service";
import { CollectionCenterProfile } from "./collectionCenterProfile/collectionCenterProfile";
import CustomerProfile from "./customerProfile/customerProfile";
import { CollectionCenterSettingsResponse, ProfileRequest, UserSettingsResponse } from "../../shared/models/profileModel";
import './profile.css';

export const Profile = () => {
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [collectionCenterSettings, setCollectionCenterSettings] = useState<CollectionCenterSettingsResponse>();
  const [userSettings, setUserSettings] = useState<UserSettingsResponse>();

  useEffect(() => {
    if (!AuthService.getLoginStatus() || !userRole || !username) {
      navigate('/login');
    } else {
      const getSettings = async (request: ProfileRequest) => {
        if (userRole && userRole === 'COLLECTION_CENTER') {
          const settings = await ProfileManagementService.getCollectionCenterSettings(request);
          if (settings) {
            setCollectionCenterSettings(settings);
          }
        } else if (userRole && userRole === 'USER') {
          const settings = await ProfileManagementService.getUserSettings(request);
          if (settings) {
            setUserSettings(settings);
          }
        }
      }
      const profileRequest = { username, role: userRole };
      getSettings(profileRequest);
    }
  }, [])

  return (
    <div className="container mt-5">
      {
        userRole === 'COLLECTION_CENTER' && collectionCenterSettings ? <CollectionCenterProfile profileSettings={collectionCenterSettings} />
          : userRole === 'USER' && userSettings ? <CustomerProfile profileSettings={userSettings} /> : <></>
      }
    </div>
  );
};