import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


class LeafletMap extends React.Component {


  render() {
    return (
      <MapContainer
        style={{ height: '400px' }}
        center={[42.05924878983097, -87.67414129943302]}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[42.05786588122882, -87.67446741901199]}>
          <Popup>Mudd Hall, 2233 Tech Dr 3rd Floor, Evanston, IL 60208</Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default LeafletMap;
