document.getElementById('map').classList.add('loading');
mapboxgl.accessToken = 'pk.eyJ1IjoiaHVtYW5zIiwiYSI6ImNpcDZzdm80cjAwMTB1d203ZmRqZTdwbWEifQ.up9_Pt9XqDhp6m0KLHcbIw';

var index;
var clusters;
var features = [];

// настройка карты
var map = window.map = new mapboxgl.Map({
  container: 'map', // идентификатор html куда будет рендериться карта
  style: 'mapbox://styles/humans/cip9hxybc003edmm2i1eqlap8', // стиль карты по умлочанию
  center: [-74.0059, 40.7127], // начальные координаты карты
  zoom: 12 // начальный уровень приближения
});

// настройка данных для маркеров
var markers = new mapboxgl.GeoJSONSource({
  data: {}, // данных пока нет, они загрузяться позже
  // cluster: true, // объединять точки в кластеры
  // clusterRadius: 40 // размер кластера в пикселях
});

// настройка данных для точек
var miniMarkers = new mapboxgl.GeoJSONSource({
  data: {} // данных пока нет, они загрузяться позже
});

// эта функция будет выполнена после загрузки карты
map.on('load', function() {
  map.addSource('markers', markers); // добавляем на карту данные маркеров
  map.addSource('miniMarkers', miniMarkers); // добавляем на карту данные маркеров

  // добавляем на карту слой маркеров
  map.addLayer({
    id: 'markers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'markers', // идентификатор данных
    paint: {
      'circle-radius': 3,
      'circle-color': '#f00', // цвет кружка
      'circle-opacity': 1
    }
  });

  // добавляем на карту слой маркеров
  map.addLayer({
    id: 'miniMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'miniMarkers', // идентификатор данных
    paint: {
      'circle-radius': 3, // радиус кружка
      'circle-color': '#1987FF', // цвет кружка
      'circle-opacity': {
    "stops": [
      [1, 0.1],
      [2, 0.1],
      [3, 0.1],
      [4, 0.1],
      [5, 0.1],
      [6, 0.1],
      [7, 0.2],
      [8, 0.2],
      [9, 0.3],
      [10, 0.4],
      [11, 0.4],
      [12, 0.4],
      [13, 0.5],
      [14, 0.5],
      [15, 0.6],
      [16, 0.7],
      [17, 0.8],
      [18, 0.9],
      [19, 1],
      [20, 1]
    ]
  }
    }
  });
});

// загрузка маркеров из файла data.geojson
$.getJSON('assets/big_data.geojson', function(data) {
  features = data.features
  markers.setData(data); // загрузка данных в маркеры
  miniMarkers.setData(data);

  index = supercluster({
    log: true,
    radius: 60,
    extent: 256,
    maxZoom: 18
  }).load(features);

  document.getElementById('map').classList.remove('loading');
});

// функция отрисовки содержимого попапа
var renderFeature = function(feature) {
  // сокращаем текст до восьми символов
  var title = feature.properties.name.substring(0, 8);

  // отдаём html строчку
  return `
    <div class='container'>
      <img class='photo' src=${feature.properties.photo} />
      <div class='title'>${title}</div>
    </div>
  `;
};

var popups = [];

// функция отрисовки попапов
var render = function() {
  // удаляем все предыдущие маркеры
  if (popups.length > 0) popups.forEach(function(popup) { popup.remove() })

  // рисуем новые попапы только ближе 12 зума
  if (map.getZoom() >= 3) {
    // находим все отрисованные объекты на карте в текущем экстенте
    var bounds = map.getBounds();
    var nw = map.project(bounds.getNorthWest());
    var se = map.project(bounds.getSouthEast());
    var bbox = [[nw.x, nw.y], [se.x, se.y]];
    var features = map.queryRenderedFeatures(bbox, { layers: ['markers'] });

    var bounds2 = bounds.toArray();
    var bbox2 = bounds2[0].concat(bounds2[1]);
    clusters = index.getClusters(bbox2, Math.floor(map.getZoom()));
    console.log(clusters);

    // создаём новые маркеры — из всех найденных объектов выбираем все объекты не-кластеры
    popups = features.filter(function(feature) { return !feature.properties.cluster })
    .map(function(feature) {
      // создаём для каждого объекты новый попап
      return new mapboxgl.Popup({ closeButton: false, closeOnClick: false, anchor: 'bottom' })
        // и добавляем его на карту
        .setLngLat(feature.geometry.coordinates)
        .setHTML(renderFeature(feature))
        .addTo(map)
    });
  }
}

// перерисовывать попапы после каждого движения карты
map.on('moveend', render);
