import { useState } from "react"
import "./header.css"
import * as authService from "../../services/auth.service"
import * as profileManagementService from "../../services/profileManagement.service"
import { Link } from "react-router-dom"

const style = {
    brand_name: {
        color: "#778c17",
        fontSize: "24px",
    },
}

const Header = (props: any) => {
    const currentUser = profileManagementService.getCurrentUser();
    const { loginStatus } = props;

    const logOut = () => {
        authService.logout();
        props.loginStatusHandler(false);
    };

    const profile = () => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const userDataObj = JSON.parse(userData);
            const userName = userDataObj.username;
            const userRole = userDataObj.userRole;
            if (userRole === "USER") {
                profileManagementService.userProfileDetails(userName, userRole)
            } else if (userRole === "COLLECTION_CENTER") {
                profileManagementService.collectionCenterProfileDetails(userName, userRole)
            }
        }
    }

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-md fixed-top sticky-top shadow py-0">
                <div className="container-fluid">
                    <Link className="navbar-brand px-2" to='/'><span style={style.brand_name}>GREEN</span>CITY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                        <ul className="navbar-nav text-uppercase text-center">
                            <li className="nav-item mt-2">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item mt-2">
                                {loginStatus && currentUser.userRole === "USER" ? (<Link className="nav-link" to='customer/request'>Request</Link>)
                                    : loginStatus && currentUser.userRole === "COLLECTION_CENTER" ? (<Link className="nav-link" to='collectionRequest/requestDashboard'>Collection Request</Link>)
                                        : <></>}
                            </li>
                            <li className="nav-item mt-2">
                                {loginStatus ? (<Link className="nav-link" to={{ pathname: "/userProfile/" + currentUser.username }} onClick={() => profile()}>{currentUser.username}</Link>)
                                    : <></>}
                            </li>
                            <li className="nav-item mt-2">
                                {loginStatus ? (<Link className="nav-link" to='/login' onClick={() => logOut()}>Logout</Link>)
                                    : (<Link className="nav-link" to='/login'>Login</Link>)}
                            </li>
                            <li className="nav-item mt-2">
                                {!loginStatus ? (<Link className="nav-link" to='/signUp'>Sign Up</Link>)
                                    : <></>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;
