import React from 'react';
import CityFilter from './CityFilter.jsx';
import JobsFilter from './JobsFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import RatingFilter from './RatingFilter.jsx';
import OnlineFilter from './OnlineFilter.jsx';
import LanguageFilter from './LanguageFilter.jsx';
import FixedHourlySwitch from './FixedHourlySwitch.jsx';
import FiltersPanelToggle from './FiltersPanelToggle.jsx';

const FiltersPanel = React.createClass({
  getInitialState() {
    return {
      opened: false
    };
  },

  toggle() {
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
            <div>
              <JobsFilter />
              <LanguageFilter />
              <CityFilter />
            </div>
        }
        <FiltersPanelToggle onClick={ this.toggle } opened={ this.state.opened } />
      </div>
    );
  }
});

module.exports = FiltersPanel;
