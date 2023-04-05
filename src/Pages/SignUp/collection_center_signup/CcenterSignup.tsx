import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { CollectionCenterRegisterRequest } from '../../../shared/models/authModel'
import { AuthService } from '../../../shared/services/auth.service'

export const CollectionCenterSignUp = () => {
  const collectionCenterSignUpConfig = { title: 'SIGN UP - COLLECTION CENTER' }
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  // Collection center register form validations
  const validationSchema = Yup.object().shape({
    centerName: Yup.string().required("Center Name is required"),
    contactNumber: Yup.string().required("Contact Number is required")
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .matches(/^0\d{9}$/, "Invalid mobile number format"),
    email: Yup.string().email("This is not a valid email.").required("This field is required!"),
    addressLine1: Yup.string().required("Address is Required"),
    addressLine2: Yup.string().required("Address is Required"),
    addressLine3: Yup.string().required("Address is Required"),
    username: Yup.string().required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    location: Yup.string().required("Location is Required"),
    password: Yup.string().required('Password is required')
      .min(8, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CollectionCenterRegisterRequest>({ resolver: yupResolver(validationSchema) });

  /**
   * This function is used for collection center registration
   * @param data : CollectionCenterRegisterRequest
   */
  const registerCollectionCenter = async (data: CollectionCenterRegisterRequest) => {
    const response = await AuthService.collectionCenterSignUp(data);
    if (response) {
      if (response.status) {
        reset();
        navigate("/login")
      } else {
        setMessage(response.response);
      }
    }
  };

  return (
    <div className='container py-5'>
      <div className="row justify-content-center">
        <div className="col-7 mb-5">
          <div className="card shadow">
            <div className="card-body p-5 text-center">
              <h3 className="fw-bold mb-5">{collectionCenterSignUpConfig.title}</h3>
              {/* error message */}
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              {/* collection center register form */}
              <form onSubmit={handleSubmit(registerCollectionCenter)}>
                <div className="form-outline mb-4">
                  <input type="text"{...register("centerName")} className={`form-control ${errors.centerName ? 'is-invalid' : ''}`} placeholder="Center name" />
                  <div className="invalid-feedback">{errors.centerName?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text"{...register("contactNumber")} className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`} placeholder="Contact Number" />
                  <div className="invalid-feedback">{errors.contactNumber?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text"{...register("email")} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text"{...register("addressLine1")} className={`form-control ${errors.addressLine1 ? 'is-invalid' : ''}`} placeholder="Address line 1" />
                  <input type="text"{...register("addressLine2")} className={`form-control  mt-1 ${errors.addressLine2 ? 'is-invalid' : ''}`} placeholder="Address line 2" />
                  <input type="text"{...register("addressLine3")} className={`form-control  mt-1 ${errors.addressLine3 ? 'is-invalid' : ''}`} placeholder="Address line 3" />
                  <div className="invalid-feedback">{errors.addressLine1?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text"{...register("location")} className={`form-control ${errors.location ? 'is-invalid' : ''}`} placeholder="Location(city)" />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="text"{...register("username")} className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="Username" />
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="password"{...register("password")} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-outline mb-4">
                  <input type="password"{...register("confirmPassword")} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} placeholder="Confirm Password" />
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
                <div className="modal-footer mb-2">
                  <button type="button" className="btn btn-dark btn-block mx-4 px-5 btn-custom-1" onClick={() => reset()}>Clear</button>
                  <button type="submit" className="btn btn-dark btn-block px-5 btn-custom-1">SignUp</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
