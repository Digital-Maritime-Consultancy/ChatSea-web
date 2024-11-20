import { LatLngExpression, LatLngTuple } from "leaflet";

interface S100Data {
    type: string;
    marker: LatLngTuple | undefined;
    polygon: LatLngExpression[][] | undefined;
    message: string;
}

export default S100Data;