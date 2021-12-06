import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Navigator from './Navigator';
import LocationMarker from './LocationMarker';
import LocationList from './LocationList';

import Locations from './locations.json'
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamxyZXllcyIsImEiOiJja3dtNW42eTEyOHlyMm5xYmIzdXZzaHVnIn0.tuZrvm2VXlm4yojcMTJAHw';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(new mapboxgl.Popup({color: "#FFFFFF"}));
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationListVisible, setLocationListVisible] = useState(false);

  const sortedLocations = Locations.places.sort((placeA, placeB) => {
    let dateA = new Date(placeA.visit_date),
        dateB = new Date(placeB.visit_date);
    return dateA > dateB ? 1 : -1;
  });

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
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

  const toggleLocationList = () => {
    setLocationListVisible(!locationListVisible);
  }

  const locationList = (
      <LocationList
        locationData={sortedLocations}
        locationHandler={locationHandler}
      />
  );

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
      <Navigator
        locationData={sortedLocations}
        selectedLocation={selectedLocation}
        locationHandler={locationHandler}
        locationListToggler={toggleLocationList}
      />
      {locationListVisible ? locationList : null}
    </div>
  );
}

export default App;
