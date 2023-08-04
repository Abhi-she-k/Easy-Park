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
    <Map/> 
    <div className="Menu">
      
      <span><h1 id="Title">EasyPark</h1> </span>      
      <span><input id="Search"></input> </span>    
      <span><button>Create Listing</button> </span>    
      <span><button>Login</button> </span>  

    </div>
  </div>
);
}


const mapOptions = {
  mapTypeControl : false,
  streetViewControl:false,
  fullscreenControl:false,
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap 
      zoom={10} 
      center={center} 
      mapContainerClassName="map-container"
      options={mapOptions}>
      <Marker position={center} />
    </GoogleMap>
  );
}