import React from 'react';

class ProfessionalServiceSwitch extends React.Component {
  render() {
    return (
      <div className='professional-service-switch'>
        <div className='tab active'>Professionals</div>
        <div className='tab'>Services</div>
      </div>
    );
  }
}

module.exports = ProfessionalServiceSwitch;
