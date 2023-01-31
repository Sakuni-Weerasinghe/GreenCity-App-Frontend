import { useNavigate } from 'react-router-dom';
import { CollectionCenterData } from '../../../types/type';

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
        <div className="row row-cols-1 row-cols-md-4 g-4 p-5 pt-2">
            {collectionList.map((center_data: CollectionCenterData) => {
                const image = `"${center_data.image}"`;
                return (
                    <div className="col" >
                        <div className="card shadow ">
                            <div className="card">
                                <div onClick={() => navigate("/collectionCenter", { state: { parameter: center_data.username } })}>
                                    <img src={image} className="card-img-top" alt="..." />
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
