import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

import './style.less';

const getFeatures = (dataArray) => {
  // console.log('wtf');
  // console.log(dataArray);
  if ( !dataArray ) {
    return null;
  }
  let list = [];
  for(let i = 0; i < dataArray.length;i++ ) {
    const feature = dataArray[i]
    if (feature.lng && feature.lat) {
      list.push({
        geometry: {
          type: "point",
          x: feature.lng,
          y: feature.lat
        },
        attributes: {
          ObjectID: i,
          MsgTime: Date.now(),
          title: feature.title,
          description: feature.description,
          image: feature.picture_url,
          url: feature.url
        }
      })
    }
  }
  return list;
}

export const Map = props => {
  const mapRef = useRef();

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/PopupTemplate'], { css: true })
      .then(([ArcGISMap, MapView, Basemap, FeatureLayer, Field, PpupTemplate]) => {
        // console.log('hi world');
        // console.log(props);

        const masksFeatures = getFeatures(props.masks);
        const handSanitizerFeatures = getFeatures(props.handSanitizer);
        const campingFeatures = getFeatures(props.camping);
        const medicineFeatures = getFeatures(props.medicine);

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
         }), new Field ({
           name: "image",
           alias: "Image",
           type: "string"
         }), new Field ({
           name: "url",
           alias: "Url",
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

        // console.log('AIGHIAGBIAOBFIB')
        // console.log(masksFeatures);

        const masksLayer = new FeatureLayer({
          source: masksFeatures,
          fields: fields,
          objectIdField: "ObjectID",  // field name of the Object IDs
          geometryType: "point",
          popupTemplate: {
            title: '{title}',
            content: '<a href={url} target="_blank"><img src={image} className="layer"/> {description}</a>'
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
            title: '{title}',
            content: '<a href={url} target="_blank"><img src={image} className="layer"/> {description}</a>'
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
            title: '{title}',
            content: '<a href={url} target="_blank"><img src={image} className="layer"/> {description}</a>'
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
            title: '{title}',
            content: '<a href={url} target="_blank"><img src={image} className="layer"/> {description}</a>'
          }
        });

        medicineLayer.renderer = {
          type: "simple",  // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "#81cd6e",
            outline: {  // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: "#81cd6e"
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
          center: [-121.905576, 37.395009],
          zoom: 17,
          rotate: 40
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
