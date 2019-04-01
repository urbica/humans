import React from 'react';
import { switchPriceRating } from '../actions/actions.js';

class PriceRatingSwitch extends React.Component {
  render() {
    const { dispatch, priceOrRating } = this.props;
    const onPriceClick = () => dispatch(switchPriceRating('price'));
    const onRatingClick = () => dispatch(switchPriceRating('rating'));

    const priceClassName =
      priceOrRating === 'price' ? 'switcherButton active' : 'switcherButton';
    const ratingClassName =
      priceOrRating === 'rating' ? 'switcherButton active' : 'switcherButton';

    return (
      <div className="switcher price-rating-switch">
        <div className={priceClassName} onClick={onPriceClick}>
          Price
        </div>
        <div className={ratingClassName} onClick={onRatingClick}>
          Rating
        </div>
      </div>
    );
  }
}

export default PriceRatingSwitch;
