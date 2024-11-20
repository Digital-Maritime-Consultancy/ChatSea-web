import { XMLParser } from "fast-xml-parser";
import { LatLngExpression } from "leaflet";
import S100Data from "../models/S100data";

export const parseS124 = async (xmlData: string): Promise<S100Data[]> => {
    try {
        const parser = new XMLParser();
        const result = parser.parse(xmlData);
        console.log("Parsed XML:", result);
      } catch (error) {
        console.error("Error parsing XML:", error);
      }
    return [];
}