import { React, useState, useMemo} from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQvx5oeGKYXE2PMOwXko-Qa4-Ge40XrpA",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
  <div className='Home'>
    <div className="Menu"> 
    <h1 className="MenuChild">EasyPark</h1>        
    <input className='MenuChild'></input>
    <button className='MenuChild'>Create Listing</button>
    </div>
  <Map/>
  </div>
);
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}