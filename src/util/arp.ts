import { LatLngTuple } from "leaflet";

interface RouteRequest {
  start: LatLngTuple;
  end: LatLngTuple;
}

export const requestARP = async (start: LatLngTuple, end: LatLngTuple) => {
  try {
    const response = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start,
        end
      }),
    });
    
    if (!response.ok) {
      throw new Error('Route calculation failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};