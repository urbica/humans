import React from 'react';
import Select from 'react-select';

const LanguageFilter = React.createClass({
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
      { value: 'en', label: 'English' },
      { value: 'ru', label: 'Russian' }
    ];

    return (
      <div className='language-filter-container'>
        <Select
          value={ this.state.value }
          options={ options }
          onChange={ this.handleOnChange }
          placeholder='Speaks'
        />
      </div>
    );
  }
});

module.exports = LanguageFilter;
