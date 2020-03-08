import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

import './style.less';

export const Map = () => {
  const mapRef = useRef();

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/FeatureLayer', 'esri/layers/support/Field'], { css: true })
      .then(([ArcGISMap, MapView, Basemap, FeatureLayer, Field]) => {
        const features = [
        ]

        const fields = [
         new Field({
           name: "ObjectID",
           alias: "ObjectID",
           type: "oid"
         }), new Field({
           name: "description",
           alias: "Description",
           type: "string"
         }), new Field ({
           name: "title",
           alias: "Title",
           type: "string"
         })
        ];

        const basemap = new Basemap({
          portalItem: {
            id: "c70093e673dd417c8c57abfe900289f0"  // WGS84 Streets Vector webmap
          }
         });

        const map = new ArcGISMap({
          basemap: 'dark-gray'
        });

        const layer = new FeatureLayer({
          source: features,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: 'hello'
          }
        });

        layer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "black",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "white"
            }
          }
        };

        map.add(layer, 0);

        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118, 34],
          zoom: 8
        });

        const newField = [{
         geometry: {
           type: "point",
           x: -120,
           y: 40
         },
         attributes: {
           ObjectID: 3,
           DepArpt: "WKRP",
           MsgTime: Date.now(),
           FltId: "Fever1"
         }
       }]

       layer.applyEdits({
         addFeatures: newField
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
