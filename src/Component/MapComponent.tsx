import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import MapIconModal from '../Modal/MapIconModal'
import { useCallback, useState } from "react";

// interface Marker = {

// }

const containerStyle = {
    width: '100%',
    height: '83vh'
};

const center = { lat: 7.284637177276179, lng: 80.6544941178496 };

const MapComponent = () => {
    const marker = [
        {
            id: 1,
            position: { lat: 7.28440194696273, lng: 80.66273386389746 }
        }
    ]

    const [showSignupModal, setshowSignupModal] = useState(false);
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState(null);

    // const onMapClick = (e: any) => {
    //     setMarkers((current) => [
    //         ...current,
    //         {
    //             lat: e.latLng.lat(),
    //             lng: e.latLng.lng()
    //         }
    //     ])
    // }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBquEtCXPf8P-c0AErGUCiURFpf6LQEezc"
    });
    if (!isLoaded) {
        <div className="preloader"></div>
    }

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, []);

    return (
        <>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount} >
                {marker.map((marker) => (
                    <Marker key={marker.id} position={marker.position} onClick={() => { setshowSignupModal(true) }}>
                        <MapIconModal show={showSignupModal} onHide={() => setshowSignupModal(false)} />
                    </Marker>
                ))}
            </GoogleMap>
        </>
    )
}
export default MapComponent
