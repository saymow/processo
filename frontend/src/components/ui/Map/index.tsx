import React from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngTuple, LeafletMouseEvent } from "leaflet";

import { Container } from "./styles";
import { MarkerIcon } from "../../../utils/leaflet";
import { MAPBOX_API_KEY } from "../../../constants";

interface Coords {
  lat: number;
  lng: number;
}

interface Props {
  pos: {
    map: {
      lat: number;
      lng: number;
    };
    marker: {
      lat: number;
      lng: number;
    };
  };
  onSelectCoordinate: (arg0: Coords) => void;
}

interface MarkerProps {
  position: LatLngTuple;
  onSelectCoordinate: (arg0: Coords) => void;
}

const MyMap: React.FC<Props> = ({ pos, onSelectCoordinate }) => {
  const mapPos: LatLngTuple = [pos.map.lat, pos.map.lng];
  const markerPos: LatLngTuple = [pos.marker.lat, pos.marker.lng];

  return (
    <Container>
      <MapContainer
        key={mapPos[0]}
        center={mapPos}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`}
        />
        <MarkerContainer
          position={markerPos}
          onSelectCoordinate={onSelectCoordinate}
        />
      </MapContainer>
    </Container>
  );
};

const MarkerContainer: React.FC<MarkerProps> = ({
  position,
  onSelectCoordinate,
}) => {
  useMapEvents({
    click: handleMapClick,
  });

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    onSelectCoordinate({ lat, lng });
  }

  return <Marker position={position} icon={MarkerIcon} />;
};

export default MyMap;
