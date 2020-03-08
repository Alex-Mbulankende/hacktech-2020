import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

import './style.less';

const getFeatures = (dataArray) => {
  if ( !dataArray ) {
    return null;
  }
  let list = [];
  for(let i = 0; i < dataArray.length;i++ ) {
    const feature = dataArray[i]
    list.push({
      geometry: {
        type: "point",
        x: feature.lng,
        y: feature.lat
      },
      attributes: {
        ObjectID: i,
        DepArpt: "Idk what this is",
        MsgTime: Date.now(),
        FltId: "Fever1"
      }
    })
  }
  return list;
}

export const Map = props => {
  const mapRef = useRef();

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/FeatureLayer', 'esri/layers/support/Field'], { css: true })
      .then(([ArcGISMap, MapView, Basemap, FeatureLayer, Field]) => {
        const masksFeatures = [{
          geometry: {
            type: "point",
            x: -120,
            y: 35
          },
          attributes: {
            ObjectID: 2,
            DepArpt: "agagag",
            MsgTime: Date.now(),
            FltId: "Fever1"
          }}, {
          geometry: {
            type: "point",
            x: -117.239140,
            y: 32.959770
          },
          attributes: {
            ObjectID: 3,
            DepArpt: "WKRP",
            MsgTime: Date.now(),
            FltId: "Fever1"
          }}];
        const handSanitizerFeatures = getFeatures(props.handSanitizer);
        const campingFeatures = getFeatures(props.camping);
        const medicineFeatures = getFeatures(props.medicineFeatures);

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

        const masksLayer = new FeatureLayer({
          source: masksFeatures,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: 'hello'
          }
        });

        masksLayer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "red",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "red"
            }
          }
        };

        const handSanitizerLayer = new FeatureLayer({
          source: handSanitizerFeatures,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: 'hello'
          }
        });

        handSanitizerLayer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "yellow",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "yellow"
            }
          }
        };

        const campingLayer = new FeatureLayer({
          source: campingFeatures,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: 'hello'
          }
        });

        campingLayer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "green",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "green"
            }
          }
        };

        const medicineLayer = new FeatureLayer({
          source: medicineFeatures,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: 'hello'
          }
        });

        medicineLayer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "blue",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "blue"
            }
          }
        };

        map.add(masksLayer, 0);
        map.add(handSanitizerLayer, 0);
        map.add(campingLayer, 0);
        map.add(medicineLayer, 0);

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
      }, []);
    }
  );

  return <div className="map" ref={mapRef} />;
};

export default Map;
