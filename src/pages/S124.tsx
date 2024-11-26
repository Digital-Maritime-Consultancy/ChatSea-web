import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple, Icon } from "leaflet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MapContainer, Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import { parseS124 } from "../util/s124Parser";
import { getMeanPosition } from "../util/s124Parser";
import S100Data from "../models/S100data";
import { useMsgState } from "../context/MessageContext";
import { isS100File } from "../util/S100FileUtil";

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

const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple', fillColor: 'blue' }
const markerIcon = new Icon({
    iconUrl: '/NavigatoinalWarningFeaturePart.svg',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5]
});

export const S124 = forwardRef(({ }: MapProp, ref) => {
    const [data, setData] = useState<S100Data[]>([]);
    const [location, setLocation] = useState<LatLngTuple>([48.853534, 2.348099]);
    const msgState = useMsgState();
    useImperativeHandle(ref, () => ({
        flyTo: (lat: number, lng: number) => setLocation([lat, lng] as LatLngTuple),
    }));

    useEffect(() => {
        if (msgState && msgState.mmtpMsgData.length > 0) {
            const decodedData = new TextDecoder().decode(msgState.mmtpMsgData);
            console.log(decodedData);
            console.log(isS100File(decodedData));
            if (isS100File(decodedData)) {
                parseS124(decodedData).then(result => {
                    if (Array.isArray(result)) {
                        setData([...data, ...result]);
                    } else {
                        setData([...data, result]);
                    }
                });
            }
            //const parsedData = parseS124(decodedData);
            //setData(parsedData);
            //setLocation(getMeanPosition(parsedData));
        }
    }, [msgState]);

    const outerBounds: LatLngBoundsLiteral = [
        [50.505, -29.09],
        [52.505, 29.09],
    ]

    const multiPolyline: LatLngExpression[][] = [
        [
            [51.5, -0.1],
            [51.5, -0.12],
            [51.52, -0.12],
        ],
        [
            [51.5, -0.05],
            [51.5, -0.06],
            [51.52, -0.06],
        ],
    ]

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
            {data.map((item, index) => {
                if (item.type === "marker") {
                    return item.marker!.map((markerPos, markerIndex) => (
                        <Marker
                            icon={markerIcon}
                            key={`marker-${index}-${markerIndex}`}
                            position={markerPos}
                        >
                            <Popup>
                                {item.title}
                                <br />
                                <br />
                                {item.message}
                            </Popup>
                        </Marker>
                    ));
                } else {
                    return item.polygon!.map((polygonPos, polygonIndex) => (
                        <Polygon
                            key={`polygon-${index}-${polygonIndex}`}
                            pathOptions={purpleOptions}
                            positions={polygonPos}
                        >
                            <Popup>
                                {item.title}
                                <br />
                                <br />
                                {item.message}
                            </Popup>
                        </Polygon>
                    ));
                }
            })}

            <Flyer location={location}></Flyer>

        </MapContainer>
    );
});

export default S124;