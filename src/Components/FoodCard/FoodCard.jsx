

const FoodCard = ({item}) => {
    const { name, image, price, recipe} = item;
    
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className="absolute rounded-lg right-0 mr-4 mt-3 px-3 bg-slate-900 text-white">$</p>
            <div className="card-body ">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;