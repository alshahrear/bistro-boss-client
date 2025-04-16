import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const AxiosPublic = useAxiosPublic();
    const onSubmit = async data => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await AxiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }   
        });
        console.log(res.data);
    };
    return (
        <div>
            <SectionTitle heading="add an items" subHeading="what's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recipe Name*</legend>
                            <input
                                type="text"
                                className="input w-full"
                                {...register("name", {required: true})}
                                required
                                placeholder="Recipe Name" />
                        </fieldset>
                        <div className="flex gap-6">
                            <fieldset className="fieldset flex-1">
                                <legend className="fieldset-legend">Category*</legend>
                                <select  {...register("category", {required: true})}
                                    defaultValue="Pick a color" className="select w-full">
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
                                    className="input w-full"
                                    {...register("price", {required: true})}
                                    placeholder="Price" />
                            </fieldset>
                        </div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recipe Details</legend>
                            <textarea className="textarea w-full h-25"
                            {...register("recipe")}
                             placeholder="Recipe Details"></textarea>                            
                        </fieldset>
                        <div>
                        <input type="file" {...register("image", {required: true})} className="file-input" />
                        </div>
                        <button className="btn flex mx-auto">
                            Add Item <FaUtensils></FaUtensils>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;