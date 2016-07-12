import React from 'react';
import Buttons from './Buttons.jsx';
import Search from './Search.jsx';
import ListMapSwitch from './ListMapSwitch.jsx';
import ProfessionalClientSwitch from './ProfessionalClientSwitch.jsx';
import ProfessionalServiceSwitch from './ProfessionalServiceSwitch.jsx';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <div className='firstRow'>
          <div className='logo'>Humans</div>
          <ProfessionalClientSwitch
            dispatch={ this.props.dispatch }
            professionalOrClient={ this.props.professionalOrClient }
          />
          <Buttons />
        </div>
        <div className='secondRow'>
          <Search />
          <div className='or'>or</div>
          <div className='requestButton'>Publish request</div>
        </div>
        <div className='thirdRow'>
          <ProfessionalServiceSwitch />
          <div className='professionals-nearby'>Professionals nearby</div>
          <ListMapSwitch
            dispatch={ this.props.dispatch }
            listOrMap={ this.props.listOrMap }
          />
        </div>
      </div>
    );
  }
}

module.exports = Header;
