import React from 'react';
import AllFilters from './AllFilters.jsx';
import JobsFilter from './JobsFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import RatingFilter from './RatingFilter.jsx';
import OnlineFilter from './OnlineFilter.jsx';
import FixedHourlySwitch from './FixedHourlySwitch.jsx';

const FiltersPanel = React.createClass({
  getInitialState() {
    return {
      opened: false
    };
  },

  toggle() {
    console.log('toggle');
    this.setState({ opened: !this.state.opened });
  },

  render() {
    const className = this.state.opened ?
      'filters-panel-container opened' : 'filters-panel-container';

    return (
      <div className={ className }>
        <div className='title'>Filter results</div>
        <FixedHourlySwitch
          dispatch={ this.props.dispatch }
          fixedOrHourly={ this.props.fixedOrHourly }
        />
        <PriceFilter />
        <RatingFilter />
        <OnlineFilter />
        {
          this.state.opened &&
            <JobsFilter />
        }
        <AllFilters onClick={ this.toggle } />
      </div>
    );
  }
});

module.exports = FiltersPanel;
