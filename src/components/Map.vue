<template>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  // import MapboxDraw from '@mapbox/mapbox-gl-draw';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
  
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  
  export default {
    name: 'Map',
    data() {
    return {
      map: null, // Store map instance
      drawControl: null, // Store draw control instance
      markers: [], // Store markers
    };
  },
    mounted() {
      // Initialize the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add drawing tools using Mapbox Draw
    this.drawControl = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        line_string: true,
        point: true,
        trash: true,
      },
      defaultMode: 'draw_polygon', // Default mode is polygon drawing
    });
    this.map.addControl(this.drawControl, 'top-left');

    // Add custom markers with popups
    this.addMarkers();

  },
  beforeDestroy() {
    // Clean up map instance when component is destroyed
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
   // Function to export drawn regions as a JSON file
   exportDrawnRegions() {
      const data = this.drawControl.getAll(); // Get all drawn features (polygons, lines, points)
      const jsonString = JSON.stringify(data); // Convert data to JSON

      // Create a downloadable link for the JSON file
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element for download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'drawn_regions.json';
      link.click(); // Trigger the download
    },

    // Function to import drawn regions from a JSON file
    importDrawnRegions(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        if (this.drawControl) {
          this.drawControl.set(data); // Load the imported regions into the map
        }
      };
      reader.readAsText(file); // Read the file as text
    },
  },
};

    // Function to add markers and popups to the map
    addMarkers() {
      const locations = [
        { lng: -74.5, lat: 40, description: 'Marker 1: Example Location' },
        { lng: -74.6, lat: 40.1, description: 'Marker 2: Another Location' },
      ];

      locations.forEach((loc) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([loc.lng, loc.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(loc.description)) // Add popup to marker
          .addTo(this.map);

        this.markers.push(marker); // Store markers
      });
    }

  </script>

<style>
/* Styles for map container */
.map-container {
  width: 100%;
  height: 500px;
  border-radius: 0.375rem; /* Equivalent to Tailwind's rounded-md */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Equivalent to Tailwind's shadow */
}
/* Button styles */
.controls {
  margin-top: 1rem;
  text-align: center;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
}

.btn-blue {
  background-color: #4299e1; /* Tailwind's bg-blue-500 equivalent */
  color: white;
}

.btn-blue:hover {
  background-color: #3182ce; /* Tailwind's bg-blue-600 equivalent */
}

.btn-gray {
  background-color: #edf2f7; /* Tailwind's bg-gray-200 equivalent */
  color: #2d3748; /* Tailwind's text-gray-900 equivalent */
}
</style>