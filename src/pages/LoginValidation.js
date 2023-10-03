//-----------------         Import necessary dependencies and styles    -----------------------------------//
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, } from 'mdb-react-ui-kit';
import IMAGE from '../images/assismentLogin.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useFormik } from 'formik'
import SignupSchema from '../schemas/index.js'
//------------------------     Define initial form values     --------------------------------------------------//

const initialValues = {
    email: "",
    password: "",
}
//---------------------------      LoginValidation             ----------------------------------------------------//
const LoginValidation = () => {

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {

            const userLoginObj = {
                email: values.email,
                password: values.password
            }
            try {
                const response = await axios.post("https://dummyjson.com/users/add",
                    userLoginObj
                )
                console.log('Response:', response.data);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Login successful',
                        icon: 'success'
                    });
                    action.resetForm()
                } else {
                    if (response.status === 404) {
                        Swal.fire({
                            title: 'Error',
                            text: 'API endpoint not found. Please check the URL.',
                            icon: 'error',
                        });
                    }
                    else if (response.status === 500) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Internal server error. Please try again later.',
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'API call failed',
                            icon: 'error'
                        });
                    }
                }

            } catch (error) {
                console.log("error", error);
                Swal.fire({
                    title: error.message,
                    text: 'Login failed',
                    icon: 'error'
                });
            }
        }

    });

    return (
        <div style={{ height: "100vh" }} className="main-container d-flex justify-content-center align-items-center">
            <MDBContainer fluid className="d-flex justify-content-center align-items-center p-3 pb-5  h-auto ">
                <MDBRow className='d-flex justify-content-center align-items-center w-100 h-auto'>
                    <MDBCol col='10' md='6'>
                        <img src={IMAGE} className="img-fluid" alt="Sample-img" />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        <div className="divider d-flex align-items-center my-4">
                            <h3 className="text-center fw-bold mb-0">Login Form</h3>
                        </div>

                        <div className="email-container mb-3 w-75">
                            <MDBInput wrapperClass='' label='Email address' className='formControlLg' type='email' name='email' autoComplete='off' value={values.email} onChange={handleChange} onBlur={handleBlur} size="lg" required />
                            {errors.email && touched.email ? <span className='error-msg text-danger'>{errors.email}*</span>
                                : null
                            }
                        </div>
                        <div className="pass-container w-75">
                            <MDBInput wrapperClass='' label='Password' className='formControlLg' type='password' name='password' autoComplete='off' value={values.password} onChange={handleChange} size="lg" required />
                            {errors.password && touched.password ? <span className='error-msg text-danger'>{errors.password}*</span>
                                : null
                            }
                        </div>
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn onClick={handleSubmit} className='w-25' type='submit'>Login</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default LoginValidation;