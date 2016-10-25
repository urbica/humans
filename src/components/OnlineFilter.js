import React from 'react';

const OnlineFilter = React.createClass({
  render() {
    return (
      <div className='online-filter-container'>
        <input
          id='online-filter-checkbox'
          type='checkbox'
          className='online-filter-checkbox'
        />
        <label
          htmlFor='online-filter-checkbox'
          className='online-filter-label'
        >
          only online
        </label>
      </div>
    );
  }
});

module.exports = OnlineFilter;
