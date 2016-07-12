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
  fetch(endpoint)
    .then(response => response.json().then(data => ({ data, response })))
    .then(({ data, response }) => {
      if (!response.ok) {
        return Promise.reject(data);
      }
      return data;
    });

const styleUrl = 'https://api.mapbox.com/styles/v1/humans/cip9hxybc003edmm2i1eqlap8?access_token=pk.eyJ1IjoiaHVtYW5zIiwiYSI6ImNpcDZzdm80cjAwMTB1d203ZmRqZTdwbWEifQ.up9_Pt9XqDhp6m0KLHcbIw';
const dataUrl = 'assets/med_data.geojson';

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
