import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ setValue, watch }) => {
    const lat = watch('lat');
    const lng = watch('lng');
    const [position, setPosition] = useState([lat, lng]);

    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            setValue('lat', e.latlng.lat);
            setValue('lng', e.latlng.lng);
        },
    });

    useEffect(() => {
        map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);

    return position === null ? null : (
        <Marker position={position} draggable={true} eventHandlers={{
            dragend(e) {
                const marker = e.target;
                const { lat, lng } = marker.getLatLng();
                setValue('lat', lat);
                setValue('lng', lng);
            }
        }} />
    );
};

const Map = ({ setValue, watch, center }) => {
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} className='w-full h-96'>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setValue={setValue} watch={watch} />
        </MapContainer>
    );
};

export default Map;
