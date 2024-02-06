import { Outlet } from "react-router-dom"
import Map from "../Map/Map"
import { useHotels } from "../Context/HotelsProvider";

const AppLayout = () => {
    const { hotels } = useHotels();

    return (
        <div className='mt-1 flex justify-between items-stretch h-[calc(100vh-130px)]'>
            <div className='w-1/2 overflow-y-scroll pr-4'>
                <Outlet />
            </div>
            <Map markerLocations={hotels} />
        </div>
    )
}

export default AppLayout