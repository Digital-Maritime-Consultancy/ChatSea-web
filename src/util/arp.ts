import { LatLngTuple } from "leaflet";

interface RouteRequest {
  start: LatLngTuple;
  end: LatLngTuple;
}

export const requestARP = async (start: LatLngTuple, end: LatLngTuple) => {
  try {
    const uri = `http://133.186.159.251:60000` + 
      `?start_latitude=${start[0]}` +
      `&start_longitude=${start[1]}` +
      `&end_latitude=${end[0]}` +
      `&end_longitude=${end[1]}`;

    console.log("send request to " + uri);
    
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Route calculation failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};