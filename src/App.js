import React from "react";
import "./App.css";
import Map from "./components/Map.js"

export default function App() {
  const [page, setPage] = React.useState('home')
  return (
    <div>
      <h1>middlebury should walk around</h1>
      <p>how do you want to pick a path?</p>
      <button onClick={() => setPage('map')}>map</button>
      <button onClick={() => setPage('activity')}>activity</button>
      <button onClick={() => setPage('distance')}>distance</button>
      {(page==='map') &&
    <div className= "card">
      
        <div className="container">
          <h4><b>Map whoo</b></h4>
          <p>Description of this map</p>
      </div>
      <Map/>

    </div>}
    </div>
  );
}