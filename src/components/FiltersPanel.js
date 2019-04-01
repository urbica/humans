import React from 'react';
import CityFilter from './CityFilter';
import JobsFilter from './JobsFilter';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import OnlineFilter from './OnlineFilter';
import LanguageFilter from './LanguageFilter';
import FixedHourlySwitch from './FixedHourlySwitch';
import FiltersPanelToggle from './FiltersPanelToggle';

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
    const className = this.state.opened
      ? 'filters-panel-container opened'
      : 'filters-panel-container';

    return (
      <div className={className}>
        <div className="title">Filter results</div>
        <FixedHourlySwitch
          dispatch={this.props.dispatch}
          fixedOrHourly={this.props.fixedOrHourly}
        />
        <PriceFilter />
        <RatingFilter />
        <OnlineFilter />
        {this.state.opened && (
          <div>
            <JobsFilter />
            <LanguageFilter />
            <CityFilter />
          </div>
        )}
        <FiltersPanelToggle onClick={this.toggle} opened={this.state.opened} />
      </div>
    );
  }
});

export default FiltersPanel;
