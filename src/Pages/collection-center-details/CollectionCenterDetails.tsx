import thumbnail from "../../assets/Images/collection_center_details_thumbnail.png";
import "./CollectionCenterDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { PublicService } from "../../shared/services/public.service";
import { CollectionCenterDetailsResponse } from "../../shared/models/publicModals";
import { useEffect, useState } from "react";

export const CollectionCenterDetails = () => {
  const { username } = useParams();
  const [collectionCenterDetails, setCollectionCenterDetails] = useState<CollectionCenterDetailsResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * This function is used to get collection center details using collection center username
     * @param collectionCenterUsername : string
     */
    const getCollectionCenterDetails = async (collectionCenterUsername: string) => {
      try {
        const collectionCenterDetailsResponse = await PublicService.getCollectionCenterDetails(collectionCenterUsername);
        if (collectionCenterDetailsResponse) {
          setCollectionCenterDetails(collectionCenterDetailsResponse);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (username) {
      getCollectionCenterDetails(username);
    }
  }, [username])

  return (
    <>
      <div className="container my-5 collection-center-details">

        <div className="row mx-auto">
          <h3>{collectionCenterDetails?.centerName}</h3>
          <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-12 col-sm-12 mt-2 mb-4">
            <img src={thumbnail} className="w-100 h-500 rounded" alt='collection-center-details-thumbnail' />
          </div>
          <div className="col-xxl-7 col-xl-6 col-lg-5 col-md-12 col-sm-12 p-0 my-auto mt-2 mb-4 collection-center-detail-list">
            <ul className="list-group text-center">
              <li className="list-group-item text-light p-1 title">Waste Type</li>
              <li className="list-group-item p-2 data text-truncate">{collectionCenterDetails?.wasteType} - Rs.{collectionCenterDetails?.payment} for 1kg</li>
              <li className="list-group-item text-light p-1 title">Address</li>
              <li className="list-group-item p-2 data text-truncate">{`${collectionCenterDetails?.addressLine1}, ${collectionCenterDetails?.addressLine2}, ${collectionCenterDetails?.addressLine3}`}</li>
              <li className="list-group-item text-light p-1 title">Location</li>
              <li className="list-group-item p-2 data text-truncate">{collectionCenterDetails?.location}</li>
              <li className="list-group-item text-light p-1 title">Contact Number</li>
              <li className="list-group-item p-2 data text-truncate">{collectionCenterDetails?.contactNumber}</li>
              <li className="list-group-item text-light p-1 title">Working days</li>
              <li className="list-group-item p-2 data text-truncate">{collectionCenterDetails?.workingDays?.toString()}</li>
            </ul>
          </div>
        </div>

        <div className="row mt-3 mx-0 description">
          <h4 className="col py-3 text-center">Description</h4>
        </div>
        <p className="text-justify p-3 py-3">{collectionCenterDetails?.description}</p>
        <div className="d-grid gap-2 mx-auto mt-4">
          <button className="btn btn-dark px-3 mb-3 mt-1 btn-custom-1 py-3" type="button"
            onClick={() => navigate("/pickupRequest", { state: { parameter: username } })}>Request a PickUp</button>
        </div>
      </div>
    </>
  );

};
