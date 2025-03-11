import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const MapComponent = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = {
    map: true,
    layer: "raster",
    version: "3.0",
    libraries: ["polydraw"],
    plugins: ["direction"], // Required for routing
  };

  useEffect(() => {
    mapplsClassObject.initialize(
      "60de411c-e3a1-4003-857f-acd0146b79d1", // 🔹 Replace with your actual MapMyIndia API key
      loadObject,
      () => {
        const newMap = mapplsClassObject.Map({
          id: "map",
          properties: {
            center: [28.6139, 77.2090], // Center around Delhi
            zoom: 14,
          },
        });

        newMap.on("load", () => {
          setIsMapLoaded(true);

          // IIT Delhi & AIIMS Delhi Coordinates
          const iitDelhi = [28.5450, 77.1926];
          const aiimsDelhi = [28.5672, 77.2100];

          // Add markers
          new mapplsClassObject.Marker({ map: newMap, position: iitDelhi }).setPopup("IIT Delhi");
          new mapplsClassObject.Marker({ map: newMap, position: aiimsDelhi }).setPopup("AIIMS Delhi");

          // Use Direction Plugin to Draw Route
          mapplsPluginObject.direction({
            map: newMap,
            start: { label: "IIT Delhi", geoposition: iitDelhi.join(",") },
            end: { label: "AIIMS Delhi", geoposition: aiimsDelhi.join(",") },
            routeColor: "#008000", // Green color
            strokeWidth: 5,
          });
        });

        mapRef.current = newMap;
      }
    );

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "99vh" }}></div>;
};

export default MapComponent;
