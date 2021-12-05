import React, {useRef, useEffect, useState, useContext} from 'react';
import { Marker } from 'react-map-gl';

function LocationMarker(_props) {
  const {
    location
  } = _props;

  return (
    <div>
      <div
        className="location-image"
        style={{backgroundImage : "url(" + location.img_url +")", backgroundSize : "100% 100%"}}
        offsettop={-48}
        offsetleft={-24}
       />
       <div className="location-date">{location.visit_date}</div>
    </div>
  );
};

export default LocationMarker;