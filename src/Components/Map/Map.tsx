import { GoogleMap,useJsApiLoader} from '@react-google-maps/api'
import "./map.css"

function Map() {

    return(
        <div>
        <GoogleMap zoom={10} mapContainerClassName="map-container"></GoogleMap>
        <h2>Map</h2>
        </div>
       
    )
}


const MapComponent = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBquEtCXPf8P-c0AErGUCiURFpf6LQEezc"
    });

    if(!isLoaded){
        return(
            <div className="preloader">
            </div>
        )
    } 
}

export default MapComponent
