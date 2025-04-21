import Swal from "sweetalert2";
import UseAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";



const FoodCard = ({item}) => {
    const { name, image, price, recipe, _id} = item;
    const {user} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddCart = () => {
       if(user && user.email){
        console.log(user.email)
        const cartItem = {
            menuId: _id,
            email: user.email,
            name,
            image, 
            price
        }
        axiosSecure.post('/carts', cartItem)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();
            }
        })
       }
       else{
        Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Login"
          }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login', {state: {from: location}})
            }
          });
       }
    }
    
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className="absolute rounded-lg right-0 mr-4 mt-3 px-3 bg-slate-900 text-white">$</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                    onClick={handleAddCart}
                    className="btn btn-outline border-0 border-b-3 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;