import { LatLngTuple } from "leaflet";

export const requestARP = async (start: LatLngTuple, end: LatLngTuple) : Promise<LatLngTuple[]> => {
  try {
    const arpUrl = process.env.REACT_APP_ARP_SERVICE_API as string;
    const uri = arpUrl + 
      `?start_latitude=${start[0]}` +
      `&start_longitude=${start[1]}` +
      `&end_latitude=${end[0]}` +
      `&end_longitude=${end[1]}`;

    console.log("send request to " + uri);
    
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(`${errorText.error}, CODE: ${errorText.error_code}`);
    } else {
      const routeData = await response.json();
      const destinations = routeData;

      return destinations.map((destination: { latitude: number; longitude: number }) => {
        const latitude = destination.latitude;
        const longitude = destination.longitude;
        return [latitude, longitude] as LatLngTuple;
      });
    }
  } catch (error) {
    throw error;
  }
};