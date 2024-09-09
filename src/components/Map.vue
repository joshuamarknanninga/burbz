<template>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  
  export default {
    name: 'Map',
    data() {
    return {
      map: null, // Store map instance
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
  },
  beforeDestroy() {
    // Clean up map instance when component is destroyed
    if (this.map) {
      this.map.remove();
    }
  },
};
    
  </script>
  