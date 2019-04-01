import React from 'react';
import { switchProfessionalClient } from '../actions/actions.js';

class ProfessionalClientSwitch extends React.Component {
  render() {
    const { dispatch, professionalOrClient } = this.props;
    const onProfessionalClick = () =>
      dispatch(switchProfessionalClient('professional'));
    const onClientClick = () => dispatch(switchProfessionalClient('client'));

    const professionalClassName =
      professionalOrClient === 'professional' ? 'tab active' : 'tab';
    const clientClassName =
      professionalOrClient === 'client' ? 'tab active' : 'tab';

    return (
      <div className="professional-client-switch">
        <div className={professionalClassName} onClick={onProfessionalClick}>
          Find Professional
        </div>
        <div className={clientClassName} onClick={onClientClick}>
          Find Client
        </div>
      </div>
    );
  }
}

export default ProfessionalClientSwitch;
