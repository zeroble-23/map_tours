import React, {useRef, useEffect, useState} from 'react';
import LocationListItem from './LocationListItem';

function LocationList(_props) {
  const {
    locationData
  } = _props;

  const selectedLocationHandler = (_index) => {
    const {
      locationData
    } = _props;
    _props.locationHandler(locationData[_index]);
  }

  const locationList = locationData.map((_location, _idx) => {
    return (
      <LocationListItem
        key={_location.id}
        locationName={_location.name}
        locationIndex={_idx}
        selectedLocationHandler={selectedLocationHandler}
      />
    );
  });

  return (
    <div className="location-list">
      {locationList}
    </div>
  );
}

export default LocationList;