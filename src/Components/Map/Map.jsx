import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../Hooks/useGeoLocation";
import useUrlLocation from "../Hooks/useUrlLocation";

const Map = ({ markerLocations }) => {

    const [mapCenter, setMapCenter] = useState([45, 3]);
    const [lat, lng] = useUrlLocation();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeoLocation();

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }, [geoLocationPosition]);

    return (
        <div className="relative flex-1 bg-slate-100">
            <MapContainer
                className="h-full "
                center={mapCenter}
                zoom={10}
                scrollWheelZoom={true}
            >
                <button
                    onClick={getPosition}
                    className="absolute bg-red-900 shadow-[0_0_10px_rgba(250,0,0,1)]  z-[1000] px-2 py-1 text-xs font-medium rounded-xl bottom-5 left-4 text-white">
                    {isLoadingPosition ? "Loading ..." : " Use Your Location"}
                </button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <DetectClick />
                <ChangeCenter position={mapCenter} />
                {markerLocations.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.latitude, item.longitude]}>
                        <Popup>{item.host_location}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map;

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) =>
            navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
    return null;
}