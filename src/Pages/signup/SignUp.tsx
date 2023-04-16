import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import signUpIcon from '../../assets/Images/sign-up.svg';

export const SignUp = () => {
    const signUpPageConfig = { title: 'Signup', message: 'Please select your role!' };
    const navigate = useNavigate();

    /**
     * This function is used to handle navigation for sign-up roles
     * @param value : user, collectionCenter
     */
    const onClickHandler = (value: string) => {
        if (value === 'user') navigate("/signup/user-signup");
        if (value === 'collectionCenter') navigate("/signup/collection-center-signup");
    }

    return (
        <div className='container my-5'>
            <div className="row justify-content-center">
                <div className='col-7'>
                    <div className="card shadow">
                        <div className="text-center py-5">
                            <div>
                                <h3 className="fw-bold mb-3">{signUpPageConfig.title}</h3>
                                <p className="text-dark">{signUpPageConfig.message}</p>
                                <img className="sign-up-icon mx-auto d-block" src={signUpIcon} alt="sign-up icon" />
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <button className="btn btn-dark btn-block p-2 w-100 btn-custom-1" onClick={() => onClickHandler("user")}  > CUSTOMER </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-dark btn-block p-2 w-100 btn-custom-1" onClick={() => onClickHandler("collectionCenter")}  > COLLECTION CENTER </button>
                                </div>
                            </div>
                            <div>
                                <p className="mb-0 mt-4">Already have an Account?
                                    <Link className="text-dark fw-bold login-link" to='/login'> Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}