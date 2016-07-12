import React from 'react';
import { hideCard } from '../actions/actions.js';

const Card = React.createClass({
  render() {
    const { properties } = this.props.feature;
    const photo = properties.photo || 'photos/Leo.jpg';
    const onClick = () => this.props.dispatch(hideCard());

    return (
      <div className='card-container'>
        <div className='title' onClick={ onClick }>← Filters</div>
        <img className='photo' src={ photo } />
        <img className='card-mock' src='assets/card-mock.png' />
      </div>
    );
  }
});

module.exports = Card;
