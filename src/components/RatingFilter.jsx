import React from 'react';
import Slider from 'rc-slider';

const RatingFilter = React.createClass({
  getInitialState() {
    return {
      min: 0,
      max: 5
    };
  },

  handleOnChange([min, max]) {
    this.setState({ min, max });
  },

  render() {
    const { min, max } = this.state;

    return (
      <div className='rating-filter-container'>
        <span className='filter-label-min'>Rating { min }</span>
        <div className='rating-filter-slider-wrapper'>
          <Slider
            range
            min={ 0 }
            max={ 5 }
            allowCross={ true }
            tipFormatter={ null }
            defaultValue={ [min, max] }
            onChange={ this.handleOnChange }
          />
        </div>
        <span className='filter-label-max'>{ max }</span>
      </div>
    );
  }
});

module.exports = RatingFilter;
