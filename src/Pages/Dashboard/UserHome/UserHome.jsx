import UseAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const {user} = UseAuth();
    return (
        <div>
            <h2 className="text-3xl">
                Hi, Welcome Back
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default UserHome;