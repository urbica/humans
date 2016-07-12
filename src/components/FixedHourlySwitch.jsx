import React from 'react';
import { switchFixedHourly } from '../actions/actions.js';

class FixedHourlySwitch extends React.Component {
  render() {
    const { dispatch, fixedOrHourly } = this.props;
    const onFixedClick = () => dispatch(switchFixedHourly('fixed'));
    const onHourlyClick = () => dispatch(switchFixedHourly('hourly'));

    const fixedClassName = fixedOrHourly === 'fixed' ? 'switcherButton active' : 'switcherButton';
    const hourlyClassName = fixedOrHourly === 'hourly' ? 'switcherButton active' : 'switcherButton';

    return (
      <div className='switcher price-hour-switch'>
        <div className={ fixedClassName } onClick={ onFixedClick }>Fixed price</div>
        <div className={ hourlyClassName } onClick={ onHourlyClick }>Hourly based</div>
      </div>
    );
  }
}

module.exports = FixedHourlySwitch;
