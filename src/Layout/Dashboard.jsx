import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaEnvelope, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
    const isAdmin = true;

    return (
        <div className="flex">
            <div className="min-h-screen w-64 bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                             <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils></FaUtensils>
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList></FaList>
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook></FaBook>
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers></FaUsers>
                                       All Users
                                    </NavLink>
                                </li>
                            </> :
                            <>
                               
                            </>
                    }
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
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact
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