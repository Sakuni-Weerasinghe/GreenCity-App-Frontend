import { useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import "./login.css"
import { LoginRequest } from '../../shared/models/authModel';
import { AuthService } from '../../shared/services/auth.service';

export const Login = (props: any) => {
  // page configurations
  const loginPageConfig = { title: 'Login', message: 'Please enter your username and password!' };

  // login form validations
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!")
  });
  // useForm configurations
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({ resolver: yupResolver(validationSchema) });
  // login form error handling
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  let navigate: NavigateFunction = useNavigate();

  /**
   * This function is used to authenticate users with username and password and
   * store authenticationToken, username, userRole in localStorage
   * @param data : LoginRequest
   */
  const login = async (data: LoginRequest) => {
    setLoading(true);
    const response = await AuthService.login(data);
    if (response) {
      const { authenticationToken, username, userRole } = response;
      localStorage.setItem("authenticationToken", authenticationToken);
      localStorage.setItem("username", username);
      localStorage.setItem("userRole", userRole);
      props.loginStatusHandler(true);
      navigate("/");
    } else {
      const errorMessage = 'Invalid Username or Password';
      setErrorMessage(errorMessage);
      props.loginStatusHandler(false);
    }
    setLoading(false);
  }

  return (
    <div className='container my-5'>
      <div className="row justify-content-center">
        <div className='col-6'>
          <div className="card shadow">
            <div className="card-body p-5 text-center">
              <h3 className="fw-bold mb-3">{loginPageConfig.title}</h3>
              <p className="text-dark-50 mb-5">{loginPageConfig.message}</p>
              {/* error message */}
              {errorMessage && (
                <div className="form-outline">
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                </div>
              )}
              {/* login form */}
              <form id='loginForm' onSubmit={handleSubmit(login)}>
                <div className="form-outline form-white mb-4">
                  <input type="text" {...register("username")} className="form-control" placeholder="Username" />
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" {...register("password")} className="form-control" placeholder="Password" />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-dark my-4 px-5 btn-custom-1" disabled={loading}>
                    Login {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                  </button>
                </div>

              </form>
              <div>
                <p className="mb-0 mt-5">Don't have an account?
                  <Link className="text-dark fw-bold sign-up-link" to='/signup'> Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

