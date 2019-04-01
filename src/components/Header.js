import React from 'react';
import Buttons from './Buttons';
import Search from './Search';
import ListMapSwitch from './ListMapSwitch';
import ProfessionalClientSwitch from './ProfessionalClientSwitch';
import ProfessionalServiceSwitch from './ProfessionalServiceSwitch';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="firstRow">
          <div className="logo">Humans</div>
          <ProfessionalClientSwitch
            dispatch={this.props.dispatch}
            professionalOrClient={this.props.professionalOrClient}
          />
          <Buttons />
        </div>
        <div className="secondRow">
          <Search />
          <div className="or">or</div>
          <div className="requestButton">Publish request</div>
        </div>
        <div className="thirdRow">
          <ProfessionalServiceSwitch
            dispatch={this.props.dispatch}
            professionalOrService={this.props.professionalOrService}
          />
          <div className="professionals-nearby">Professionals nearby</div>
          <ListMapSwitch
            dispatch={this.props.dispatch}
            listOrMap={this.props.listOrMap}
          />
        </div>
      </div>
    );
  }
}

export default Header;
