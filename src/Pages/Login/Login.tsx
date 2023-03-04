import { useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { LoginForm } from '../../types/type'
import { login } from '../../shared/services/auth.service';
import "./login.css"

const Login = (props: any) => {
  // page configurations
  const loginPageConfig = { title: 'Login', message: 'Please enter your username and password!' };

  // login form validations
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: yupResolver(validationSchema) });
  // login form error handling
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  let navigate: NavigateFunction = useNavigate();
  // show/hide sign-up modal
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  /**
   * This function is used to handle login form
   * @param data : username, password
   */
  const onSubmit = (data: LoginForm) => {
    const { username, password } = data;
    setErrorMessage('');
    setLoading(true);
    login(username, password)
      .then(response => {
        if (response) {
          props.loginStatusHandler(true);
          navigate("/");
        } else {
          props.loginStatusHandler(false);
        }
      },
        (error) => {
          if (error.response.data) {
            console.log();
            const statusCode = error.response.data.status;
            const errorMessage = statusCode === 403 ? 'Invalid Username or Password' : '';
            setErrorMessage(errorMessage);
          }
          setLoading(false);
          props.loginStatusHandler(false);
        }
      );
  };

  return (
    <div className='container my-5'>
      <div className="row justify-content-center">
        <div className='col-6'>
          <div className="card shadow">
            <div className="card-body p-5 text-center">
              <h3 className="fw-bold mb-3">{loginPageConfig.title}</h3>
              <p className="text-dark-50 mb-5">{loginPageConfig.message}</p>
              {/* login form */}
              <form id='loginForm' onSubmit={handleSubmit(onSubmit)}>
                {/* error message */}
                {errorMessage && (
                  <div className="form-outline">
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  </div>
                )}
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
                  <a className="text-dark fw-bold sign-up-link" onClick={() => { setShowSignUpModal(true) }}> Sign Up</a>
                </p>
                <SignupModal show={showSignUpModal} onHide={() => setShowSignUpModal(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
