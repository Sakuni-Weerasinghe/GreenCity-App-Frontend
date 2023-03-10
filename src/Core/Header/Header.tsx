import "./header.css"
import { AuthService } from "../../shared/services/auth.service"
import * as profileManagementService from "../../shared/services/profileManagement.service"
import { Link } from "react-router-dom"

const Header = (props: any) => {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    const { loginStatus } = props;

    const logOut = () => {
        AuthService.logout();
        props.loginStatusHandler(false);
    };

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-md fixed-top sticky-top shadow py-0">
                <div className="container-fluid">
                    <Link className="navbar-brand px-2" to='/'><span>GREEN</span>CITY</Link>
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
                                {loginStatus && userRole === "USER" ? (<Link className="nav-link" to='customer/request'>Request</Link>)
                                    : loginStatus && userRole === "COLLECTION_CENTER" ? (<Link className="nav-link" to='collectionRequest/requestDashboard'>Collection Request</Link>)
                                        : <></>}
                            </li>
                            <li className="nav-item mt-2">
                                {loginStatus ? (<Link className="nav-link" to={{ pathname: "/profile/" + username }}>{username}</Link>)
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
