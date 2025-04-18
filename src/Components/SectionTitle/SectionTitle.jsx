

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="w-3/12 mx-auto text-center">
            <p className="text-yellow-500 text-xl mb-2">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase border-y-2 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;