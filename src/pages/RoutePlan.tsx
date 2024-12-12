import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple, Icon } from "leaflet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMap, TileLayer, useMapEvents, MapContainer, Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { Footer, Text, Box, CheckBox, Spinner } from 'grommet';
import { parseS124, getMeanPosition } from "../util/s124Parser";
import { requestARP } from "../util/arp";
import S100Data from "../models/S100data";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { Configuration, MyUserControllerApi, UserServiceUsageDto } from "../backend-api/saas-management";
import { BASE_PATH } from "../backend-api/saas-management/base";
import useKeycloak from "../hooks/useKeycloak";
import { getOrgServiceUsage, getServiceCostLimit } from "../util/saasAPICaller";

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
        map.flyTo(location);
    }, [location]);
    return <></>;
};

const lineOptions = { color: 'red' }
const purpleOptions = { color: 'purple', fillColor: 'blue' }
const markerIcon = new Icon({
    iconUrl: '/NavigatoinalWarningFeaturePart.svg', 
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5]
});

export const RoutePlan = forwardRef(({  }: MapProp, ref) => {
    const { keycloak, authenticated, token, mrn, orgMrn } = useKeycloak();
    const [ myService, setMyService ] = useState<MyUserControllerApi | undefined>(undefined);
    const [ costLimit, setCostLimit ] = useState<number>(0);

    useEffect(() => {
        if (!authenticated) return;

        const apiConfig: Configuration = {
            basePath: BASE_PATH,
            baseOptions: {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            },
        };
        const userService = new MyUserControllerApi(apiConfig);
        setMyService(userService);

        getServiceCostLimit(keycloak!, token, orgMrn).then(
            (limit) => {
                console.log(limit);
                setCostLimit(limit);
            }
        );
        getOrgServiceUsage(keycloak!, token, orgMrn).then(
            (usage) => {
                console.log(usage);
            }
        );
    }, [authenticated]);
    // current location
    const [location, setLocation] = useState<LatLngTuple>([34.922702, 128.567756]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // S100 Sample
    const [data, setData] = useState<S100Data[]>([]);

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

                const clickedPoint: LatLngTuple = [event.latlng.lat, event.latlng.lng];
        
                if (!routeState.isSelectingDestination) {
                    // Select Source point
                    if (window.confirm('Start Automatic Route Planning from this location?')) {
                        setRouteState({
                            ...routeState,
                            isSelectingDestination: true,
                            startPoint: clickedPoint
                        });
                        setTempLocationMarkers({ start: clickedPoint });
                        setFooterMessage('Choose a destination');
                    }
                } else {
                    // Select Destination point & Request ARP to API
                    if (window.confirm('Make this location as destination?')) {
                        setRouteState({
                            ...routeState,
                            isSelectingDestination: false,
                            isCalculating: true,
                            endPoint: clickedPoint
                        });
                        setTempLocationMarkers({ ...tempLocationMarkers, end: clickedPoint });
                        setFooterMessage('Calculating route...');
                        setIsLoading(true);
                        try {
                            const routeData = await requestARP(routeState.startPoint!, clickedPoint, token);
                            setRoutePolyline(routeData.coordinates);
                            setFooterMessage('Route calculated');
                            setIsLoading(false);
                            const apiConfig: Configuration = {
                                basePath: BASE_PATH,
                                baseOptions: {
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                    },
                                },
                            };
                            const userService = new MyUserControllerApi(apiConfig);
                            userService.registerServiceUsage({serviceId: 7, usageAmount: routeData.elapsedTime} as UserServiceUsageDto);

                        } catch (error) {
                            setFooterMessage('[!] Error calculating route : ' + error);
                        } finally {
                            setIsRoutingEnabled(false);
                            setTempLocationMarkers({});
                            setRouteState({
                                ...routeState,
                                isSelectingDestination: false,
                                isCalculating: false
                            });
                            setIsLoading(false);
                        }
                    }
                }
            },
        });
        return null;
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* ARP enable box */}
            <Box
                background="brand"
                pad="small"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000
                }}
            >
                <CheckBox
                    label={"Start Route Planning"}
                    checked={isRoutingEnabled}
                    onChange={() => {
                        if (!isRoutingEnabled) {
                            setFooterMessage('Route planning is enabled. Choose a starting point.');
                        } else {
                            setFooterMessage('');
                            setRouteState({
                                ...routeState,
                                isSelectingDestination: false,
                                isCalculating: false
                            });
                            setTempLocationMarkers({});
                        }
                        setIsRoutingEnabled(!isRoutingEnabled);
                    }}
                />
            </Box>
            { isLoading &&
                <FullScreenSpinner />
            }
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
                        pathOptions={lineOptions} 
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

export default RoutePlan;