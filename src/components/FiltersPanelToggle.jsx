import React from 'react';

class FiltersPanelToggle extends React.Component {
  render() {
    if (this.props.opened) {
      return (
        <div className='filters-panel-toggle' onClick={ this.props.onClick }>
          <img src='assets/images/close-filters.png'/>Hide all filters
        </div>
      );
    }

    return (
      <div className='filters-panel-toggle' onClick={ this.props.onClick }>
        <img src='assets/images/open-filters.png'/>All filters
      </div>
    );
  }
}

module.exports = FiltersPanelToggle;
