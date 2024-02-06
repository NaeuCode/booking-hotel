import { Link } from "react-router-dom";
import Loader from "../Shared/Loader"
import { useHotels } from "../Context/HotelsProvider";

function Hotels() {
    const {
        isLoading,
        hotels,
        currentHotel,
    } = useHotels();

    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col mx-4">
            <h2 className="text-xl font-black mb-4">Search Results ({hotels.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {hotels.map((item) => {
                    return (
                        <Link
                            key={item.id}
                            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                        >
                            <div
                                className={`flex md:flex-col gap-2 brightness-75 hover:brightness-95 transition-all duration-300 
                                ${item.id === currentHotel?.id ? "border-2 border-solid border-slate-500 rounded-xl" : ""}`}
                            >
                                <img
                                    src={item.picture_url.url}
                                    alt={item.name}
                                    className="w-28 h-28 md:w-80 md:h-80 object-cover object-center rounded-lg md:mb-2 cursor-pointer "
                                />
                                <div className="space-y-2">
                                    <p className="font-bold text-xs md:text-xl md:my-4 md:line-clamp-1 cursor-pointer">{item.smart_location}</p>
                                    <p className="text-xs md:text-base font-normal md:line-clamp-2 md:h-16 text-slate-400">{item.name}</p>
                                    <p className="flex justify-start text-xs md:text-sm font-black items-center gap-2 mt-3">
                                        €&nbsp;{item.price}&nbsp;
                                        <span className="text-xs md:text-md text-slate-500">Night</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Hotels;