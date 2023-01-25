import { useState } from "react"
import "./header.css"
import * as authService from "../../services/auth.service"
import SignupModal from "../../Modal/SignupModal"
import { Link } from "react-router-dom"

const style = {
    container: {
        color: "#778c17",
        fontSize: "24px",
    },
}

const Header = (props: any) => {

    const { loginStatus } = props;
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const logOut = () => {
        authService.logout();
        props.loginStatusHandler(false);
    };

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-md fixed-top sticky-top shadow py-0">
                <div className="container-fluid">
                    <Link className="navbar-brand px-2" to='/'><span style={style.container}>GREEN</span>CITY</Link>
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
                                <Link className="nav-link" to='/'>About</Link>
                            </li>
                            <li className="nav-item mt-2">
                                {loginStatus ? (<Link className="nav-link" to='/login' onClick={() => logOut()}>Logout</Link>)
                                    : (<Link className="nav-link" to='/login'>Login</Link>)}
                            </li>
                            <li className="nav-item mt-2">
                                {!loginStatus ? (<a className="nav-link sign-up" onClick={() => setShowSignUpModal(true)}>Sign up</a>)
                                    : <></>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <SignupModal show={showSignUpModal} onHide={() => setShowSignUpModal(false)} />
        </>
    )
}

export default Header;
