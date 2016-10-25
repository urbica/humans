import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import Map from './Map';
import Card from './Card';
import List from './List';
import Header from './Header';
import FiltersPanel from './FiltersPanel';
import PriceRatingSwitch from './PriceRatingSwitch';
import { fetchStyle } from '../actions/actions';

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
          professionalOrService={ this.props.professionalOrService }
        />
        {
          this.props.mapStyle &&
            <Map
              data={ this.props.data }
              style={ this.props.mapStyle }
              dispatch={ this.props.dispatch }
              priceOrRating={ this.props.priceOrRating }
              fixedOrHourly={ this.props.fixedOrHourly }
            />
        }
        { this.props.listOrMap === 'list' && <List /> }
        <FiltersPanel
          dispatch={ this.props.dispatch }
          fixedOrHourly={ this.props.fixedOrHourly }
        />
        <ReactCSSTransitionGroup
          transitionName='card-animation'
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 200 }
        >
          {
            this.props.cardFeature &&
              <Card
                key='card'
                feature={ this.props.cardFeature }
                dispatch={ this.props.dispatch }
              />
          }
        </ReactCSSTransitionGroup>
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
  professionalOrClient: state.professionalOrClient,
  professionalOrService: state.professionalOrService
});

export default connect(mapStateToProps)(App);
