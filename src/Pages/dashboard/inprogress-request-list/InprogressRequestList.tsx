import { useNavigate } from 'react-router-dom'
import "./InprogressRequestList.css"
import { formatDateTime } from '../../../config/request-headers';

export const InprogressRequestList = (props: any) => {
    const { requestList } = props;
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="dashboard-header py-3 text-light text-center mb-3">
                    <h5>Inprogress Requests</h5>
                </div>
                {
                    requestList && requestList.length > 0 ?
                        (requestList.map((request: any) => {
                            return (
                                <div className="jumbotron p-4 mb-2 dashboard-card">
                                    <div className="row">
                                        <div className="col-xl-10 col-lg-9 col-md-9 col-sm-12">
                                            <h5>{userRole === 'COLLECTION_CENTER' ? `Customer Name: ${request?.customerName}` : userRole === 'USER' ? `Collection Center: ${request?.collectionCenterName}` : ''}</h5>
                                            <h6>Waste Type: {request?.wasteType}</h6>
                                            <hr className="my-0 mt-3 mb-2" />
                                            <p className="mb-0">Created On: {formatDateTime(request?.createdDate)}</p>
                                        </div>
                                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 text-end d-flex align-items-center">
                                            <button className="btn btn-dark w-100 my-3 btn-custom-1 rounded-0" type='button' onClick={() => navigate(`request/${request?.requestId}`)}>View</button>
                                        </div>
                                    </div>
                                </div>)
                        })
                        ) :
                        (
                            <div className="message alert text-center" role="alert">
                                <p className="alert-heading">No results found!</p>
                            </div>
                        )
                }
            </div>
        </>
    )
}
