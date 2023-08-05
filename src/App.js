import { React, useState, useRef, useMemo} from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import {usePosition} from 'use-position';
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAQvx5oeGKYXE2PMOwXko-Qa4-Ge40XrpA");


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQvx5oeGKYXE2PMOwXko-Qa4-Ge40XrpA",
    libraries: ["places"]
  });

  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };
  const { latitude, longitude, error } = usePosition();

  const [mapCenter, setMapCenter] = useState({
    lat: latitude,
    lng: longitude
  });

  const Map = () => {
      
    return (
      <GoogleMap
        zoom={10}
        center={mapCenter}
        mapContainerClassName="map-container"
        options={mapOptions}>
        <Marker position={mapCenter} />
      </GoogleMap>
    );
  };
  

  const [searchInput, setSearchInput] = useState(""); 

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const search = (event) => {
    event.preventDefault();
    console.log(searchInput)

    Geocode.fromAddress(searchInput)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      const newPosition = {
        lat: lat,
        lng: lng
      };
      setMapCenter(newPosition);
      return(
        <Map/>
      )
    })
    .catch((error) => {
      console.error(error);
    });

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
        <button id = "Search-btn" type="submit" >Go</button> 
      </form>
      </span>  
      <span><button id="btn">Post Spot</button> </span>    
      <span><button id="btn">Login</button> </span>  

    </div>
  </div>
);
}




