import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple, Icon } from "leaflet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMap, TileLayer, useMapEvents, MapContainer, Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { Footer, Text, Box, CheckBox } from 'grommet';
import { parseS124, getMeanPosition } from "../util/s124Parser";
import { requestARP2 } from "../util/arp";
import S100Data from "../models/S100data";

export interface MapProp {
}

interface FlyerProps {
    location: LatLngTuple;
}

interface RouteState {
    isSelectingDestination: boolean;
    startPoint?: LatLngTuple;
    endPoint?: LatLngTuple;
    isCalculating: boolean;
}

const Flyer = ({ location }: FlyerProps) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(location, 17);
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

export const Map = forwardRef(({  }: MapProp, ref) => {
    // current location
    const [location, setLocation] = useState<LatLngTuple>([48.853534, 2.348099]);

    // S100 Sample
    const [data, setData] = useState<S100Data[]>([{
        type: 'polygon',
        marker: undefined, 
        polygon: [[[51.515, -0.09],
                [51.52, -0.1],
                [51.52, -0.12],],
                [[51.515, -0.09],
                [25.52, -0.1],
                [51.52, -0.4],]], 
        title: 'S100 test area', 
        message: 'simple test area'} as S100Data]);

    // ARP 관련
    const [isRoutingEnabled, setIsRoutingEnabled] = useState<boolean>(false);
    const [routeState, setRouteState] = useState<RouteState>({
        isSelectingDestination: false,
        isCalculating: false
    });
    const [footerMessage, setFooterMessage] = useState<string>('');
    const [tempLocationMarkers, setTempLocationMarkers] = useState<{
        start?: LatLngTuple;
        end?: LatLngTuple;
    }>({});
    const [routePolyline, setRoutePolyline] = useState<LatLngTuple[]>([]);

    // flyTo
    useImperativeHandle(ref, () => ({
        flyTo: (lat: number, lng: number) => setLocation([lat,lng] as LatLngTuple),
    }));
  
    const outerBounds: LatLngBoundsLiteral = [
        [50.505, -29.09],
        [52.505, 29.09],
    ]
  
    const multiPolyline: LatLngExpression[][] = [
        [[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]],
        [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]],
    ]

    const xmlData = "";

    /* Parse S124 XML data*/
    useEffect(() => {
        parseS124(xmlData).then((result) => {
            if (result === null) return;
            if (Array.isArray(result)) {
                setData([...data, ...result]);
            } else {
                setData([...data, result]);
            }
        });
    }, [xmlData]);

    /* Map click event handler, automatically called when map is clicked with ARP enabled */
    const MapClickEvents = ({ 
        routeState, 
        isRoutingEnabled,
        setRouteState, 
        setFooterMessage,
        setTempLocationMarkers,
        setRoutePolyline,
    }: {
        routeState: RouteState;
        isRoutingEnabled: boolean;
        setRouteState: (state: RouteState) => void;
        setFooterMessage: (message: string) => void;
        setTempLocationMarkers: (markers: { start?: LatLngTuple; end?: LatLngTuple; }) => void;
        setRoutePolyline: (polyline: LatLngTuple[]) => void;
    }) => {
        useMapEvents({
            click: async (event) => {
                if (!isRoutingEnabled) return;
            },
        });
        return null;
    };

    return (
        <div style={{ position: 'relative' }}>
            
            {/* leaflet map */}
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
                
                {/* Draw S124 data */}
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

                {/* Draw temporary markers for ARP src, dst*/}
                {tempLocationMarkers.start && (
                    <Marker 
                        position={tempLocationMarkers.start}
                    >
                        <Popup>Starting Point</Popup>
                    </Marker>
                )}
                {tempLocationMarkers.end && (
                    <Marker 
                        position={tempLocationMarkers.end}
                    >
                        <Popup>Destination Point</Popup>
                    </Marker>
                )}

                {/* Draw ARP route */}
                {routePolyline && (
                    <Polyline 
                        pathOptions={limeOptions} 
                        positions={routePolyline}
                    >
                    </Polyline>
                )}

                <Flyer location={location}></Flyer>

                <MapClickEvents 
                    routeState={routeState}
                    isRoutingEnabled={isRoutingEnabled}
                    setRouteState={setRouteState}
                    setFooterMessage={setFooterMessage}
                    setTempLocationMarkers={setTempLocationMarkers}
                    setRoutePolyline={setRoutePolyline}
                />  
            </MapContainer>

            {/* Footer for message */}
            {footerMessage && (
                <Footer
                    background="brand"
                    pad="small"
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000
                    }}
                >
                    <Text textAlign="center" size="medium">
                        {footerMessage}
                    </Text>
                </Footer>
            )}
        </div>
    );
});

export default Map;