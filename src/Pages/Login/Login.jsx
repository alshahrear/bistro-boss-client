import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                console.log(result.user)
            })
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        <label className="fieldset-label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" />
                        <label className="fieldset-label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <LoadCanvasTemplate />
                        <input type="text" ref={captchaRef} name="captcha" className="input" placeholder="type the text above" />
                        <button onClick={handleValidateCaptcha} className="btn mt-2 btn-outline btn-xs">Validate</button>
                        <input disabled={disabled} className="btn btn-neutral mt-4" type="submit" value="Login" />
                    </fieldset>
                </form>
                <p className='link-hover text-center mb-2'><small>New Here? <Link to="/signup">Create an account</Link></small></p>
            </div>
        </div>
    );
};

export default Login;