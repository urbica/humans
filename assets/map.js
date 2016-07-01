var card = document.getElementById('card');

window.moneyRaitingSwitcherState = 'money';
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
  zoom: 8, // начальный уровень приближения,
  attributionControl: false
});

// настройка данных для пинов
var markers = new mapboxgl.GeoJSONSource({
  data: { type: 'FeatureCollection', features: [] }, // данных пока нет, они загрузятся позже
  // cluster: true, // объединять точки в кластеры
  // clusterRadius: 40 // размер кластера в пикселях
});

// настройка данных для точек
var miniMarkers = new mapboxgl.GeoJSONSource({
  data: { type: 'FeatureCollection', features: [] }, // данных пока нет, они загрузятся позже
});

// настройка данных для ареалов вокруг точек
var areaMarkers = new mapboxgl.GeoJSONSource({
  data: { type: 'FeatureCollection', features: [] }, // данных пока нет, они загрузятся позже
});

// настройка данных для ареалов вокруг точек
var blueMarkers = new mapboxgl.GeoJSONSource({
  data: { type: 'FeatureCollection', features: [] }, // данных пока нет, они загрузятся позже
});

// настройка данных для ареалов вокруг точек
var whiteMarkers = new mapboxgl.GeoJSONSource({
  data: { type: 'FeatureCollection', features: [] }, // данных пока нет, они загрузятся позже
});

// эта функция будет выполнена после загрузки карты
map.on('load', function() {
  map.addSource('markers', markers); // добавляем на карту данные маркеров
  map.addSource('miniMarkers', miniMarkers); // добавляем на карту данные маркеров
  map.addSource('areaMarkers', areaMarkers); // добавляем на карту данные ареалов маркера
  map.addSource('blueMarkers', blueMarkers); // добавляем на карту данные ареалов маркера
  map.addSource('whiteMarkers', whiteMarkers); // добавляем на карту данные ареалов маркера

  // добавляем на карту слой пинов
  map.addLayer({
    id: 'markers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'markers', // идентификатор данных
    paint: {
      'circle-radius': 1,
      'circle-color': '#fff', // цвет кружка
      'circle-opacity': 1
    }
  });

  // добавляем на карту слой ареалов маркера
  map.addLayer({
    id: 'areaMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'areaMarkers', // идентификатор данных
    paint: {
      'circle-color': '#00DBFF', // цвет кружка
      'circle-radius':  {
        'stops': [
          [1, 17],
          [2, 17],
          [3, 17],
          [4, 16],
          [5, 16],
          [6, 16],
          [7, 15],
          [8, 12],
          [9, 10],
          [10, 9],
          [11, 0]
        ]
      }, // радиус кружка
      'circle-blur': {
        'stops': [
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 4],
          [6, 3],
          [7, 2],
          [8, 1.4],
          [9, 1],
          [10, 1],
          [11, 1]
        ]
      }, // размытие кружка
      'circle-opacity': {
        'stops': [
          [1, 0.8],
          [2, 0.8],
          [3, 0.8],
          [4, 0.9],
          [5, 0.9],
          [6, 0.9],
          [7, 0.8],
          [8, 0.8],
          [9, 0.6],
          [10, 0.4],
          [11, 0]
        ]
      } // прозрачность кружка
    }
  });

  // добавляем на карту слой ареалов маркера
  map.addLayer({
    id: 'blueMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'blueMarkers', // идентификатор данных
    paint: {
      'circle-color': '#33BDFF', // цвет кружка
      'circle-radius':  {
        'stops': [
          [9, 0],
          [10, 9],
          [11, 9],
          [12, 8],
          [13, 5],
          [14, 0]
        ]
      }, // радиус кружка
      'circle-blur': {
        'stops': [
          [9, 1],
          [10, 1],
          [11, 1],
          [12, 1.2],
          [13, 1.2],
          [14, 0]
        ]
      }, // размытие кружка
      'circle-opacity': {
        'stops': [
          [9, 0],
          [10, 0.3],
          [11, 0.6],
          [12, 0.5],
          [13, 0.2],
          [14, 0]
        ]
      } // прозрачность кружка
    }
  });



  // добавляем на карту слой ареалов маркера
  map.addLayer({
    id: 'whiteMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'whiteMarkers', // идентификатор данных
    paint: {
      'circle-color': '#fff', // цвет кружка ccff00 ff7ab6 d1a7ff
      'circle-radius':  {
        'stops': [
          [1, 8],
          [2, 8],
          [3, 8],
          [4, 8],
          [5, 7],
          [6, 5],
          [7, 5],
          [8, 5],
          [9, 4],
          [10, 3],
          [11, 2],
          [12, 0],
          [13, 0],
          [14, 0],
          [15, 0],
          [16, 0],
          [17, 0],
          [18, 0],
          [19, 0],
          [20, 0]
        ]
      }, // радиус кружка
      'circle-blur': {
        'stops': [
          [1, 4],
          [2, 4],
          [3, 4],
          [4, 4],
          [5, 3],
          [6, 2],
          [7, 2],
          [8, 1.8],
          [9, 1.2],
          [10, 1],
          [11, 1],
          [12, 0],
          [13, 0],
          [14, 0],
          [15, 0],
          [16, 0],
          [17, 0],
          [18, 0],
          [19, 0],
          [20, 0]
        ]
      }, // размытие кружка
      'circle-opacity': {
        'stops': [
          [1, 0.4],
          [2, 0.4],
          [3, 0.4],
          [4, 0.4],
          [5, 0.4],
          [6, 0.4],
          [7, 0.4],
          [8, 0.4],
          [9, 0.4],
          [10, 0.4],
          [11, 0.2],
          [12, 0],
          [13, 0],
          [14, 0],
          [15, 0],
          [16, 0],
          [17, 0],
          [18, 0],
          [19, 0],
          [20, 0]
        ]
      } // прозрачность кружка
    }
  });

   // добавляем на карту слой маркеров
  map.addLayer({
    id: 'miniMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'miniMarkers', // идентификатор данных
    paint: {
    'circle-color': '#4A90E2', // цвет кружка
      'circle-radius': {
        'stops': [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 0],
          [7, 0],
          [8, 0],
          [9, 0],
          [10, 0],
          [11, 0],
          [12, 2.2],
          [13, 2.5],
          [14, 3],
          [15, 3.5],
          [16, 4],
          [17, 4],
          [18, 4],
          [19, 4],
          [20, 4]
        ]
      }, // радиус кружка
      'circle-blur': {
        'stops': [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 0],
          [7, 0],
          [8, 0],
          [9, 0],
          [10, 0],
          [11, 0.4],
          [12, 0.6],
          [13, 0],
          [14, 0],
          [15, 0],
          [16, 0],
          [17, 0],
          [18, 0],
          [19, 0],
          [20, 0]
        ]
      }, // размытие кружка
      'circle-opacity': {
        'stops': [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0.8],
        [12, 0.8],
        [13, 1],
        [14, 1],
        [15, 1],
        [16, 1],
        [17, 1],
        [18, 1],
        [19, 1],
        [20, 1]
        ]
      } // прозрачность кружка
    }
  });

});

// загрузка маркеров из файла data.geojson
$.getJSON('assets/med_data.geojson', function(data) {
  features = window.features = data.features
  // загрузка данных в маркеры
  markers.setData(data);
  miniMarkers.setData(data);
  areaMarkers.setData(data);
  blueMarkers.setData(data);
  whiteMarkers.setData(data);

  index = supercluster({
    log: false,
    radius: 40,
    extent: 256,
    maxZoom: 18
  }).load(features);

  document.getElementById('map').classList.remove('loading');
});

// функция отрисовки содержимого попапа
var renderFeature = function(feature) {
  var money = '$ ' + feature.properties.price + ' hourly';
  var rating = '★ ' + feature.properties.rating + ' | 12';

  var title
  switch(window.moneyRaitingSwitcherState) {
    case 'money': title = money; break;
    case 'rating': title = rating; break;
  }

  // отдаём html строчку
  return `
    <div class='popupContainer'>
      <img class='photo' src=${feature.properties.photo} />
      <div class='title'>${title}</div>
    </div>
  `;
};

var popups = [];
var clickListener = function() {
  if (card.style.left == '20px') {
    card.style.left = '-300px';
    setTimeout(function() {
      card.style.left = '20px';
    }, 500);
  } else {
    card.style.left = '20px';
  }
};

// функция отрисовки попапов
var render = function() {
  // удаляем все предыдущие маркеры
  if (popups.length > 0) {
    Array.from(document.getElementsByClassName('popupContainer')).map(function(el) {
      el.removeEventListener('click', clickListener);
    });
    popups.forEach(function(popup) { popup.remove() })
  }

  // рисуем новые попапы только ближе 12 зума
  if (map.getZoom() >= 12) {
    // находим все кластеры на карте в текущем экстенте
    var bounds = map.getBounds().toArray();
    var bbox = bounds[0].concat(bounds[1]);

    clusters = index.getClusters(bbox, Math.floor(map.getZoom())).map(function(cluster) {
      if (cluster.properties.cluster && cluster.properties.neighbor_ids.length > 0) {
        return Object.assign({}, cluster, {
          properties: window.features[cluster.properties.neighbor_ids[0]].properties
        });
      }
      console.warn('cluster neighbors not found :(');
      return cluster;
    });

    markers.setData({ type: 'FeatureCollection', features: clusters });

    // создаём новые маркеры — из всех найденных объектов выбираем все объекты не-кластеры
    popups = clusters.filter(function(feature) { return !feature.properties.cluster })
      .map(function(feature) {
      // создаём для каждого объекты новый попап
      return new mapboxgl.Popup({ closeButton: false, closeOnClick: false, anchor: 'bottom' })
        // и добавляем его на карту
        .setLngLat(feature.geometry.coordinates)
        .setHTML(renderFeature(feature))
        .addTo(map)
    });

    Array.from(document.getElementsByClassName('popupContainer')).map(function(el) {
      el.addEventListener('click', clickListener);
    });
  }
}

// перерисовывать попапы после каждого движения карты
map.on('moveend', render);

map.on('click', function() {
  if (card.style.left == '20px') {
    card.style.left = '-300px';
  }
});

card.addEventListener('click', function() {
  card.style.left = '-300px';
});

// переключалка money/rating
var moneySwitcher = document.getElementById('moneySwitcher');
moneySwitcher.addEventListener('click', function() {
  window.moneyRaitingSwitcherState = 'money';
  moneySwitcher.classList.add('active');
  ratingSwitcher.classList.remove('active');
  render();
});

var ratingSwitcher = document.getElementById('ratingSwitcher');
ratingSwitcher.addEventListener('click', function() {
  window.moneyRaitingSwitcherState = 'rating';
  ratingSwitcher.classList.add('active');
  moneySwitcher.classList.remove('active');
  render();
});

var list = document.getElementById('list');

// переключалка list/map
var listSwitcher = document.getElementById('listSwitcher');
listSwitcher.addEventListener('click', function() {
  listSwitcher.classList.add('active');
  mapSwitcher.classList.remove('active');
  list.style.display = 'flex';
});

var mapSwitcher = document.getElementById('mapSwitcher');
mapSwitcher.addEventListener('click', function() {
  mapSwitcher.classList.add('active');
  listSwitcher.classList.remove('active');
  list.style.display = 'none';
});

list.addEventListener('click', function() {
  mapSwitcher.classList.add('active');
  listSwitcher.classList.remove('active');
  list.style.display = 'none';
});