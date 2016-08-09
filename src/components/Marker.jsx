import React from 'react';
import { connect } from 'react-redux';

const Marker = React.createClass({
  render() {
    const { feature, priceOrRating, fixedOrHourly } = this.props;
    const { photo, price, rating } = feature.properties;

    let title;
    if (priceOrRating === 'price') {
      if (fixedOrHourly === 'fixed') {
        title = `$ ${price * 6} fixed`;
      } else {
        title = `$ ${price} hourly`;
      }
    } else {
      title = `★ ${rating}`;
    }

    return (
      <div className='marker-container' onClick={ this.props.onClick }>
        <img className='photo' src={ photo } />
        <div className='title'>{ title }</div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  priceOrRating: state.priceOrRating,
  fixedOrHourly: state.fixedOrHourly
});

export default connect(mapStateToProps)(Marker);
