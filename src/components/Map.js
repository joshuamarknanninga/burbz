import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use your Mapbox access token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ?? '';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapboxgl.accessToken || !mapContainerRef.current) {
      return undefined;
    }
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Reference to the container element
      style: 'mapbox://styles/mapbox/streets-v11', // Style of the map (e.g., streets, satellite, etc.)
      center: [-74.5, 40], // Initial position [longitude, latitude]
      zoom: 9, // Initial zoom level
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Interactive Map</h2>
      {mapboxgl.accessToken ? (
        <div
          ref={mapContainerRef}
          className="map-container"
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '0.375rem', // Tailwind's rounded-md equivalent
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Tailwind's shadow equivalent
          }}
        />
      ) : (
        <div
          className="map-container flex items-center justify-center text-center text-red-700"
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fef2f2',
          }}
        >
          <p className="max-w-lg px-6">
            Mapbox access token missing. Set <span className="font-semibold">VITE_MAPBOX_ACCESS_TOKEN</span> in your
            environment to load the interactive map.
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
