import { Outlet } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkListContext"
import Map from "../Map/Map"

const BookmarkLayout = () => {
    const { bookmarks } = useBookmark();

    return (
        <div className='mt-1 flex justify-between items-stretch h-[calc(100vh-130px)]'>
            <div className='w-1/2 overflow-y-scroll pr-4'>
                <Outlet />
            </div>
            <Map markerLocations={bookmarks} />
        </div>
    )
}

export default BookmarkLayout;