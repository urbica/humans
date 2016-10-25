import React from 'react';
import { switchListMap } from '../actions/actions.js';

class ListMapSwitch extends React.Component {
  render() {
    const { dispatch, listOrMap } = this.props;
    const onMapClick = () => dispatch(switchListMap('map'));
    const onListClick = () => dispatch(switchListMap('list'));

    const mapClassName = listOrMap === 'map' ? 'switcherButton active' : 'switcherButton';
    const listClassName = listOrMap === 'list' ? 'switcherButton active' : 'switcherButton';

    return (
      <div className='switcher list-map-switch'>
        <div className={ listClassName } onClick={ onListClick }>☰ List</div>
        <div
          className={ mapClassName }
          onClick={ onMapClick }
        >
          <img src='images/pin.svg' alt='map' /> Map
        </div>
      </div>
    );
  }
}

module.exports = ListMapSwitch;
