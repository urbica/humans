/* eslint-disable new-cap */

import Immutable from 'immutable';
import layers from '../layers.js';
import * as types from '../actions/actions.js';

const initialState = {
  data: undefined,
  mapStyle: undefined,
  cardFeature: undefined,
  listOrMap: 'map',
  priceOrRating: 'price',
  fixedOrHourly: 'hourly',
  professionalOrClient: 'professional'
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.MAP_DATA_FETCH_SUCCESS: {
      const mapStyle = state.mapStyle || Immutable.Map({});
      return Object.assign({}, state, {
        data: payload,
        mapStyle: mapStyle.mergeDeep({
          sources: {
            markers: { type: 'geojson', data: payload }
          }
        }).update('layers', (existingLayers) => existingLayers.concat(layers))
      });
    }
    case types.MAP_STYLE_FETCH_SUCCESS: {
      const mapStyle = state.mapStyle || Immutable.Map({});
      return Object.assign({}, state, {
        mapStyle: mapStyle.mergeDeep(payload)
      });
    }
    case types.SHOW_CARD: {
      return Object.assign({}, state, { cardFeature: payload });
    }
    case types.HIDE_CARD: {
      return Object.assign({}, state, { cardFeature: undefined });
    }
    case types.SWITCH_PROFESSIONAL_CLIENT: {
      return Object.assign({}, state, { professionalOrClient: payload });
    }
    case types.SWITCH_LIST_MAP: {
      return Object.assign({}, state, { listOrMap: payload });
    }
    case types.SWITCH_PRICE_RATING: {
      return Object.assign({}, state, { priceOrRating: payload });
    }
    case types.SWITCH_FIXED_HOURLY: {
      return Object.assign({}, state, { fixedOrHourly: payload });
    }
    default:
      return state;
  }
};

export default reducer;
