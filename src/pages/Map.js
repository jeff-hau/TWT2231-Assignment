import React, { useEffect, useState } from "react";
import "../styles/Map.css";

function loadBingMapsScript() {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src^="https://www.bing.com/api/maps/mapcontrol"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.bing.com/api/maps/mapcontrol?callback=initBingMap&key=AqXTRHuA7XfodQdpVaW5H5L3PG4y8TFpLSHSpy0ykMs6K2ZUlBI6glf6OVS6Vrgn";
      script.async = true;
      script.defer = true;
      window.initBingMap = () => {
        resolve(window.Microsoft);
      };
      script.onerror = (error) => {
        reject(new Error(`Error loading Bing Maps script: ${error.message}`));
      };
      document.head.appendChild(script);
    } else {
      resolve(window.Microsoft);
    }
  });
}

function Map() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    loadBingMapsScript()
      .then((Microsoft) => {
        if (isMounted) {
          setIsScriptLoaded(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error loading Bing Maps script:", error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false; 
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && window.Microsoft && window.Microsoft.Maps) {
      try {
        const map = new window.Microsoft.Maps.Map(document.getElementById("map"), {
          center: new window.Microsoft.Maps.Location(8.155883, 108.036910),
          zoom: 5,
        });

        const options = {
          uriConstructor:
            "https://tiles.aqicn.org/tiles/usepa-aqi/{zoom}/{x}/{y}.png?token=c4dcce1dfc2a285f2625860c4b1a33a99623a655",
          minZoom: 1,
          maxZoom: 15,
        };
        const waqiTileSource = new window.Microsoft.Maps.TileSource(options);
        const waqiTilelayer = new window.Microsoft.Maps.TileLayer({ mercator: waqiTileSource });
        map.layers.insert(waqiTilelayer);
      } catch (error) {
        console.error("Error initializing the map:", error);
      }
    }
  }, [isScriptLoaded]);

  return (
    <div className="map-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div id="map" className="map"></div>
      )}
    </div>
  );
  
}

export default Map;
