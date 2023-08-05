import { React, useState, useMemo} from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {usePosition} from 'use-position';




export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQvx5oeGKYXE2PMOwXko-Qa4-Ge40XrpA",
  });


  const [searchInput, setSearchInput] = useState(""); 

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    console.log(searchInput);
  };



  if (!isLoaded) return <div><h1>Loading...</h1></div>;
  return ( 
    
  <div className='Home'>
    <Map/> 
    <div className="Menu">
      
      <span id="Header">
        <h1>EasyPark</h1>
      </span>      
      <span className="Wrapper">
      <form onSubmit={search}>
        <input id="Search" type="text" placeholder="Toronto, ON, Canada" value={searchInput} onChange={handleSearchChange}/>
        <button id = "Search-btn" type="submit"  >Go</button> 
      </form>
      </span>
         
      <span><button id="btn">Post Spot</button> </span>    
      <span><button id="btn">Login</button> </span>  

    </div>
  </div>
);
}

function Map() {
  const { latitude, longitude, error } = usePosition();

  const center = {
    lat: latitude ,
    lng: longitude ,
  };

  const mapOptions = {
    mapTypeControl : false,
    streetViewControl:false,
    fullscreenControl:false,
  }

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


