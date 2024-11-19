import { XMLParser } from "fast-xml-parser";
import { LatLngExpression } from "leaflet";

export const parseS124 = async (xmlData: string): Promise<LatLngExpression[][]> => {
    try {
        const parser = new XMLParser();
        const result = parser.parse(xmlData);
        console.log("Parsed XML:", result);
      } catch (error) {
        console.error("Error parsing XML:", error);
      }
    return [];
}