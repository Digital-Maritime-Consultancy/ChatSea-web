import { LatLngExpression, LatLngTuple } from "leaflet";

interface S100Data {
    type: string;
    marker: LatLngTuple[] | undefined;
    polygon: LatLngTuple[][] | undefined;
    title: string;
    message: string;
}

export default S100Data;