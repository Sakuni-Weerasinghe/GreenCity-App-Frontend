import "./Dashboard.css"
import { useState } from 'react'
import dashboard_banner from "../../assets/Images/dashboard_banner.svg"
import CustomerInprogressRequest from '../Request/inprogress_request/inprogress_request';
import CustomerCancelRequest from '../Request/cancel_request/cancel_request';
import CustomerActiveRequest from '../Request/active_request/active_request';
import CustomerCompleteRequest from '../Request/complete_request/complete_request';

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

                        <div className="col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center"
                            onClick={() => setActiveTab('active')}>Active</div>

                        <div className="col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center"
                            onClick={() => setActiveTab('completed')}>Completed</div>

                        <div className="col-md-3 col-sm-6 my-2 px-0 py-3 tab bg-dark text-light d-flex align-items-center justify-content-center"
                            onClick={() => setActiveTab('canceled')}>Canceled</div>
                    </div>
                </div>
            </div>
            {/* Active tab */}
            {
                activeTab === 'inprogress' ? <CustomerInprogressRequest />
                    : activeTab === 'active' ? <CustomerActiveRequest />
                        : activeTab === 'completed' ? <CustomerCompleteRequest />
                            : activeTab === 'canceled' ? <CustomerCancelRequest /> : <></>
            }
        </>
    )
}