import { LatLngTuple } from "leaflet";

interface ARPResponse {
  coordinates: LatLngTuple[];
  elapsedTime: number;
}

export const requestARP = async (start: LatLngTuple, end: LatLngTuple, token : string) : Promise<ARPResponse> => {
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
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(`${errorText.error}, CODE: ${errorText.error_code}`);
    } else {
      const routeData = await response.json();
      const destinations = routeData.coordinates.map((coordinate: { latitude: number; longitude: number }) => {
        return [coordinate.latitude, coordinate.longitude] as LatLngTuple;
      });

      const elapsedTime = routeData.elapsedTime;

      return { coordinates: destinations, elapsedTime};
    }
  } catch (error) {
    throw error;
  }
};

export const requestARP2 = async (start: LatLngTuple, end: LatLngTuple) : Promise<ARPResponse> => {
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
      const destinations = routeData.coordinates.map((coordinate: { latitude: number; longitude: number }) => {
        return [coordinate.latitude, coordinate.longitude] as LatLngTuple;
      });

      const elapsedTime = routeData.elapsedTime;

      return { coordinates: destinations, elapsedTime};
    }
  } catch (error) {
    throw error;
  }
};