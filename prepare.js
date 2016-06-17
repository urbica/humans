var fs = require('fs');

var photos = fs.readdirSync('./photos/');
var data = JSON.parse(fs.readFileSync('./min_data.geojson'));

var features = data.features.map(feature => {
  var photoId = Math.floor(Math.random() * photos.length);
  var name = feature.properties.name ? feature.properties.name : photos[photoId];
  return Object.assign({}, feature, {
    properties: {
      name: name,
      photo: 'photos/' + photos[photoId]
    }
  });
});

console.log(JSON.stringify({ type: 'FeatureCollection', features: features }, null, 2));