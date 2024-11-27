import { LatLngTuple } from "leaflet";

export const requestARP = async (start: LatLngTuple, end: LatLngTuple) : Promise<LatLngTuple[]> => {
  try {
    const uri = `/arpapi` + 
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
    }

    const data = await response.json();
    const destinations = data.destinations;

    return destinations.map((destination: { latitude: number; longitude: number }) => {
      const latitude = destination.latitude;
      const longitude = destination.longitude;
      return [latitude, longitude] as LatLngTuple;
    });
    
  } catch (error) {
    throw error;
  }
};

/*
      // 서버에 경로 계산 요청
      final response = await http.get(Uri.parse(uri));

      debugPrint('Response data: ${response.body}');

      if (response.statusCode == 200) {
        final Map<String, dynamic> decodedData = json.decode(response.body);
        final List<dynamic> destinations = decodedData['destinations'];
*/