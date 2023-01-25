import { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { LoginForm } from '../../types/type'
import { login } from '../../services/auth.service';
import "./login.css"
import SignupModal from "../../Modal/SignupModal"
import signupImg from "../../assets/Images/signupImg.jpg"

const style = {
  card: {
    background: "hsla(0, 0%, 100%, 0.55)",
    backdropFilter: "blur(30px)",
  },
}


const Login = (props: any) => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [showSignUpModal, setShowSignUpModal] = useState(false)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = (data: LoginForm) => {
    const { username, password } = data;
    setMessage("");
    setLoading(true);
    login(username, password).then(
      (response) => {
        if (response) {
          props.loginStatusHandler(true);
          navigate("/profile");
        } else {
          props.loginStatusHandler(false);
        }
      },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        setMessage(resMessage);
        props.loginStatusHandler(false);
      }
    );
  };

  return (
    <>
      <section className="text-center text-lg-start my-5">
        <div className='container py-3'>
          <div className="row g-0 align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="card cascading-right" style={style.card}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h3 className="fw-bold mb-3">Login</h3>
                  <p className="text-dark-50 mb-5">Please enter your username and password!</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4">
                      <input type="text" {...register("username")} className="form-control" placeholder="Username" />
                      <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="password" {...register("password")} className="form-control" placeholder="Password" />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="text-right">
                      <button type="submit" className="btn btn-dark btn-block my-4 px-5" disabled={loading}>
                        Login {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                      </button>
                    </div>
                    {message && (
                      <div className="form-outline">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                  </form>
                  <div>
                    <p className="mb-0 mt-5">Don't have an account? <a className="text-dark-50 fw-bold" onClick={() => { setShowSignUpModal(true) }}>Sign Up</a></p>
                    <SignupModal show={showSignUpModal} onHide={() => setShowSignUpModal(false)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mb-5 mb-lg-0">
              <img src={signupImg} className="w-100 h-500 rounded-4 shadow-4" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
