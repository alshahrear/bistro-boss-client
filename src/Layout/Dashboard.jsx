import { NavLink, Outlet } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { FaAd, FaCalendar, FaHome, FaList } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();

    return (
        <div className="flex">
            <div className="min-h-screen w-64 bg-orange-400">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/userHome">
                        <FaHome></FaHome>
                        User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                        <IoIosCart></IoIosCart>
                        My Cart ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                        <FaAd></FaAd>
                        Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                        <FaCalendar></FaCalendar>
                        Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings">
                        <FaList></FaList>
                       My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome></FaHome>
                       Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <IoMdMenu></IoMdMenu>
                       Menu
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;