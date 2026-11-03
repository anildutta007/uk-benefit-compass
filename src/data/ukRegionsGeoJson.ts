// GeoJSON representation of the 12 UK ITL-1 / Government Office Regions
// Coordinates: [longitude, latitude] in WGS84

export interface UKGeoFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    center: [number, number]; // [lat, lng]
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface UKGeoJson {
  type: "FeatureCollection";
  features: UKGeoFeature[];
}

export const UK_REGIONS_GEOJSON: UKGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "Scotland",
        name: "Scotland",
        center: [56.4907, -4.2026]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-5.2, 55.0], [-5.8, 55.5], [-6.4, 56.4], [-6.1, 57.0], [-5.6, 58.6],
          [-3.0, 58.7], [-1.8, 57.6], [-2.1, 57.1], [-2.6, 56.3], [-3.2, 56.0],
          [-2.0, 55.8], [-2.2, 55.0], [-3.6, 55.1], [-4.9, 54.8], [-5.2, 55.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "Northern Ireland",
        name: "Northern Ireland",
        center: [54.7877, -6.4923]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-5.5, 54.4], [-5.6, 54.7], [-6.0, 55.2], [-6.9, 55.2], [-7.4, 55.0],
          [-8.2, 54.5], [-7.7, 54.1], [-6.5, 54.0], [-5.8, 54.2], [-5.5, 54.4]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "North East",
        name: "North East",
        center: [55.1, -1.8]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-2.2, 55.8], [-1.5, 55.8], [-1.1, 54.7], [-1.2, 54.5], [-2.2, 54.4],
          [-2.6, 55.1], [-2.2, 55.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "North West",
        name: "North West",
        center: [53.9, -2.6]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-3.6, 54.8], [-2.6, 55.1], [-2.2, 54.4], [-2.0, 53.4], [-2.2, 53.0],
          [-3.1, 53.3], [-3.1, 54.1], [-3.6, 54.4], [-3.6, 54.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "Yorkshire and The Humber",
        name: "Yorkshire and The Humber",
        center: [53.9, -1.1]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-2.2, 54.4], [-1.2, 54.5], [-0.1, 54.1], [0.1, 53.6], [-0.7, 53.6],
          [-1.3, 53.3], [-1.9, 53.4], [-2.0, 53.7], [-2.2, 54.4]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "East Midlands",
        name: "East Midlands",
        center: [52.9, -0.9]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-1.9, 53.4], [-1.3, 53.3], [-0.7, 53.6], [0.3, 53.1], [0.0, 52.7],
          [-0.7, 52.1], [-1.4, 52.3], [-1.9, 52.8], [-1.9, 53.4]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "West Midlands",
        name: "West Midlands",
        center: [52.5, -2.1]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-3.0, 52.9], [-2.2, 53.0], [-1.9, 52.8], [-1.4, 52.3], [-1.8, 51.9],
          [-2.6, 51.9], [-3.1, 52.2], [-3.0, 52.9]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "Wales",
        name: "Wales",
        center: [52.1307, -3.7837]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-3.1, 53.3], [-3.0, 52.9], [-3.1, 52.2], [-2.6, 51.9], [-2.7, 51.5],
          [-3.6, 51.4], [-5.2, 51.7], [-5.3, 52.1], [-4.7, 52.9], [-4.7, 53.4],
          [-3.5, 53.3], [-3.1, 53.3]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "East of England",
        name: "East of England",
        center: [52.2, 0.4]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [0.0, 52.7], [0.4, 53.0], [1.7, 52.9], [1.8, 52.5], [1.3, 51.9],
          [0.6, 51.5], [0.1, 51.6], [-0.7, 52.1], [0.0, 52.7]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "London",
        name: "London",
        center: [51.5074, -0.1278]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-0.5, 51.6], [0.1, 51.6], [0.3, 51.5], [0.2, 51.3], [-0.2, 51.3],
          [-0.5, 51.4], [-0.5, 51.6]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "South East",
        name: "South East",
        center: [51.2, -0.8]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-1.8, 51.9], [-0.7, 52.1], [-0.5, 51.6], [-0.5, 51.4], [0.6, 51.5],
          [1.4, 51.4], [1.4, 51.1], [0.4, 50.8], [-1.3, 50.7], [-1.8, 51.1],
          [-1.8, 51.9]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "South West",
        name: "South West",
        center: [50.8, -3.5]
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-2.6, 51.9], [-1.8, 51.1], [-1.3, 50.7], [-2.5, 50.5], [-3.6, 50.2],
          [-5.2, 49.9], [-5.7, 50.1], [-4.7, 50.8], [-4.3, 51.2], [-3.0, 51.2],
          [-2.7, 51.5], [-2.6, 51.9]
        ]]
      }
    }
  ]
};
