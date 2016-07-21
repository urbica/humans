import React from 'react';
import ReactDOM from 'react-dom';
import supercluster from 'supercluster';
import { showCard } from '../actions/actions.js';

// import mapboxgl from 'mapbox-gl';
import Marker from './Marker.jsx';

/* eslint-disable max-len */
const accessToken = 'pk.eyJ1IjoiaHVtYW5zIiwiYSI6ImNpcDZzdm80cjAwMTB1d203ZmRqZTdwbWEifQ.up9_Pt9XqDhp6m0KLHcbIw';
/* eslint-enable max-len */

const Map = React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },

  getInitialState() {
    return {
      markers: []
    };
  },

  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    window.map = this.map = new mapboxgl.Map({
      container: 'map',
      style: this.props.style.toJS(),
      center: [-74.0059, 40.7127],
      zoom: 8,
      attributionControl: false
    });

    this.map.addControl(new mapboxgl.Navigation({ position: 'top-right' }));
    this.map.addControl(new mapboxgl.Geolocate({ position: 'top-right' }));

    this.map.on('moveend', this.onMoveEnd);
  },

  componentWillReceiveProps(nextProps) {
    // handle style changes
    const style = this.props.style;
    const newStyle = nextProps.style;
    if (style !== newStyle) {
      this.handleStyleChange(style, newStyle);
    }
  },

  shouldComponentUpdate() {
    return false;
  },

  handleStyleChange(style, newStyle) {
    // handle sources data update
    const sources = style.get('sources');
    const newSources = newStyle.get('sources');
    if (sources !== newSources) {
      newSources
        .filter((newSource, key) => sources.get(key) !== newSource)
        .forEach((newSource, key) => {
          const source = this.map.getSource(key);
          if (source) {
            source.setData(newSource.get('data').toJS());
          } else {
            this.map.addSource(key, newSource.toJS());
            if (key === 'clusters') {
              const features = newSource.getIn(['data', 'features']).toJS();
              const options = { radius: 20, extent: 256, maxZoom: 14 };
              const cluster = supercluster(options).load(features);
              this.setState({ cluster });
            }
          }
        });
    }

    // handle layers update
    const layers = style.get('layers');
    const newLayers = newStyle.get('layers');
    if (layers !== newLayers) {
      newLayers.forEach((newLayer, index) => {
        const layer = layers.get(index);
        if (!layer) {
          this.map.addLayer(newLayer);
        }
        if (layer && layer !== newLayer) {
          const id = newLayer.get('id');

          // handle visibility change
          const visibility = newLayer.getIn(['layout', 'visibility']);
          if (layer.getIn(['layout', 'visibility']) !== visibility) {
            this.map.setLayoutProperty(id, 'visibility', visibility);
          }

          // handle filter change
          const filter = newLayer.get('filter');
          if (layer.get('filter') !== filter) {
            this.map.setFilter(id, filter);
          }
        }
      });
    }
  },

  renderMarker(feature) {
    const div = document.createElement('div');
    const onClick = () => this.props.dispatch(showCard(feature));
    ReactDOM.render(
      <Marker
        store={ this.context.store }
        feature={ feature }
        onClick={ onClick }
      />,
      div
    );
    return new mapboxgl.Marker(div).setLngLat(feature.geometry.coordinates);
  },

  onMoveEnd() {
    const bounds = this.map.getBounds();
    const nw = this.map.project(bounds.getNorthWest());
    const se = this.map.project(bounds.getSouthEast());
    const bbox = [[nw.x, nw.y], [se.x, se.y]];

    const zoom = this.map.getZoom();
    // const bounds = this.map.getBounds().toArray();
    // const bbox = bounds[0].concat(bounds[1]);
    //
    // const clusters = this.state.cluster.getClusters(bbox, Math.floor(zoom));
    // this.map.getSource('clusters').setData({
    //   type: 'FeatureCollection',
    //   features: clusters
    // });

    if (zoom >= 12) {
      const features = this.map.queryRenderedFeatures(bbox, { layers: ['clusters'] });
      const newMarkers = features.map(feature => this.renderMarker(feature));
      this.state.markers.forEach(marker => marker.remove());

      this.setState({ markers: newMarkers }, () =>
        newMarkers.forEach(marker => marker.addTo(this.map))
      );

      // const newMarkers = clusters.map(feature => this.renderMarker(feature));
      // this.state.markers.forEach(marker => marker.remove());
      //
      // this.setState({ markers: newMarkers }, () =>
      //   newMarkers.forEach(marker => marker.addTo(this.map))
      // );
    } else if (this.state.markers.length > 0) {
      this.state.markers.forEach(marker => marker.remove());
    }
  },

  render() {
    return <div id='map' className='map'></div>;
  }
});

export default Map;
