import { useMemo } from "react";
import './App.css';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQvx5oeGKYXE2PMOwXko-Qa4-Ge40XrpA",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (<div className="Home">
  <h1>EasyPark</h1>        
  <Map/></div>);
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}