import useFetch from "../Hooks/useFetch";
import Loader from "../Shared/Loader";

const LocationList = () => {

    const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
    if (isLoading) return <Loader />

    return (
        <div className=" xl:container xl:max-w-6xl mx-4">
            <h2 className="font-bold text-2xl py-2 mb-4">Nearby Locations</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
                {data.map((item) => {
                    return (
                        <div key={item.isLoading}>
                            <img
                                src={item.picture_url.url}
                                alt={item.name}
                                className="w-full h-80 object-cover object-center rounded-lg mb-2 "
                            />
                            <div className="space-y-2">
                                <p className="font-bold text-xl my-4 line-clamp-1 cursor-pointer">{item.smart_location}</p>
                                <p className="text-base font-normal line-clamp-2 h-16 text-slate-400">{item.name}</p>
                                <p className="flex justify-start font-black items-center gap-2 mt-3">
                                    €&nbsp;{item.price}&nbsp;
                                    <span className="text-slate-500">Night</span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LocationList