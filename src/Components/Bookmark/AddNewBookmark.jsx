import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Shared/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkListContext";
import useUrlLocation from "../Hooks/useUrlLocation";

const BASE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
    const [lat, lng] = useUrlLocation();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
    const [geoCodingError, setGeoCodingError] = useState(null);
    const { createBookmark } = useBookmark();

    useEffect(() => {
        if (!lat || !lng) return;

        async function fetchLocationData() {
            setIsLoadingGeoCoding(true);
            setGeoCodingError(null);
            try {
                const { data } = await axios.get(
                    `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
                );

                if (!data.countryCode)
                    throw new Error(
                        "this location is not a city! please click somewhere else."
                    );

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);
            } catch (error) {
                setGeoCodingError(error.message);
            } finally {
                setIsLoadingGeoCoding(false);
            }
        }
        fetchLocationData();
    }, [lat, lng]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cityName || !country) return;

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country,
        };
        await createBookmark(newBookmark);
        navigate("/bookmark");
    };

    if (isLoadingGeoCoding) return <Loader />;
    if (geoCodingError) return <strong>{geoCodingError}</strong>;

    return (
        <div className="m-4">
            <h2 className="font-black text-lg">Bookmark New Location</h2>
            <form className="relative my-6 mx-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-medium mt-2" htmlFor="cityName">CityName</label>
                    <input
                        className="w-full text-sm border-2 border-solid border-slate-400 rounded-xl p-2"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        type="text"
                        name="cityName"
                        id="cityName"
                    />
                </div>
                <div>
                    <label className="block font-medium mt-2" htmlFor="country">Country</label>
                    <input
                        className="w-full text-sm border-2 border-solid border-slate-400 rounded-xl p-2"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="country"
                        id="country"
                    />
                    <ReactCountryFlag className="absolute right-4 bottom-[64px]" svg countryCode={countryCode} />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="border-[1px] border-solid border-slate-400 rounded-xl py-1 px-3"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        &larr; Back
                    </button>
                    <button className="text-base py-1 px-3 rounded-xl bg-red-900 text-white">Add</button>
                </div>
            </form>
        </div>
    );
}
export default AddNewBookmark;
