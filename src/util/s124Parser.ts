import { XMLParser } from "fast-xml-parser";
import { LatLngTuple } from "leaflet";
import S100Data from "../models/S100data";

export const parseS124 = async (xmlString: string): Promise<S100Data | null> => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      removeNSPrefix: true
    });
    const jsonParsedS124 = parser.parse(xmlString);

    if (!ValidateS124Data(jsonParsedS124))
      throw new Error('S124 Data is not valid');
    
    const members = jsonParsedS124.Dataset.members; 
    
    // 타이틀과 메시지 처리
    const typeTitle = members.NAVWARNPreamble?.nAVWARNTitle?.text || "No Title";
    const textContent = removeHtmlTags(members.NAVWARNPart.warningInformation?.information?.text || "No Message");
    
    // 좌표 담을 배열
    const parsed_polygons: LatLngTuple[][] = [];
    const parsed_markers: LatLngTuple[] = [];
    
    // 좌표 처리
    if (members.NAVWARNPart.geometry) {
      const geometry = Array.isArray(members.NAVWARNPart.geometry) 
        ? members.NAVWARNPart.geometry 
        : [members.NAVWARNPart.geometry];
        
      geometry.forEach((geo: { surfaceProperty: any; pointProperty: any; }) => {
        if (geo.surfaceProperty) {
          parsed_polygons.push(...GetPolygonsPositions(geo.surfaceProperty));
        }
        if (geo.pointProperty) {
          parsed_markers.push(...GetMarkersPositions(geo.pointProperty));
        }
      });
    }

    // 좌표 없으면 에러
    if (parsed_polygons.length === 0 && parsed_markers.length === 0) 
      throw new Error('Nothing to draw');
    

    // S100Data로 반환
    return {
      type: parsed_polygons.length === 0 ? "marker" : "polygon",
      marker: parsed_markers,
      polygon: parsed_polygons,
      title: typeTitle,
      message: textContent
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getMeanPosition = (positions: LatLngTuple[]): LatLngTuple => {
  const meanLat = positions.reduce((sum, pos) => sum + pos[0], 0) / positions.length;
  const meanLng = positions.reduce((sum, pos) => sum + pos[1], 0) / positions.length;
  return [meanLat, meanLng];
}


// 폴리곤 좌표 처리
const GetPolygonsPositions = (surfaceProperty: any): LatLngTuple[][] => {
  const polygons: LatLngTuple[][] = [];
  
  // Surface 배열 처리
  const surfaces = Array.isArray(surfaceProperty.Surface) 
    ? surfaceProperty.Surface 
    : [surfaceProperty.Surface];

  surfaces.forEach((surface: { patches: any; }) => {
    const posList = surface?.patches?.PolygonPatch?.exterior?.LinearRing?.posList?.['#text'];
    if (!posList) return;
    
    const positions = posList.split(' ').map(Number);
    const singlePolygon: LatLngTuple[] = [];
    
    for (let i = 0; i < positions.length - 1; i += 2) {
      singlePolygon.push([
        positions[i + 1],  // latitude
        positions[i]       // longitude
      ]);
    }
    
    polygons.push(singlePolygon);
  });

  return polygons;
} 


const GetMarkersPositions = (pointProperty: any): LatLngTuple[] => {
  const markers: LatLngTuple[] = [];
  
  const points = Array.isArray(pointProperty.Point) 
    ? pointProperty.Point 
    : [pointProperty.Point];
  
  points.forEach((point: { pos: { [x: string]: any; }; }) => {
    const posValue = point?.pos?.['#text'];
      
    if (!posValue) return;
    
    const [lon, lat] = posValue.split(' ').map(Number);
    markers.push([lat, lon]);
  });

  return markers;
}

const ValidateS124Data = (jsonParsedS124: any): boolean => {
  if (!jsonParsedS124.Dataset) return false;
  if (!jsonParsedS124.Dataset.members) return false;
  if (!jsonParsedS124.Dataset.members.NAVWARNPart) return false;
  if (!jsonParsedS124.Dataset.members.NAVWARNPreamble) return false;
  return true;  
}


const removeHtmlTags = (htmlString: string): string => {
  return htmlString.replace(/<[^>]*>/g, '');
};