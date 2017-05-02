import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Grid, Row, Col} from 'react-bootstrap';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'; 
import Data from '../../../data';

//===========    Redux   ===============
import { selectTeacher } from '../MentorshipActions';
import { getSelectedTeacherID } from '../MentorshipReducer';
import { connect } from 'react-redux';

class TeacherTabs extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      auth_token_Array : this.props.auth_token_Array,
    }; 
    this.handleActive = this.handleActive.bind(this);
    this.getBadgeContent = this.getBadgeContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let _this = this;
    if (_this.state.auth_token_Array != nextProps.auth_token_Array){
      this.setState({ auth_token_Array : nextProps.auth_token_Array });
    }
  }

  handleActive(tab) {
    this.props.dispatch(selectTeacher(tab.props.index));
  }
  
  getBadgeContent = (teacherID, teacherName)=>{
    let _this = this;
    if (_this.state.auth_token_Array.length < 8 ) return teacherName;
    for (var i =0 ; i < _this.state.auth_token_Array.length ; i++ ){
      if (_this.state.auth_token_Array[i].index == teacherID){
        return (
          _this.state.auth_token_Array[i].total_unread > 0 ?
                <Badge
                      badgeContent={_this.state.auth_token_Array[i].total_unread}
                      secondary={true}
                >
                    {teacherName}
                </Badge>
                :
                teacherName
        )
      }
    }
  }

  render(){
    return(
        <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0, width:'100%', height:'100%' }}>
            <Tabs>
                {
                  Data.TeacherTabs.map((teachertab,index)=>
                    //<Tab key={index} index={index} label = {teachertab.name} data-route="/dashboard" onActive={this.handleActive}>                
                    <Tab key={index} index={index} data-route="/dashboard" onActive={this.handleActive}
                    label = {
                      this.getBadgeContent(index, teachertab.name) 
                    }>                                          
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