import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Icon } from "leaflet";
import { render } from "react-dom";

class Pick extends Component {
    constructor(props){
        super(props);
        this.state={
            lat: 0,
            long:0,
            currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e){
    this.setState({ currentPos: e.latlng });
  }
    render(){

  return (
    <MapContainer center={[44.0084885, -73.1761]} zoom={14} onClick={this.handleClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
        { this.state.currentPos && <Marker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </Marker>}
    </MapContainer>
  );}
}

export default Pick