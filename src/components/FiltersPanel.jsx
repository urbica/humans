import React from 'react';
import AllFilters from './AllFilters.jsx';
import PriceFilter from './PriceFilter.jsx';
import RatingFilter from './RatingFilter.jsx';
import OnlineFilter from './OnlineFilter.jsx';
import FixedHourlySwitch from './FixedHourlySwitch.jsx';

class FiltersPanel extends React.Component {
  render() {
    return (
      <div className='filters-panel-container'>
        <div className='title'>Filter results</div>
        <FixedHourlySwitch
          dispatch={ this.props.dispatch }
          fixedOrHourly={ this.props.fixedOrHourly }
        />
        <PriceFilter />
        <RatingFilter />
        <OnlineFilter />
        <AllFilters />
      </div>
    );
  }
}

module.exports = FiltersPanel;
