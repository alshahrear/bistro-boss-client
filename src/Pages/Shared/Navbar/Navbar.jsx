import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { IoIosCart } from "react-icons/io";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        {/* <li><Link to="/secret">Secret</Link></li> */}
        {
            user && isAdmin &&  <li><Link to="/dashboard/adminHome">Dashboard</Link></li> 
        }
        {
            user && !isAdmin &&  <li><Link to="/dashboard/userHome">Dashboard</Link></li> 
        }
        <li>
            <Link to="/dashboard/cart">
                <button className="btn">
                    <IoIosCart className="mr-2"></IoIosCart> 
                    <div className="badge badge-sm badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>
        {
            user ?
                <>
                    {/* <span>{user?.displayName}</span> */}
                    <li><button onClick={handleLogOut} className="btn btn-ghost">Log Out</button></li>
                </> :
                <li><Link to="/login">Login</Link></li>
        }

    </>
    return (
        <div>
            <div className="navbar max-w-7xl fixed z-10 bg-opacity-140 bg-black text-white shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;