import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSignIn} = UseAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })

        })
    }
    return (
        <div className="px-24 pb-2">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle></FaGoogle>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;