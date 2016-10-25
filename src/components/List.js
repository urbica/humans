import React from 'react';

const List = React.createClass({
  render() {
    return (
      <div className='list' onClick={ this.props.onClick }>Coming soon!</div>
    );
  }
});

export default List;
