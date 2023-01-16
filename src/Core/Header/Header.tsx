import { useState, useEffect } from "react"
import "./header.css"

import * as authService from "../../services/auth.service"
import { UserSignupForm } from "../../types/type"
import { CenterSignupForm } from "../../types/type"

import SignupModal from "../../Modal/SignupModal"
import { UserInfo } from "../../shared/models/authModel"

const style = {
    container: {
        color: "#778c17",
        fontSize: "24px",
    },
}

const Header = () => {
    //const [currentUser, setCurrentUser] = useState<UserSignupForm | CenterSignupForm | undefined>(undefined);
    const [showSignupModal, setshowSignupModal] = useState(false);

    const [loginStatus, setLoginStatus] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(() => {
        setLoginStatus(authService.getLoginStatus());
        console.log(loginStatus, "aaaaaaaaaaaaaaaaaaa");
        if (loginStatus) {
            setUserInfo(authService.getCurrentUser());
        } else {
            setUserInfo(undefined);
        }
    }, [loginStatus, userInfo]);

    const logOut = () => {
        authService.logout();
    };

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-md fixed-top sticky-top shadow-lg py-0">
                <div className="container-fluid">
                    <a className="navbar-brand px-2" href='/'><span style={style.container}>GREEN</span>CITY</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                        <ul className="navbar-nav text-uppercase text-center">
                            <li className="nav-item mt-2">
                                <a className="nav-link" href='/'>HOME</a>
                            </li>
                            {/* <li className="nav-item mt-2">
                                <a className="nav-link" href='/login'>LOGIN</a>
                            </li>
                            <li className="nav-item mt-2">
                                <a className="nav-link" onClick={() => { setshowSignupModal(true) }}>SIGNUP</a>
                                <SignupModal show={showSignupModal} onHide={() => setshowSignupModal(false)} />
                            </li> */}


                            {/* {loginStatus ?
                                <>
                                    <span>ffffffffffffffffffffffffffffffff</span>
                                </>
                                :
                                <>
                                    <span>sssssssssssssssssssssssssssss</span>
                                </>
                            } */}



                            {/* { loginStatus ? (

                            ):
                            <>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" href='/login'>LOGIN</a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" onClick={() => {
                                        setshowSignupModal(true); console.log(showSignupModal);
                                    }}>SIGNUP</a>
                                </li>
                            </>
                            } */}



                        </ul>
                    </div>
                </div>
            </nav>
            <SignupModal show={showSignupModal} onHide={() => setshowSignupModal(false)} />
        </>
    )
}

export default Header
