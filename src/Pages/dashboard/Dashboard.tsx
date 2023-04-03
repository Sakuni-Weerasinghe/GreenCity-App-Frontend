import "./Dashboard.css"
import { useState } from 'react'
import dashboard_banner from "../../assets/Images/dashboard_banner.svg"
import { InprogressRequestList } from "./inprogress-request-list/InprogressRequestList";
import { CanceledRequestList } from "./canceled-request-list/CanceledRequestList";
import { ActiveRequestList } from "./active-request-list/ActiveRequestList";
import { CompletedRequestList } from "./completed-request-list/CompletedRequestList";

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('inprogress');

    return (
        <>
            {/* dashboard banner */}
            <div id="dashboard-banner ">
                <img src={dashboard_banner} alt='dashboard_banner'></img>
            </div>
            <div className="dashboard-tab-panel p-3">
                <div className="container">
                    <div className="row">
                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'inprogress' ? 'active' : ''}`}
                            onClick={() => setActiveTab('inprogress')}>Inprogress</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'active' ? 'active' : ''}`}
                            onClick={() => setActiveTab('active')}>Active</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'completed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('completed')}>Completed</div>

                        <div className={`col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center ${activeTab === 'canceled' ? 'active' : ''}`}
                            onClick={() => setActiveTab('canceled')}>Canceled</div>
                    </div>
                </div>
            </div>
            {/* Active tab */}
            {
                activeTab === 'inprogress' ? <InprogressRequestList />
                    : activeTab === 'active' ? <ActiveRequestList />
                        : activeTab === 'completed' ? <CompletedRequestList />
                            : activeTab === 'canceled' ? <CanceledRequestList /> : <></>
            }
        </>
    )
}