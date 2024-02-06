import { useParams } from "react-router-dom"
import { useHotels } from "../Context/HotelsProvider";
import { useEffect } from "react";
import Loader from "../Shared/Loader";

const SingleHotel = () => {
    const { id } = useParams();
    const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

    useEffect(() => {
        getHotel(id);
    }, [id]);

    if (isLoadingCurrHotel || !currentHotel) return <Loader />

    return (
        <div className="flex items-stretch justify-between gap-1 md:max-w-7xl mx-2 my-auto">
            <div>
                <img
                    className="w-full rounded-lg h-auto object-cover"
                    src={currentHotel.xl_picture_url}
                    alt={currentHotel.name} />
                <h2 className="font-black text-base mt-2">{currentHotel.name}</h2>
                <div className="mb-2">
                    <div className="font-medium text-sm">
                        {currentHotel.smart_location}
                    </div>
                    <div className="text-xs mt-2">
                        {currentHotel.number_of_reviews} reviews &bull;
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SingleHotel;