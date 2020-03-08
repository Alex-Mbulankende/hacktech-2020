import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

import './style.less';

export const Map = () => {
  const mapRef = useRef();

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/layers/VectorTileLayer'], { css: true })
      .then(([ArcGISMap, MapView, Basemap, TileLayer, VectorTileLayer]) => {
        const basemap = new Basemap({
          portalItem: {
            id: "c70093e673dd417c8c57abfe900289f0"  // WGS84 Streets Vector webmap
          }
         });

        const map = new ArcGISMap({
          basemap: 'dark-gray'
        });

        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118, 34],
          zoom: 8
        });

        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
      });
    }
  );

  return <div className="map" ref={mapRef} />;
};

export default Map;
