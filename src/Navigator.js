import React, {useRef, useEffect, useState} from 'react';



function Navigator(_props) {
  const nextLocation = () => {
    let currentIndex = _getSelectedLocationIndex();
    let nextItem = currentIndex >= (_props.locationData.places.length -1) ? _props.locationData.places[0] : _props.locationData.places[currentIndex + 1];
    _props.locationHandler(nextItem);
  }

  const prevLocation = () => {
    let currentIndex = _getSelectedLocationIndex();
    let prevItem = currentIndex === 0 ? _props.locationData.places[_props.locationData.places.length -1] : _props.locationData.places[currentIndex - 1];
    _props.locationHandler(prevItem);
  }

  const _getSelectedLocationIndex = () => {
    return _props.selectedLocation ? _props.locationData.places.findIndex((item) => {return item.id === _props.selectedLocation.id}) : 0;
  }

  return (
    <div className="navigator">
      <div className="nav-button nav-button-left" onClick={prevLocation}>
        <div className="nav-button-icon">＜</div>
      </div>
      <div className="nav-location-area">
        <div>Locations</div>
        <div>{_props.selectedLocation?.name}</div>
        <div>{_props.selectedLocation?.description}</div>
      </div>
      <div className="nav-button nav-button-right" onClick={nextLocation}>
        <div className="nav-button-icon">＞</div>
      </div>
    </div>
  );
}

export default Navigator;