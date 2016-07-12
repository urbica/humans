import React from 'react';
import { connect } from 'react-redux';

const Marker = React.createClass({
  render() {
    const { feature, priceOrRating, fixedOrHourly } = this.props;
    const { properties } = feature;

    const photo = properties.photo || 'photos/Emil.jpg';
    const price = properties.price || 25;
    const rating = properties.rating || 4.8;

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
      <div onClick={ this.props.onClick }>
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
