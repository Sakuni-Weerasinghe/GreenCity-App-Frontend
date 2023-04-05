import "./Dashboard.css"
import { useEffect, useState } from 'react'
import dashboard_banner from "../../assets/Images/dashboard_banner.svg"
import { InprogressRequestList } from "./inprogress-request-list/InprogressRequestList";
import { CanceledRequestList } from "./canceled-request-list/CanceledRequestList";
import { ActiveRequestList } from "./active-request-list/ActiveRequestList";
import { CompletedRequestList } from "./completed-request-list/CompletedRequestList";
import { PickupRequestSummaryListRequest, PickupRequestSummaryListResponse } from "../../shared/models/pickupRequestModel";
import { RequestService } from "../../shared/services/request.service";

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('INPROGRESS');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    const [summaryList, setSummaryList] = useState<PickupRequestSummaryListResponse[]>();

    useEffect(() => {
        /**
         * This function is used to get pickup request summary list using ACTIVE tab
         * @param collectionCenterUsername : string
         */
        const getPickupRequestSummaryList = async (request: PickupRequestSummaryListRequest) => {
            try {
                const response = await RequestService.getPickupRequestSummaryList(request);
                if (response && Array.isArray(response.response)) {
                    if (response.status) {
                        setSummaryList(response.response);
                    } else {
                        setSummaryList([]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (username && userRole && activeTab) {
            const request: PickupRequestSummaryListRequest = { username, userRole, listType: activeTab };
            getPickupRequestSummaryList(request);
        }
    }, [activeTab, userRole, username])

    return (
        <>
            {/* dashboard banner */}
            <div id="dashboard-banner ">
                <img src={dashboard_banner} alt='dashboard_banner'></img>
            </div>
            <div className="dashboard-tab-panel p-3">
                <div className="container">
                    <div className="row">
                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'INPROGRESS' ? 'active' : ''}`}
                            onClick={() => setActiveTab('INPROGRESS')}>Inprogress</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'ACTIVE' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ACTIVE')}>Active</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'COMPLETED' ? 'active' : ''}`}
                            onClick={() => setActiveTab('COMPLETED')}>Completed</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'CANCELED' ? 'active' : ''}`}
                            onClick={() => setActiveTab('CANCELED')}>Canceled</div>
                    </div>
                </div>
            </div>
            {/* Active tab */}
            {
                activeTab === 'INPROGRESS' ? <InprogressRequestList requestList={summaryList} />
                    : activeTab === 'ACTIVE' ? <ActiveRequestList requestList={summaryList} />
                        : activeTab === 'COMPLETED' ? <CompletedRequestList requestList={summaryList} />
                            : activeTab === 'CANCELED' ? <CanceledRequestList requestList={summaryList} /> : <></>
            }
        </>
    )
}