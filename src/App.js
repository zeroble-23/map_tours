import logo from './logo.svg';
import React, {useRef, useEffect, useState} from 'react';
import './App.css';
import Locations from './locations.json'
import Navigator from './Navigator';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoiamxyZXllcyIsImEiOiJja3dtNW42eTEyOHlyMm5xYmIzdXZzaHVnIn0.tuZrvm2VXlm4yojcMTJAHw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLon] = useState(Locations.places[0].lon);
  const [lat, setLat] = useState(Locations.places[0].lat);
  const [zoom, setZoom] = useState(Locations.places[0].zoom);
  const [selectedLocation, setSelectedLocation] = useState(Locations.places[0]);

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
      center: [_location.lon, _location.lat]
    });
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
