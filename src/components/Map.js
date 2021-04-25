import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";

import { Icon } from "leaflet";
import { render } from "react-dom";

class Map extends Component {
    constructor(){
        super();
        this.state={
            kml: '',
        }
    }
    render(){

        fetch('tam.txt')
            .then(res => res.text())
            .then(kmlText => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            this.setState({kml:kml});

        });
        
  return (
    <MapContainer center={[44.0084885, -73.1761]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {this.state.kml && <ReactLeafletKml kml={this.state.kml} />}
    </MapContainer>
  );}
}

export default Map