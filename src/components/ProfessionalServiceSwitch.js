import React from 'react';
import { switchProfessionalService } from '../actions/actions.js';

class ProfessionalServiceSwitch extends React.Component {
  render() {
    const { dispatch, professionalOrService } = this.props;
    const onProfessionalClick = () => dispatch(switchProfessionalService('professional'));
    const onServiceClick = () => dispatch(switchProfessionalService('service'));

    const professionalClassName = professionalOrService === 'professional' ? 'tab active' : 'tab';
    const serviceClassName = professionalOrService === 'service' ? 'tab active' : 'tab';

    return (
      <div className='professional-service-switch'>
        <div
          onClick={ onProfessionalClick }
          className={ professionalClassName }
        >
          Professionals
        </div>
        <div
          onClick={ onServiceClick }
          className={ serviceClassName }
        >
          Services
        </div>
      </div>
    );
  }
}

module.exports = ProfessionalServiceSwitch;
