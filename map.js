document.getElementById('map').classList.add('loading');
mapboxgl.accessToken = 'pk.eyJ1IjoiaHVtYW5zIiwiYSI6ImNpcDZzdm80cjAwMTB1d203ZmRqZTdwbWEifQ.up9_Pt9XqDhp6m0KLHcbIw';

// настройка карты
var map = new mapboxgl.Map({
  container: 'map', // идентификатор html куда будет рендериться карта
  style: 'mapbox://styles/humans/cip9hxybc003edmm2i1eqlap8', // стиль карты по умлочанию
  center: [-74.0059, 40.7127], // начальные координаты карты
  zoom: 12 // начальный уровень приближения
});

// настройка данных для маркеров
var markers = new mapboxgl.GeoJSONSource({
  data: {}, // данных пока нет, они загрузяться позже
  cluster: true, // объединять точки в кластеры
  clusterRadius: 40 // размер кластера в пикселях
});

// настройка данных для точек
var miniMarkers = new mapboxgl.GeoJSONSource({
  data: {} // данных пока нет, они загрузяться позже
});

// эта функция будет выполнена после загрузки карты
map.on('load', () => {
  map.addSource('markers', markers); // добавляем на карту данные маркеров
  map.addSource('miniMarkers', miniMarkers); // добавляем на карту данные маркеров

  // добавляем на карту слой маркеров
  map.addLayer({
    id: 'markers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'markers', // идентификатор данных
    paint: {
      'circle-radius': 3, // радиус кружка
      'circle-color': '#4a90e2', // цвет кружка
      "circle-blur": 1,
    }
  });

  // добавляем на карту слой маркеров
  map.addLayer({
    id: 'miniMarkers', // идентификатор слоя
    type: 'circle', // тип отображения слоя
    source: 'miniMarkers', // идентификатор данных
    paint: {
      'circle-radius': 3, // радиус кружка
      'circle-color': '#4a90e2', // цвет кружка
    blend-mode: 0.5
    }
  });

  setTimeout(render, 1000); // отрисовать попапы через секунду
});

// загрузка маркеров из файла data.geojson
fetch('data.geojson')
  .then(response => response.json().then(data => {
    markers.setData(data); // загрузка данных в маркеры
    miniMarkers.setData(data);
    document.getElementById('map').classList.remove('loading');
  }))
  .catch(error => console.error('Error loading data.geojson', error));

// функция отрисовки содержимого попапа
var renderFeature = (feature) => {
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
var render = () => {
  // находим все отрисованные объекты на карте в текущем экстенте
  var bounds = map.getBounds();
  var nw = map.project(bounds.getNorthWest());
  var se = map.project(bounds.getSouthEast());
  var bbox = [[nw.x, nw.y], [se.x, se.y]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['markers'] });

  // удаляем все предыдущие маркеры
  popups.map(popup => popup.remove())

  // создаём новые маркеры — из всех найденных объектов выбираем все объекты не-кластеры
  popups = features.filter(feature => !feature.properties.cluster).map(feature => {
    // создаём для каждого объекты новый попап
    return new mapboxgl.Popup({ closeButton: false, closeOnClick: false, anchor: 'bottom' })
      // и добавляем его на карту
      .setLngLat(feature.geometry.coordinates)
      .setHTML(renderFeature(feature))
      .addTo(map)
  });
}

// перерисовывать попапы после каждого движения карты
map.on('moveend', render);
