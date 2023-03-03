import { useNavigate } from "react-router-dom";

export const SignUp = () => {

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
        <div>
            <button onClick={() => onClickHandler("user")} className="btn btn-dark btn-block px-5 mb-3" > USER </button>
            <button onClick={() => onClickHandler("collectionCenter")} className="btn btn-dark btn-block px-5" > COLLECTION CENTER </button>
        </div>
    )
}