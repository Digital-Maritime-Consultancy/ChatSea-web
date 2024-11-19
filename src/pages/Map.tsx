import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";

export interface MapProp {
}

interface FlyerProps {
  location: LatLngTuple;
}
const Flyer = ({ location }: FlyerProps) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(location);
  }, [location]);
  return <></>;
};

export const Map = forwardRef(({  }: MapProp, ref) => {
  const [location, setLocation] = useState<LatLngTuple>([48.853534, 2.348099]);

  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number) => setLocation([lat,lng] as LatLngTuple),
  }));
  
  const outerBounds: LatLngBoundsLiteral = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]

  useEffect(() => {}, [location]);
  return (
    <MapContainer
      id="map"
      style={{ height: "90vh", width: "100%" }}
      bounds={outerBounds}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Flyer location={location}></Flyer>
      
    </MapContainer>
  );
});

export default Map;