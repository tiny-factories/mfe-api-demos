// data/dataSources.js

export const mockDataSources = [
  {
    id: "temp",
    name: "Temperature",
    data: [],
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [37.780079, -122.420174], // longitude, latitude
          },
          properties: {
            temperature: 22,
            timestamp: "2025-01-01",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [48.780079, -110.420174],
          },
          properties: {
            temperature: 23,
            timestamp: "2023-01-01",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [41.780079, -110.420174],
          },
          properties: {
            temperature: 23,
            timestamp: "2022-01-01",
          },
        },

        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [52.780079, -110.420174],
          },
          properties: {
            temperature: 23,
            timestamp: "2021-01-01",
          },
        },

        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [21.780079, -110.420174],
          },
          properties: {
            temperature: 23,
            timestamp: "2020-01-01",
          },
        },
      ],
    },
    active: true,
  },
];
