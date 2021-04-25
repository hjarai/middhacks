import React from "react";
import "./App.css";
import Map from "./components/Map.js"
import Upload from "./components/Upload.js"


export default function App() {
  const [page, setPage] = React.useState('home');
  const [picArray, setPicArray] = React.useState([]);
  const [showUpload, setShowUpload] = React.useState(false);
  
  function appendPicArray(entry){
    setPicArray([...picArray, entry])
  }
  return (
    // <div>
    //   <h1>middlebury should walk around</h1>
    //   <p>how do you want to pick a path?</p>
    //   <button onClick={() => setPage('map')}>map</button>
    //   <button onClick={() => setPage('activity')}>activity</button>
    //   <button onClick={() => setPage('distance')}>distance</button>
    //   {(page==='map') &&
    // <div className= "card">
      
    //     <div className="container">
    //       <h4><b>Map whoo</b></h4>
    //       <p>Description of this map</p>
    //     </div>
    //   <Map/>

    // </div>}
    // </div>
    <div>    
      
      {showUpload? 
        <Upload append={appendPicArray} setPage={setShowUpload}/>:
        <div>
          <button className="button" onClick={()=>setShowUpload(true)}>CLICK ME</button>
          <div className="large">
            <Map/>
            </div>
        </div>}

    </div>

    
  );
}