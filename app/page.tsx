"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import DataSourceToggle from "../app/components/DataSourceToggle";
import DateSlider from "../app/components/DateSlider";
import { mockDataSources } from "../app/data/dataSources";
import "mapbox-gl/dist/mapbox-gl.css";

const apiKey = process.env.MAPBOX_KEY;

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ25kY2xvdWRzIiwiYSI6ImNrdzB5ZjZtNTFyNmMyb3QzdG9ob2wyNXQifQ.zTjDydzauvHv3V9I91h-jA";

function MapPage() {
  const [dateRange, setDateRange] = useState({
    startDate: "2022-01-01",
    endDate: "2022-12-31",
  });

  const filteredData = mockDataSources.filter(
    (data) =>
      new Date(data.date) >= new Date(dateRange.startDate) &&
      new Date(data.date) <= new Date(dateRange.endDate)
  );

  const [dataSources, setDataSources] = useState(mockDataSources);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  {
    /* Default Map Start Location*/
  }
  const [viewport, setViewport] = useState({
    lat: -73.935242,
    lng: 40.73061,
    zoom: 1.3,
  });

  {
    /* Start Map*/
  }

  useEffect(() => {
    const initializeMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewport.lng, viewport.lat],
      zoom: viewport.zoom,
    });

    initializeMap.on("move", () => {
      setViewport({
        lat: initializeMap.getCenter().lat.toFixed(4),
        lng: initializeMap.getCenter().lng.toFixed(4),
        zoom: initializeMap.getZoom().toFixed(2),
      });
    });

    setMap(initializeMap);

    return () => initializeMap.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    dataSources.forEach((ds) => {
      if (!map.getSource(ds.id)) {
        map.addSource(ds.id, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      }

      if (!map.getLayer(ds.id)) {
        map.addLayer({
          id: ds.id,
          type: "circle", // or another type, based on visualization
          source: ds.id,
          paint: {
            "circle-radius": 5,
            "circle-color": "#FF5733",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#333",
          },
        });
        if (!ds.active) {
          map.setLayoutProperty(ds.id, "visibility", "none");
        }
      }
    });
  }, [map, dataSources]);

  {
    /* Data Filtering Functions*/
  }

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };
  const toggleDataSource = (id) => {
    setDataSources((prevDataSources) => {
      const newDataSources = prevDataSources.map((ds) =>
        ds.id === id ? { ...ds, active: !ds.active } : ds
      );
      const toggledDataSource = newDataSources.find((ds) => ds.id === id);

      if (toggledDataSource.active && toggledDataSource.geojson) {
        if (
          toggledDataSource.geojson.type === "FeatureCollection" &&
          Array.isArray(toggledDataSource.geojson.features)
        ) {
          map
            .getSource(toggledDataSource.id)
            .setData(toggledDataSource.geojson);
        } else {
          console.error(
            "Data is not valid GeoJSON:",
            toggledDataSource.geojson
          );
        }
        map.setLayoutProperty(toggledDataSource.id, "visibility", "visible");
      } else {
        map.getSource(toggledDataSource.id).setData({
          type: "FeatureCollection",
          features: [],
        });
        if (map) {
          map.setLayoutProperty(toggledDataSource.id, "visibility", "none");
        }
      }

      return newDataSources;
    });
  };

  {
    /* Data States*/
  }

  const handleSourceChange = (source) => {
    console.log("Source changed:", source);
    // Handle temperature data source change
  };
  const handleDateChange = (selectedDate) => {
    const dataForCurrentDate = dataSources.filter(
      (ds) =>
        new Date(ds.date).toDateString() ===
        new Date(selectedDate).toDateString()
    );

    dataSources.forEach((dataSource) => {
      if (dataSource.active && dataForCurrentDate.includes(dataSource)) {
        map.getSource(dataSource.id).setData(dataSource.geojson);
        map.setLayoutProperty(dataSource.id, "visibility", "visible");
      } else {
        map.setLayoutProperty(dataSource.id, "visibility", "none");
      }
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-1/4 m-[30px]">
        {/* Sidebar Hero*/}
        <div className="bg-white rounded-full p-[30px]">
          <div className="font-bold">
            <div className="text-[24px]">Earth API:</div>
          </div>
          <div className="text-gray text-[18px]">
            In this explorable, you can see temperature data, both historical
            and live, from a network of public global sensors.
          </div>
        </div>
        {/* Sidebar Tools */}
        {/* <DateSlider data={mockDataSources} onDateChange={handleDateChange} /> */}
        <div className="bg-white rounded-full">
          <div className="bg-black text-white font-bold text-[24px] rounded-tl-full rounded-tr-full">
            Maps Demo arrow
          </div>
          <div className=" p-[30px]">
            <div className="text-gray text-[18px]">
              In this explorable you can see tembapture data both historical and
              live from a network of public global sensors.
            </div>

            <div className="">
              <div className="uppercase font-bold text-[18px]">
                Data Sources
              </div>

              <div className="">
                {dataSources.map((ds) => (
                  <div key={ds.id}>
                    <input
                      type="checkbox"
                      checked={ds.active}
                      onChange={() => toggleDataSource(ds.id)}
                    />
                    {ds.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="uppercase font-bold">Data Filters </div>
              <div className=""></div>
            </div>
            <div className="text-gray">More on Data and Privacy Policy</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="my-[20px] mr-[20px] ml-[10px] rounded-lg  w-3/4 shadow-black shadow-sm">
        <div className="flex justify-between p-4">
          <div>
            <button className="mr-2" onClick={handleZoomIn}>
              Zoom In
            </button>
            <button onClick={handleZoomOut}>Zoom Out</button>
          </div>
          {/* <div class="relative hover:bg-gray-200 p-4 rounded-md">
              <!-- Default text, hidden on hover -->
              <span class="absolute top-0 left-0 z-10">
                Default Text
              </span>
              
              <!-- Text that appears on hover, hidden by default -->
              <span class="opacity-0 hover:opacity-100 absolute top-0 left-0 z-20">
                Hover Text
              </span>
            </div>
 */}
          <div>
            Lat: {viewport.lat}| Lng: {viewport.lng} | Zoom: {viewport.zoom}
          </div>
        </div>
        {/* Map initialization and other related content */}
        <div className="h-full relative overflow-hidden">
          <div
            ref={mapContainer}
            className="h-[500px] absolute top-0 left-0 right-0 bottom-0"
          />
        </div>
      </main>
    </div>
  );
}

export default MapPage;
