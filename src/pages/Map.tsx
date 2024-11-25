import { LatLngBoundsLiteral, LatLngExpression, LatLngTuple, Icon } from "leaflet";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMap, TileLayer, useMapEvents, MapContainer, Marker, Polygon, Polyline, Popup } from "react-leaflet";
import { Footer, Text, Box, CheckBox } from 'grommet';
import { parseS124, getMeanPosition } from "../util/s124Parser";
import { requestARP } from "../util/arp";
import S100Data from "../models/S100data";

export interface MapProp {
}

interface FlyerProps {
    location: LatLngTuple;
}

interface RouteState {
    isPlanning: boolean;
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

const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple', fillColor: 'blue' }
const markerIcon = new Icon({
    iconUrl: '/NavigatoinalWarningFeaturePart.svg', 
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5]
});

export const Map = forwardRef(({  }: MapProp, ref) => {
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
    const [location, setLocation] = useState<LatLngTuple>([48.853534, 2.348099]);
    const [tempMarkers, setTempMarkers] = useState<{
        start?: LatLngTuple;
        end?: LatLngTuple;
    }>({});

    // ARP 관련
    const [isRoutingEnabled, setIsRoutingEnabled] = useState<boolean>(false);
    const [routeState, setRouteState] = useState<RouteState>({
        isPlanning: false,
        isSelectingDestination: false,
        isCalculating: false
    });
    const [footerMessage, setFooterMessage] = useState<string>('');

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

    const xmlData = `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<S124:Dataset xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:S124="http://www.iho.int/S124/1.0" xmlns:S100="http://www.iho.int/s100gml/5.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.iho.int/S124/gml/1.0 ./S100Defs/S124.xsd" gml:id="NW.CA.CCG.A.0259.24">
    <S100:DatasetIdentificationInformation>
        <S100:encodingSpecification>S-100 Part 10b</S100:encodingSpecification>
        <S100:encodingSpecificationEdition>1.0</S100:encodingSpecificationEdition>
        <S100:productIdentifier>S-124</S100:productIdentifier>
        <S100:productEdition>1.0.0</S100:productEdition>
        <S100:applicationProfile>Active NAVWARNs</S100:applicationProfile>
        <S100:datasetFileIdentifier>124CAA_0259_24.XML</S100:datasetFileIdentifier>
        <S100:datasetTitle>Obstruction</S100:datasetTitle>
        <S100:datasetReferenceDate>2024-09-19</S100:datasetReferenceDate>
        <S100:datasetLanguage>eng</S100:datasetLanguage>
        <S100:datasetAbstract>The abstract of the dataset</S100:datasetAbstract>
        <S100:datasetTopicCategory>oceans</S100:datasetTopicCategory>
        <S100:datasetPurpose>base</S100:datasetPurpose>
        <S100:updateNumber>0</S100:updateNumber>
    </S100:DatasetIdentificationInformation>
    <S124:members>
        <S124:NAVWARNPreamble gml:id="NW.CA.CCG.A.0259.24.0">
            <S124:affectedChartPublications>
                <S124:chartAffected>
                    <S124:chartNumber>7565</S124:chartNumber>
                    <S124:editionDate>2022-06-19</S124:editionDate>
                </S124:chartAffected>
                <S124:language>eng</S124:language>
                <S124:publicationAffected>Clyde Inlet to/à Cape Jameson</S124:publicationAffected>
            </S124:affectedChartPublications>
            <S124:affectedChartPublications>
                <S124:chartAffected>
                    <S124:chartNumber>7566</S124:chartNumber>
                    <S124:editionDate>2022-06-19</S124:editionDate>
                </S124:chartAffected>
                <S124:language>eng</S124:language>
                <S124:publicationAffected>Cape Jameson to/au Cape Fanshawe</S124:publicationAffected>
            </S124:affectedChartPublications>
            <S124:affectedChartPublications>
                <S124:chartAffected>
                    <S124:chartNumber>7220</S124:chartNumber>
                    <S124:editionDate>2021-08-12</S124:editionDate>
                </S124:chartAffected>
                <S124:language>eng</S124:language>
                <S124:publicationAffected>Lancaster Sound, Eastern Approaches/Approches Est</S124:publicationAffected>
            </S124:affectedChartPublications>
            <S124:affectedChartPublications>
                <S124:chartAffected>
                    <S124:chartNumber>7010</S124:chartNumber>
                    <S124:editionDate>2023-03-17</S124:editionDate>
                </S124:chartAffected>
                <S124:language>eng</S124:language>
                <S124:publicationAffected>Davis Strait and/et Baffin Bay</S124:publicationAffected>
            </S124:affectedChartPublications>
            <S124:generalArea>
                <S124:locationName>
                    <S124:language>eng</S124:language>
                    <S124:text>Arctic</S124:text>
                </S124:locationName>
            </S124:generalArea>
            <S124:generalArea>
                <S124:locationName>
                    <S124:language>eng</S124:language>
                    <S124:text>Shipping Safety Control Zone 9</S124:text>
                </S124:locationName>
            </S124:generalArea>
            <S124:generalArea>
                <S124:locationName>
                    <S124:language>eng</S124:language>
                    <S124:text>Shipping Safety Control Zone 13</S124:text>
                </S124:locationName>
            </S124:generalArea>
            <S124:messageSeriesIdentifier>
                <S124:agencyResponsibleForProduction>Canadian Coast Guard</S124:agencyResponsibleForProduction>
                <S124:countryName>Canada</S124:countryName>
                <S124:nameOfSeries>A</S124:nameOfSeries>
                <S124:warningIdentifier>urn:mrn:NW.CA.CCG.A.0259.24</S124:warningIdentifier>
                <S124:warningNumber>259</S124:warningNumber>
                <S124:warningType code="1">Local Navigational Warning</S124:warningType>
                <S124:year>2024</S124:year>
            </S124:messageSeriesIdentifier>
            <S124:nAVWARNTitle>
                <S124:language>eng</S124:language>
                <S124:text>Obstruction</S124:text>
            </S124:nAVWARNTitle>
            <S124:intService>true</S124:intService>
            <S124:navwarnTypeGeneral code="15">Scientific Instruments Change</S124:navwarnTypeGeneral>
            <S124:publicationTime>2024-09-19T12:46:55.476</S124:publicationTime>
            <S124:theReferences xlink:href="#NW.CA.CCG.A.0259.24.1"/>
            <S124:theReferences xlink:href="#NW.CA.CCG.A.0259.24.2"/>
        </S124:NAVWARNPreamble>
        <S124:References gml:id="NW.CA.CCG.A.0259.24.1">
            <S124:messageSeriesIdentifier>
                <S124:agencyResponsibleForProduction>Canadian Coast Guard</S124:agencyResponsibleForProduction>
                <S124:countryName>Canada</S124:countryName>
                <S124:nameOfSeries>A</S124:nameOfSeries>
                <S124:warningIdentifier>urn:mrn:NW.CA.CCG.A.0257.24</S124:warningIdentifier>
                <S124:warningNumber>2024</S124:warningNumber>
                <S124:warningType code="1">Local Navigational Warning</S124:warningType>
                <S124:year>2024</S124:year>
            </S124:messageSeriesIdentifier>
            <S124:noMessageOnHand>false</S124:noMessageOnHand>
            <S124:referenceCategory code="1">Warning Cancellation</S124:referenceCategory>
        </S124:References>
        <S124:NAVWARNPart gml:id="NW.CA.CCG.A.0259.24.2">
            <S124:fixedDateRange>
                <S124:dateStart>
                    <S100:date>2024-09-19</S100:date>
                </S124:dateStart>
            </S124:fixedDateRange>
            <S124:warningInformation>
                <S124:information>
                    <S124:language>eng</S124:language>
                    <S124:text>Subsurface scientific moorings deployed in the following positions and depths, approximately 1m off the ocean floor :
72 09.439N 070 06.339 W, depth of 1756m&lt;br /&gt;72 25.027N 069 17.227 W, depth of 2008m&lt;br /&gt;72 40.294N 068 27.024 W, depth of 2235m&lt;br /&gt;72 55.413N 067 34.984 W, depth of 2352m&lt;br /&gt;73 10.307N 066 41.713 W, depth of 2398m&lt;br /&gt;72 24.251N 070 57.899 W, depth of 1400m&lt;br /&gt;72 39.885N 070 08.990 W, depth of 1770m&lt;br /&gt;72 55.539N 069 18.832 W, depth of 1971m&lt;br /&gt;73 10.753N 068 27.109 W, depth of 2218m&lt;br /&gt;73 25.917N 067 33.946 W, depth of 2328m&lt;br /&gt;72 38.705N 071 50.916 W, depth of 1086m&lt;br /&gt;72 54.572N 071 02.331 W, depth of 1378m&lt;br /&gt;73 10.324N 070 12.288 W, depth of 1667m&lt;br /&gt;73 25.828N 069 19.906 W, depth of 1937m&lt;br /&gt;73 40.213N 068 29.542 W, depth of 2124m&lt;br /&gt;72 52.797N 072 45.919 W, depth of 881m&lt;br /&gt;73 08.977N 071 56.839 W, depth of 1169m&lt;br /&gt;73 25.096N 071 06.514 W, depth of 1235m&lt;br /&gt;73 40.667N 070 14.891 W, depth of 1587m&lt;br /&gt;73 54.536N 069 27.848 W, depth of 1800m&lt;br /&gt;73 23.343N 072 53.005 W, depth of 945m&lt;br /&gt;73 39.402N 072 02.724 W, depth of 1095m&lt;br /&gt;73 55.389N 071 11.484 W, depth of 1165m&lt;br /&gt;74 08.767N 070 26.031 W, depth of 1513m&lt;br /&gt;73 37.262N 073 50.651 W, depth of 902m&lt;br /&gt;73 53.535N 073 00.620 W, depth of 867m&lt;br /&gt;74 09.699N 072 09.394 W, depth of 997m&lt;br /&gt;74 22.685N 071 26.294 W, depth of 1206m
These moorings will remain deployed for at least one year.</S124:text>
                </S124:information>
                <S124:navwarnTypeDetails code="242">Scientific Moorings</S124:navwarnTypeDetails>
            </S124:warningInformation>
            <S124:header xlink:href="#NW.CA.CCG.A.0259.24.0"/>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.0" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.105650 72.157317</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.1" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-69.287117 72.417117</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.2" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-68.450400 72.671567</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.3" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-67.583067 72.923550</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.4" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-66.695217 73.171783</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.5" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.964983 72.404183</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.6" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.149833 72.664750</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.7" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-69.313867 72.925650</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.8" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-68.451817 73.179217</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.9" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-67.565767 73.431950</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.10" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.848600 72.645083</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.11" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.038850 72.909533</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.12" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.204800 73.172067</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.13" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-69.331767 73.430467</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.14" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-68.492367 73.670217</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.15" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-72.765317 72.879950</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.16" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.947317 73.149617</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.17" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.108567 73.418267</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.18" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.248183 73.677783</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.19" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-69.464133 73.908933</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.20" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-72.883417 73.389050</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.21" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-72.045400 73.656700</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.22" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.191400 73.923150</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.23" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-70.433850 74.146117</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.24" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-73.844183 73.621033</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.25" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-73.010333 73.892250</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.26" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-72.156567 74.161650</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
            <S124:geometry>
                <S100:pointProperty>
                    <S100:Point gml:id="NW.CA.CCG.A.0259.24.location.27" srsName="urn:ogc:def:crs:EPSG::4326" srsDimension="2">
                        <gml:pos srsName="EPSG::4326" srsDimension="2">-71.438233 74.378083</gml:pos>
                    </S100:Point>
                </S100:pointProperty>
            </S124:geometry>
        </S124:NAVWARNPart>
    </S124:members>
</S124:Dataset>

    `;

    /* Parse S124 XML data, automatically called when xmlData is updated */
    useEffect(() => {
        parseS124(xmlData).then((result) => {
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
        setRouteState, 
        setFooterMessage,
        isRoutingEnabled,
        setTempMarkers
    }: {
        routeState: RouteState;
        setRouteState: (state: RouteState) => void;
        setFooterMessage: (message: string) => void;
        isRoutingEnabled: boolean;
        setTempMarkers: (markers: { start?: LatLngTuple; end?: LatLngTuple; }) => void;
    }) => {
        useMapEvents({
            click: async (event) => {
                if (!isRoutingEnabled) return;

                const clickedPoint: LatLngTuple = [event.latlng.lat, event.latlng.lng];
        
                if (!routeState.isPlanning) {
                    if (window.confirm('Start Automatic Route Planning from this location?')) {
                        setRouteState({
                            ...routeState,
                            isPlanning: true,
                            isSelectingDestination: true,
                            startPoint: clickedPoint
                        });
                        setTempMarkers({ start: clickedPoint });
                        setFooterMessage('Choose a destination');
                    }
                } else if (routeState.isSelectingDestination) {
                    if (window.confirm('Make this location as destination?')) {
                        setRouteState({
                            ...routeState,
                            isSelectingDestination: false,
                            isCalculating: true,
                            endPoint: clickedPoint
                        });
                        setTempMarkers({ ...tempMarkers, end: clickedPoint });
                        setFooterMessage('Calculating route...');
                            
                        try {
                            const routeData = await requestARP(routeState.startPoint!, clickedPoint);
                            setFooterMessage('Route calculated');
                        } catch (error) {
                            setFooterMessage('[!] Error calculating route');
                            setIsRoutingEnabled(false);
                            setTempMarkers({});
                        } finally {
                            setRouteState({
                                ...routeState,
                                isCalculating: false
                            });
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
                    checked={isRoutingEnabled}
                    onChange={(e) => {
                        setIsRoutingEnabled(!isRoutingEnabled);
                        if (!isRoutingEnabled) {
                            setFooterMessage('Route planning is enabled. Choose a starting point.');
                        } else {
                            setFooterMessage('');
                            setRouteState({
                                isPlanning: false,
                                isSelectingDestination: false,
                                isCalculating: false
                            });
                            setTempMarkers({});
                        }
                    }}
                    label={"Automatic Route Planning"}
                />
            </Box>
            
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

                {tempMarkers.start && (
                    <Marker 
                        position={tempMarkers.start}
                    >
                        <Popup>Starting Point</Popup>
                    </Marker>
                )}
                {tempMarkers.end && (
                    <Marker 
                        position={tempMarkers.end}
                    >
                        <Popup>Destination Point</Popup>
                    </Marker>
                )}

                <Flyer location={location}></Flyer>

                <MapClickEvents 
                    routeState={routeState}
                    setRouteState={setRouteState}
                    setFooterMessage={setFooterMessage}
                    isRoutingEnabled={isRoutingEnabled}
                    setTempMarkers={setTempMarkers}
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