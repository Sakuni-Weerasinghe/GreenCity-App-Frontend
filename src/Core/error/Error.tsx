import './Error.css';
import notFound from '../../assets/Images/404.png';
import { Link } from 'react-router-dom';

export const Error = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 mx-auto'>
                    <div className="d-flex justify-content-center align-items-center">
                        <img className='w-75' src={notFound} alt="not_found" />
                    </div>
                </div>
                <div className="alert alert-warning text-center" role="alert">
                    Sorry, You don't have permission to access this page!
                    <Link to="/" className="alert-link mx-1 text text-decoration-none">Click Here</Link>
                    to back Home page
                </div>
            </div>
        </div >
    )
}