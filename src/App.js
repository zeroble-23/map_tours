import logo from './logo.svg';
import React, {useRef, useEffect, useState} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Locations from './locations.json'
import Navigator from './Navigator';
import LocationPopup from './LocationMarker';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import LocationMarker from './LocationMarker';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiamxyZXllcyIsImEiOiJja3dtNW42eTEyOHlyMm5xYmIzdXZzaHVnIn0.tuZrvm2VXlm4yojcMTJAHw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(new mapboxgl.Popup({color: "#FFFFFF"}));
  const [lng, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  const locationHandler = (_location) => {
    setSelectedLocation(_location);
    moveMap(_location);
  }

  const moveMap = (_location) => {
    map.current.flyTo({
      center: [_location.lon, _location.lat],
      zoom: _location.zoom
    });

    const markerNode = document.createElement('div');
    ReactDOM.render(<LocationMarker location={_location}/>, markerNode);
    markerRef.current
          .setLngLat([_location.lon, _location.lat])
          .setDOMContent(markerNode)
          .addTo(map.current);
  }

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
      <Navigator
        locationData={Locations}
        selectedLocation={selectedLocation}
        locationHandler={locationHandler}
       />
    </div>
  );
  
}

export default App;
