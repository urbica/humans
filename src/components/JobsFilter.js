import React from 'react';
import Slider from 'rc-slider';

const JobsFilter = React.createClass({
  getInitialState() {
    return {
      min: 0,
      max: 50
    };
  },

  handleOnChange([min, max]) {
    this.setState({ min, max });
  },

  render() {
    const { min, max } = this.state;

    return (
      <div className="jobs-filter-container">
        <span className="filter-label-min">Jobs {min}</span>
        <div className="jobs-filter-slider-wrapper">
          <Slider
            range
            min={0}
            max={50}
            onChange={this.handleOnChange}
            allowCross={true}
            tipFormatter={null}
            defaultValue={[min, max]}
          />
        </div>
        <span className="filter-label-max">{max}</span>
      </div>
    );
  }
});

export default JobsFilter;
