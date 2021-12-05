import React, {useRef, useEffect, useState} from 'react';

function Navigator(_props) {
  const nextLocation = () => {
    let currentIndex = _getSelectedLocationIndex();
    let nextItem = currentIndex >= (_props.locationData.length -1) ? _props.locationData[0] : _props.locationData[currentIndex + 1];
    _props.locationHandler(nextItem);
  }

  const prevLocation = () => {
    let currentIndex = _getSelectedLocationIndex();
    let prevItem = currentIndex === 0 ? _props.locationData[_props.locationData.length -1] : _props.locationData[currentIndex - 1];
    _props.locationHandler(prevItem);
  }

  const _getSelectedLocationIndex = () => {
    return _props.selectedLocation ? _props.locationData.findIndex((item) => {return item.id === _props.selectedLocation.id}) : 0;
  }


  return (
    <div>
      <div className="navigator">
        <div className="nav-button nav-button-left" onClick={prevLocation}>
          <div className="nav-button-icon">＜</div>
        </div>
        <div className="nav-location-area">
          <div className="location-name">{_props.selectedLocation?.name || 'Click the arrows to start!'}</div>
          <div className="location-description">{_props.selectedLocation?.description}</div>
        </div>
        <div className="nav-button nav-button-right" onClick={nextLocation}>
          <div className="nav-button-icon">＞</div>
        </div>
      </div>
      <div className="location-list-button" onClick={_props.locationListToggler}>▼</div>
    </div>
  );
}

export default Navigator;