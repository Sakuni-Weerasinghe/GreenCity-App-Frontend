import { useNavigate } from 'react-router-dom';
import { CollectionCenterData } from '../../../types/type';

const CollectionCenterList = (props: any) => {
    let navigate = useNavigate();

    const onClickRequest = () => {
        navigate("/collectionRequest/collectionRequest_requirement");
    }
    return (
        <div className="row row-cols-1 row-cols-md-4 g-4 p-5 pt-2">
            {props.collectionList.map((center_data: CollectionCenterData) => {
                const image = `"${center_data.image}"`;
                return (
                    <div className="col">
                        <div className="card shadow ">
                            <div className="card">
                                <img src={image} className="card-img-top" alt="..." />
                                <div className="card-body card-sm flex-column">
                                    <h5 className="card-title">{center_data.name}</h5>
                                    <p className='card-text'>Category : {center_data.waste_type} <br /> Location : {center_data.location} </p>
                                    <button className='btn btn-sm  mt-2 ' id="request_btn" onClick={onClickRequest}>Request PickUp</button>
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
