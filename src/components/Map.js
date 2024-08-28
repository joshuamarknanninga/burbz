import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
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
    </div>
  );
};

export default Map;
