import { useNavigate } from 'react-router-dom';
import { CollectionCenterData } from '../../../types/type';
import thumbnail from '../../../assets/Images/Collection_center_thumbnail.png'

const CollectionCenterList = (props: any) => {
    const { loginStatus, collectionList } = props;
    let navigate = useNavigate();

    const onClickRequest = (center_data: CollectionCenterData) => {
        if (loginStatus) {
            navigate("/collectionRequest/collectionRequest_requirement",
                { state: { parameter: center_data.username } })
        } else {
            alert("Please Login to your profile");
            navigate("/login");
        }
    }

    return (
        <div className="row">
            {collectionList.map((center_data: CollectionCenterData, index: number) => {
                return (
                    <div className="col-3 my-3" key={index}>
                        <div className="card shadow ">
                            <div className="card">
                                <div onClick={() => navigate("/collectionCenter", { state: { parameter: center_data.username } })}>
                                    <img src={thumbnail} className="card-img-top" alt="..." />
                                    <div className="card-body card-sm flex-column">
                                        <h5 className="card-title">{center_data.centerName}</h5>
                                        <p className='card-text'>Category : {center_data.wastetype} <br /> Location : {center_data.location} </p>
                                    </div>
                                </div>
                                <div className="card-body card-sm flex-column" onClick={() => onClickRequest(center_data)}>
                                    <button className='btn btn-sm  mt-2 ' id="request_btn" >Request PickUp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>


    )
}

export default CollectionCenterList
