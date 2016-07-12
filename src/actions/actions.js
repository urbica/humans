export const MAP_STYLE_FETCH_REQUEST = 'MAP_STYLE_FETCH_REQUEST';
export const MAP_STYLE_FETCH_SUCCESS = 'MAP_STYLE_FETCH_SUCCESS';
export const MAP_STYLE_FETCH_FAILURE = 'MAP_STYLE_FETCH_FAILURE';

export const fetchStyle = () => ({ type: MAP_STYLE_FETCH_REQUEST });

export const MAP_DATA_FETCH_REQUEST = 'MAP_DATA_FETCH_REQUEST';
export const MAP_DATA_FETCH_SUCCESS = 'MAP_DATA_FETCH_SUCCESS';
export const MAP_DATA_FETCH_FAILURE = 'MAP_DATA_FETCH_FAILURE';

export const SHOW_CARD = 'SHOW_CARD';
export const showCard = (feature) => ({ type: SHOW_CARD, payload: feature });

export const HIDE_CARD = 'HIDE_CARD';
export const hideCard = () => ({ type: HIDE_CARD });

export const SWITCH_PROFESSIONAL_CLIENT = 'SWITCH_PROFESSIONAL_CLIENT';
export const switchProfessionalClient = (professionalOrClient) => ({
  type: SWITCH_PROFESSIONAL_CLIENT,
  payload: professionalOrClient
});

export const SWITCH_LIST_MAP = 'SWITCH_LIST_MAP';
export const switchListMap = (listOrMap) => ({
  type: SWITCH_LIST_MAP,
  payload: listOrMap
});

export const SWITCH_PRICE_RATING = 'SWITCH_PRICE_RATING';
export const switchPriceRating = (priceOrRating) => ({
  type: SWITCH_PRICE_RATING,
  payload: priceOrRating
});

export const SWITCH_FIXED_HOURLY = 'SWITCH_FIXED_HOURLY';
export const switchFixedHourly = (fixedOrHourly) => ({
  type: SWITCH_FIXED_HOURLY,
  payload: fixedOrHourly
});
