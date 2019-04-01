import React from 'react';
import Slider from 'rc-slider';

const PriceFilter = React.createClass({
  getInitialState() {
    return {
      min: 0,
      max: 150
    };
  },

  handleOnChange([min, max]) {
    this.setState({ min, max });
  },

  render() {
    const { min, max } = this.state;

    return (
      <div className="price-filter-container">
        <span className="filter-label-min">${min}</span>
        <div className="price-filter-slider-wrapper">
          <Slider
            range
            min={0}
            max={150}
            allowCross={true}
            tipFormatter={null}
            defaultValue={[min, max]}
            onChange={this.handleOnChange}
          />
        </div>
        <span className="filter-label-max">${max}</span>
      </div>
    );
  }
});

export default PriceFilter;
