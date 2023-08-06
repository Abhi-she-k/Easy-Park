import { React, useState, useEffect, useMemo} from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import {usePosition} from 'use-position';
import Geocode from "react-geocode");


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ",
    libraries: ["places"]
  });

  const { latitude, longitude, error } = usePosition();
  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setMapCenter({
        lat: latitude,
        lng: longitude
      });
    }
  }, [latitude, longitude]);

  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };


  

  const [searchInput, setSearchInput] = useState(""); 

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const setLocation = (lat, lng) => {
    const newPosition = {
      lat: lat,
      lng: lng
    };
    setMapCenter(newPosition);
  }
  
  const search = (event) => {
    event.preventDefault();

    Geocode.fromAddress(searchInput)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLocation(lat,lng);

    })
    .catch((error) => {
      
      console.error(error);
    });

  };

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

  if (!isLoaded) return <div><h1>Loading...</h1></div>;
  return ( 
    
  <div className='Home'>
    <Map/> 
    <div className="Menu">
      
      <span id="Header">
        <h1>EasyPark</h1>
      </span>      
      <span className="Wrapper">
      <form >
        <input id="Search" type="text" placeholder="Toronto, ON, Canada" value={searchInput} onChange={handleSearchChange}/>
        <button id = "Search-btn" type="submit" onClick={search}>Go</button> 
      </form>
      </span>  
      <span><button id="btn">Post Spot</button> </span>    
      <span><button id="btn">Login</button> </span>  

    </div>
  </div>

  
);

}




