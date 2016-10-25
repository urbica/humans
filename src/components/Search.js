import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div className='search'>
        <input
          type='text'
          className='searchInput'
          placeholder='What service do you need?'
        />
        <div className='searchButton'>Find</div>
      </div>
    );
  }
}

module.exports = Search;
