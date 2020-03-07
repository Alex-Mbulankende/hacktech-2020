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
           baseLayers: [

             //*** ADD ***//
             new TileLayer({
               portalItem: {
                 id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
               }
             }),

             new VectorTileLayer({
               portalItem: {
                 id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
               },
               opacity: 0.5
             })
           ]
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
