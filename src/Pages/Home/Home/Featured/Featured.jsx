import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import featured from "../../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
        <div className="mb-10 featured-item text-white bg-fixed">
            <SectionTitle 
            subHeading="Check it out"
            heading="Featured Item"
            ></SectionTitle>
            <div className="flex justify-center items-center py-8 px-16 bg-slate-400 bg-opacity-60">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="ml-10 space-y-4">
                    <p>20 sep, 2025</p>
                    <p className="uppercase">Where can I get some</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod labore itaque, voluptate placeat a facilis architecto mollitia voluptas laboriosam, sequi expedita ad repudiandae pariatur, sapiente maiores quae. Expedita, ullam dicta.</p>
                    <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;