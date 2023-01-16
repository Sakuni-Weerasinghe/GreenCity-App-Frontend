import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react';
import MapIconModal from '../../Modal/MapIconModal';
import "./map.css"

const center = { lat: 7.287637177276179, lng: 80.6544941178496 };
const Map = () => {
    const marker = {
        id: 1,
        position: { lat: 7.28440194696273, lng: 80.66273386389746 }
    }
    const [showSignupModal, setshowSignupModal] = useState(false)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBquEtCXPf8P-c0AErGUCiURFpf6LQEezc",
    });
    if (!isLoaded) {
        <div className="preloader"></div>
    }
    return (
        <div>
            <GoogleMap zoom={12} center={center} mapContainerClassName={"map-container"} onClick={() => { setshowSignupModal(true) }}>
                <Marker key={marker.id} position={marker.position} onClick={() => setshowSignupModal(true)}>
                    <MapIconModal show={showSignupModal} onHide={() => setshowSignupModal(false)} />
                </Marker>
            </GoogleMap>
        </div>
    )

}

export default Map
