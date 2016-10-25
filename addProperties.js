#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const fileName = process.argv.slice(2)[0];
if (!fileName) {
  console.error('Usage: ./addProperties.js input.geojson > output.geojson');
  process.exit(-1);
}

const data = JSON.parse(fs.readFileSync(fileName));
const photos = fs.readdirSync(path.join(__dirname, 'public', 'photos'));
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const features = data.features.map(feature => {
  const idx = random(0, photos.length);
  const newProperties = Object.assign({}, feature.properties, {
    photo: `photos/${photos[idx]}`,
    price: random(10, 50),
    rating: random(1, 5)
  });
  return Object.assign({}, feature, { properties: newProperties });
});

console.log(JSON.stringify({ type: 'FeatureCollection', features }, null, 2));
