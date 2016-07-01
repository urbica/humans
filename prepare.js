var fs = require('fs');

var photos = fs.readdirSync('./photos/');
var data = JSON.parse(fs.readFileSync('./assets/med_data.geojson'));

var features = data.features.map(feature => {
  var photoId = Math.floor(Math.random() * photos.length);
  var rating = Math.floor(Math.random() * 5);
  var price = Math.floor(Math.random() * 150);
  var name = feature.properties.name ? feature.properties.name : photos[photoId];
  return Object.assign({}, feature, {
    properties: {
      name: name,
      photo: 'photos/' + photos[photoId],
      price: price,
      rating: rating
    }
  });
});

console.log(JSON.stringify({ type: 'FeatureCollection', features: features }, null, 2));