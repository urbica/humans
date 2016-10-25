import React from 'react';

class FiltersPanelToggle extends React.Component {
  render() {
    if (this.props.opened) {
      return (
        <div className='filters-panel-toggle' onClick={ this.props.onClick }>
          <img src='images/close-filters.png' alt='hide' />Hide all filters
        </div>
      );
    }

    return (
      <div className='filters-panel-toggle' onClick={ this.props.onClick }>
        <img src='images/open-filters.png' alt='all' />All filters
      </div>
    );
  }
}

module.exports = FiltersPanelToggle;
