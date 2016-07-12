import React from 'react';
import { connect } from 'react-redux';

import Map from './Map.jsx';
import Card from './Card.jsx';
import Header from './Header.jsx';
import FiltersPanel from './FiltersPanel.jsx';
import PriceRatingSwitch from './PriceRatingSwitch.jsx';
import { fetchStyle } from '../actions/actions.js';

class App extends React.Component {
  componentWillMount() {
    if (!this.props.mapStyle) {
      this.props.dispatch(fetchStyle());
    }
  }

  render() {
    return (
      <div>
        <Header
          dispatch={ this.props.dispatch }
          listOrMap={ this.props.listOrMap }
          professionalOrClient={ this.props.professionalOrClient }
        />
        {
          this.props.mapStyle &&
            <Map
              style={ this.props.mapStyle }
              dispatch={ this.props.dispatch }
              priceOrRating={ this.props.priceOrRating }
              fixedOrHourly={ this.props.fixedOrHourly }
            />
        }
        <FiltersPanel
          dispatch={ this.props.dispatch }
          fixedOrHourly={ this.props.fixedOrHourly }
        />
        {
          this.props.cardFeature &&
            <Card
              feature={ this.props.cardFeature }
              dispatch={ this.props.dispatch }
            />
        }
        <PriceRatingSwitch
          dispatch={ this.props.dispatch }
          priceOrRating={ this.props.priceOrRating }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  mapStyle: state.mapStyle,
  cardFeature: state.cardFeature,
  listOrMap: state.listOrMap,
  priceOrRating: state.priceOrRating,
  fixedOrHourly: state.fixedOrHourly,
  professionalOrClient: state.professionalOrClient
});

export default connect(mapStateToProps)(App);
