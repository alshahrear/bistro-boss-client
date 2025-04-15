import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('user update profile')
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Bistro | Sign Up</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <fieldset className="fieldset">

                        <label className="fieldset-label">Name</label>
                        <input type="name" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                        {errors.name && <span className="text-red-600">Name is required</span>}

                        <label className="fieldset-label">Photo URL</label>
                        <input type="name" {...register("photoURL", { required: true })} className="input" placeholder="Photo URL" />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}

                        <label className="fieldset-label">Email</label>
                        <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                        {errors.name && <span className="text-red-600">Email is required</span>}

                        <label className="fieldset-label">Password</label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])/

                        })} name="password" className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase, one lowercase, one number and one special characters</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <input className="btn btn-neutral mt-4" type="submit" value="Sign Up" />
                    </fieldset>
                </form>
                <p className='link-hover text-center mb-3'><small>New Here? <Link to="/login">Already have an account</Link></small></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default SignUp;