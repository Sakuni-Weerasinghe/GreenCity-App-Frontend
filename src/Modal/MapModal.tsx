import Modal from "react-bootstrap/Modal";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import MapIconModal from '../Modal/MapIconModal'
import { useCallback, useState } from "react";

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = { lat: 7.284637177276179, lng: 80.6544941178496 };
const marker = {
    id: 1,
    position: { lat: 7.28440194696273, lng: 80.66273386389746 }
}
const MapModal = (props: any) => {
    const [showSignupModal, setshowSignupModal] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBquEtCXPf8P-c0AErGUCiURFpf6LQEezc"
    });

    const [map, setMap] = useState(null);

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
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter " fullscreen centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} onLoad={onLoad} onUnmount={onUnmount}>
                        <Marker key={marker.id} position={marker.position} onClick={() => { setshowSignupModal(true) }}>
                            <MapIconModal show={showSignupModal} onHide={() => setshowSignupModal(false)} />
                        </Marker>
                    </GoogleMap>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MapModal;