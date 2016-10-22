import Immutable from 'immutable';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

import {
  MAP_STYLE_FETCH_REQUEST,
  MAP_STYLE_FETCH_SUCCESS,
  MAP_STYLE_FETCH_FAILURE,
  MAP_DATA_FETCH_REQUEST,
  MAP_DATA_FETCH_SUCCESS,
  MAP_DATA_FETCH_FAILURE
} from '../actions/actions.js';

export const callApi = (endpoint) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', endpoint, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject(Error('It broke'));
      }
    };

    request.onerror = () => reject(Error('Cant call api'));
    request.send();
  });

const args = location.search.replace(/^\?/, '').split('&').reduce((o, param) => {
  const keyvalue = param.split('=');
  o[keyvalue[0]] = keyvalue[1];
  return o;
}, {});

const dataUrl = `assets/${args.data || 'small'}.geojson`;
const styleUrl = 'https://api.mapbox.com/styles/v1/humans/ciuflxfzd00h52io6gwp3872p?access_token=pk.eyJ1IjoiaHVtYW5zIiwiYSI6ImNpcDZzdm80cjAwMTB1d203ZmRqZTdwbWEifQ.up9_Pt9XqDhp6m0KLHcbIw';

function* fetchStyle() {
  /* eslint-disable no-console */
  try {
    const style = yield call(callApi, styleUrl);
    yield put({ type: MAP_STYLE_FETCH_SUCCESS, payload: Immutable.fromJS(style) });
    yield put({ type: MAP_DATA_FETCH_REQUEST });
    try {
      const data = yield call(callApi, dataUrl);
      yield put({ type: MAP_DATA_FETCH_SUCCESS, payload: data });
    } catch (e) {
      console.error(e);
      yield put({ type: MAP_DATA_FETCH_FAILURE });
    }
  } catch (e) {
    console.error(e);
    yield put({ type: MAP_STYLE_FETCH_FAILURE });
  }
}

function* Saga() {
  yield* takeEvery(MAP_STYLE_FETCH_REQUEST, fetchStyle);
}

export default Saga;
