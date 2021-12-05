import React, {useRef, useEffect, useState} from 'react';

function LocationListItem(_props) {

  const locationHandleClick = () => {
    _props.selectedLocationHandler(_props.locationIndex);
  }

  return (
    <div 
      className="location-list-item"
      onClick={locationHandleClick}
    >
      {_props.locationName}
    </div>
  );
}

export default LocationListItem;