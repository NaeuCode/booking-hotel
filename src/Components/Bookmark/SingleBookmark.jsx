import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Shared/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBookmark, isLoading, currentBookmark } = useBookmark();
    useEffect(() => {
        getBookmark(id);
    }, [id]);

    if (isLoading || !currentBookmark) return <Loader />;
    return (
        <div className="m-4">
            <button
                onClick={() => navigate(-1)}
                className="border-[1px] border-solid border-slate-400 rounded-xl py-1 px-3 mb-4">
                &larr; Back
            </button>
            <h2 className="my-1 font-medium">
                {currentBookmark.cityName}
            </h2>
            <div className={`flex items-center justify-between p-4 rounded-md mb-4 bg-slate-100 border-solid border-slate-400 border-[1px]`}>
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
                <span>{currentBookmark.country}</span>
            </div>
        </div>
    );
}
export default SingleBookmark;