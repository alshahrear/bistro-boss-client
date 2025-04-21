import { useLoaderData } from "react-router-dom";
// import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, image, recipe, price, _id} = useLoaderData();
    const item = useLoaderData();
    console.log(item);
    const { register, handleSubmit} = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    

    const onSubmit = async data => {
            console.log(data)
            const imageFile = {image: data.image[0]}
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }   
            });
            if(res.data.success){
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                }
                const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
                console.log(menuRes.data)
                if(menuRes.data.modifiedCount > 0){
                    // reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is updated to the menu`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
            console.log( 'with image URL', res.data);
        };

    return (
        <div>
            <SectionTitle heading="update an item" subHeading="refresh info"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recipe Name*</legend>
                            <input
                                type="text"
                                className="input w-full"
                                defaultValue={name}
                                {...register("name", { required: true })}
                                required
                                placeholder="Recipe Name" />
                        </fieldset>
                        <div className="flex gap-6">
                            <fieldset className="fieldset flex-1">
                                <legend className="fieldset-legend">Category*</legend>
                                <select  {...register("category", { required: true })}
                                    defaultValue={category}
                                    className="select w-full">
                                    <option disabled={false}>Select a Category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </fieldset>
                            <fieldset className="fieldset flex-1">
                                <legend className="fieldset-legend">Price*</legend>
                                <input
                                    type="number"
                                    defaultValue={price}
                                    className="input w-full"
                                    {...register("price", { required: true })}
                                    placeholder="Price" />
                            </fieldset>
                        </div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recipe Details</legend>
                            <textarea 
                            className="textarea w-full h-25"
                            defaultValue={recipe}
                            {...register("recipe")}
                            placeholder="Recipe Details"></textarea>
                        </fieldset>
                        <div>
                            <input type="file"
                            // defaultValue={image}
                            {...register("image", { required: true })} className="file-input" />
                        </div>
                        <button className="btn flex mx-auto">
                            Update Menu Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;