import { useNavigate } from 'react-router-dom';
import thumbnail from '../../../assets/Images/Collection_center_thumbnail.png';
import { CollectionCenterSummary } from '../../../shared/models/publicModals';

export const CollectionCenterList = (props: any) => {
    const { dataList } = props;
    const navigate = useNavigate();


    return (
        <div className="row my-3">
            {dataList.map((data: CollectionCenterSummary, index: number) => {
                return (
                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 my-3 col-xs-12' key={index}>
                        <div className="card collection-center-summary-card shadow-sm" >
                            <div onClick={() => navigate(`/collectionCenterDetails/${data?.username}`)}>
                                <img src={thumbnail} className="card-img-top" alt="collection_center_thumbnail" />
                                <div className="card-body card-sm flex-column">
                                    <h5 className="card-title">{data.centerName}</h5>
                                    <p className='card-text'>Waste Type : {data.wasteType} <br /> Location : {data.location} </p>
                                </div>
                            </div>
                            <button className="btn btn-dark rounded-0 text-center btn-custom-1"
                                onClick={() => navigate("/pickupRequest", { state: { parameter: data?.username } })}>Request a PickUp</button>
                        </div>
                    </div>
                )
            })
            }
        </div>


    )
}

