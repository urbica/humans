document.getElementById('map').classList.add('loading');
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlcGFua3V6bWluIiwiYSI6Ik1ieW5udm8ifQ.25EOEC2-N92NCWT0Ci9w-Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v8',
  center: [-74.0059, 40.7127],
  zoom: 12
});

var markers = new mapboxgl.GeoJSONSource({
  data: {},
  cluster: true,
  clusterRadius: 40
});

map.on('load', () => {
  map.addSource('markers', markers);
  map.addLayer({
    id: 'markers',
    type: 'circle',
    source: 'markers',
    paint: {
      'circle-radius': 5,
      'circle-color': '#45AE6C'
    }
  });

  setTimeout(render, 1000);
});

fetch('data.geojson')
  .then(response => response.json().then(data => {
    markers.setData(data);
    document.getElementById('map').classList.remove('loading');
  }))
  .catch(error => console.error('Error loading data.geojson', error));

var renderFeature = (feature) => {
  var title = feature.properties.name.substring(0, 8);
  return `
    <div class='container'>
      <img class='photo' src=${feature.properties.photo} />
      <div class='title'>${title}</div>
    </div>
  `;
};

var popups = [];
var render = () => {
  var bounds = map.getBounds();
  var nw = map.project(bounds.getNorthWest());
  var se = map.project(bounds.getSouthEast());
  var bbox = [[nw.x, nw.y], [se.x, se.y]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['markers'] });

  popups.map(popup => popup.remove())
  popups = features.filter(feature => !feature.properties.cluster).map(feature => {
    return new mapboxgl.Popup({ closeButton: false, closeOnClick: false, anchor: 'bottom' })
      .setLngLat(feature.geometry.coordinates)
      .setHTML(renderFeature(feature))
      .addTo(map)
  });
}

map.on('moveend', render);
