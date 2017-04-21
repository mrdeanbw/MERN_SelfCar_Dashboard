import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Grid, Row, Col} from 'react-bootstrap';

import Data from '../../../data';

import { selectTeacher } from '../MentorshipActions';
import { getSelectedTeacherID } from '../MentorshipReducer';
import { connect } from 'react-redux';

class TeacherTabs extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      open: true,
    }; 
    this.handleActive = this.handleActive.bind(this);
  }
  handleActive(tab) {
    console.log(tab.props.index);
    this.props.dispatch(selectTeacher(tab.props.index));
  }
  render(){
    return(
        <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0, width:'100%', height:'100%' }}>
          <Tabs>
              {
                Data.TeacherTabs.map((teachertab,index)=>
                  <Tab key={index} index={index} label = {teachertab.name} data-route="/dashboard" onActive={this.handleActive}>                

                  </Tab>
                )
              }
          </Tabs>
        </Grid>
    );
  }
}

function select(state) {
  return {selectedTeacherID: getSelectedTeacherID(state)}
}

export default connect(select)(TeacherTabs);