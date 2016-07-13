import React from 'react';

class AllFilters extends React.Component {
  render() {
    return (
      <div className='all-filters' onClick={ this.props.onClick }>
        <img src='assets/sliders.png'/>All filters
      </div>
    );
  }
}

module.exports = AllFilters;
