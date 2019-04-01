import React from 'react';
import Select from 'react-select';

const CityFilter = React.createClass({
  getInitialState() {
    return {
      value: undefined
    };
  },

  handleOnChange(value) {
    this.setState({ value });
  },

  render() {
    const options = [
      { value: 'ny', label: 'New-York' },
      { value: 'msc', label: 'Moscow' },
      { value: 'ekb', label: 'Yekaterinburg' }
    ];

    return (
      <div className="city-filter-container">
        <Select
          value={this.state.value}
          options={options}
          onChange={this.handleOnChange}
          placeholder="City"
        />
      </div>
    );
  }
});

export default CityFilter;
