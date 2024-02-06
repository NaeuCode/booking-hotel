import ReactCountryFlag from "react-country-flag";
import Loader from "../Shared/Loader";
import { useBookmark } from "../Context/BookmarkListContext";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;

  return (
    <div className="m-4">
      <h2 className="font-black text-lg">Bookmark List</h2>

      <div className="mt-4">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`flex items-center justify-between p-6 mb-4 border-[1px] border-solid rounded-lg ${item.id === currentBookmark?.id ? "border-red-600 bg-slate-100" : ""
                  }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="fill-red-500 w-6 h-6" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmark;
