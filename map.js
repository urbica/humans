mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGFua3V6bWluIiwiYSI6Ik1ieW5udm8ifQ.25EOEC2-N92NCWT0Ci9w-Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v8',
  center: [-74.0059, 40.7127],
  zoom: 12
});

var markers = new mapboxgl.GeoJSONSource({ data: {} });

map.on('load', () => {
  map.addSource('markers', markers);
  map.addLayer({
    id: 'markers',
    type: 'circle',
    source: 'markers',
    paint: {
      'circle-radius': 2,
      'circle-color': '#45AE6C'
    }
  });
});

fetch('data.geojson')
  .then(response => response.json().then(data => markers.setData(data)))
  .catch(error => console.error('Error loading data.geojson', error));