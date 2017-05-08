import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


import Data from '../../../data';
//===========    Redux   ===============
import {selectStudent, fetchMessages,updateBadgeForTeacher } from '../MentorshipActions';
import {getSelectedStudentId, getUnreadMarkStuID } from '../MentorshipReducer';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';

const styles = {
  navbar: {
    marginLeft: 50,
    marginTop: 0,
    width: 230,
    background: '#3e5161'
  },
  drawer: {
    width: '315px',
    marginTop: '0px',
    backgroundColor: '#2e3d49',
    marginLeft: '50px',
    padding: '0px'
  },
  stumenu: {
    color: 'white'
  },
  activeItem: {
    color: '#02ccba',
    background: '#02ccba'
  }
};

class StuDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      studentsItems: this.props.stuDrawerItems,
      isStudentsLoaded: this.props.isStudentsLoaded,
      conversations   : this.props.conversations,
      markUnreadStuID : this.props.markUnreadStuID,
      fetchedMessages : [],
      selectedTeacherID : this.props.selectedTeacherID,
      badgeCounts_Array : [],
      isBadgeRemoved : [false,]
    };

    this.getBadgeContent = this.getBadgeContent.bind(this);
    this.generateBadgeCountArray = this.generateBadgeCountArray.bind(this);
    this.updateBadgeContent = this.updateBadgeContent.bind(this);
  }
  componentWillMount(){
    let _this = this;
    if (_this.state.conversations.length > 0 ) { 
      for (var conversation of _this.state.conversations){
        if  ((conversation.participants[1] == studentID) || (conversation.participants[0] == studentID) ){
          unread_message_count = conversation.unread_message_count ;
          _this.setState({ selectedMessageurl : conversation.messages_url })
          _this.setState((prevState, props) => {
              return { conversations_Array : [
                {
                  guru_id : Data.TeacherTabs[selectedTeacherID].guru_uid,
                  conversationData : res
                }, 
              ...prevState.badgeCounts] 
              };
            });

          return (     
              unread_message_count > 0 ?
              <Badge
                style = {{position : 'absolute', left : '250px'}}
                badgeContent={ unread_message_count }
                primary={true}
                badgeStyle={{top: 12, right: 12}}
              >     
              </Badge>
              :
              null
            );
        }
      }   
    }
  }
  componentWillReceiveProps(nextProps) {
    if ( this.state.studentsItems != nextProps.stuDrawerItems ) {
      this.setState({studentsItems: nextProps.stuDrawerItems});
    }
  
    if (this.state.isStudentsLoaded != nextProps.isStudentsLoaded){
      this.setState({ isStudentsLoaded : nextProps.isStudentsLoaded });
    }

    if (this.state.selectedTeacherID != nextProps.selectedTeacherID){
      this.setState({ selectedTeacherID : nextProps.selectedTeacherID });
      this.setState({ badgeCounts_Array : [] });
    }

    if (this.state.conversations != nextProps.conversations){
      this.setState({ conversations : nextProps.conversations });
      this.generateBadgeCountArray(nextProps.conversations);
    }
    if (this.state.markUnreadStuID != nextProps.markUnreadStuID){
      this.setState({ markUnreadStuID : nextProps.markUnreadStuID });
      this.updateBadgeContent(nextProps.markUnreadStuID, false);
    }
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });
  
  generateBadgeCountArray = (conversations)=>{
    let _this = this;
    let ntotal_unread = 0;
    
    var studentArray = Object.keys(_this.state.studentsItems);
    conversations.forEach( function (conversation){
      for (var i = 0;i < Object.keys(_this.state.studentsItems).length; i++){
         let stuID = studentArray[i];
         if (stuID == conversation.participants[0] || stuID == conversation.participants[1]){
          _this.setState((prevState, props) => {
              return { badgeCounts_Array : [{ 
                guru_uid : _this.state.selectedTeacherID,
                student_uid : stuID,
                unread_message_count : conversation.unread_message_count,
              }, 
              ...prevState.badgeCounts_Array] 
              };
            });           
         }
      }
    });  
  }

  getBadgeContent = (studentID)=>{
    let unread_message_count = 0;
    let _this = this;
    if (_this.state.badgeCounts_Array.length > 0){
      function hasStudentID(element) {
        if (element.student_uid == studentID)
          return element;
      }
      var result = _this.state.badgeCounts_Array.find(hasStudentID); 
      return (
          result?     
          result.unread_message_count > 0 ?
          <Badge
            style = {{position : 'absolute', left : '250px'}}
            badgeContent={ result.unread_message_count }
            primary={true}
            badgeStyle={{top: 12, right: 12}}
          >     
          </Badge>
          :
          null
          :
          null
        );
      }
  }
  updateBadgeContent(studentID,isBadgeRemoved){
    let _this = this;
    const {dispatch} = _this.props;
    _this.setState((prevState, props) =>{
      let temp = [];
      Object.assign(temp, prevState.badgeCounts_Array);
      for (let i = 0 ;  i < temp.length; i++){
        if (temp[i].student_uid == studentID){
          if (isBadgeRemoved == true)
          {
            let tempBadgeToRemove = {
              'stuID' : studentID,
              'teacherID' : _this.state.selectedTeacherID,
              'badgeCountToRemove' : temp[i].unread_message_count
            }
            dispatch(updateBadgeForTeacher(tempBadgeToRemove));
            temp[i].unread_message_count = 0;
          }
          else
            temp[i].unread_message_count += 1;
          break
        }
      }
      return { badgeCounts_Array : temp }; 
    });
  }

  render() {
    var handleMessageItems = this.props.handleMessageItems;
    const {dispatch} = this.props;
    
    return (
      <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0, width:'100%', height:'100%' }}>
        <Drawer
          containerStyle={styles.drawer}
          overlayStyle  ={styles.drawer}
          docked={false}
          open={this.state.open}>
          <MenuItem
            style={{
            backgroundColor: '#1c262f',
            color: 'white'
          }}>
              Self-Driving Car Engineer Nanodegree  <br/>
              { this.state.isStudentsLoaded == '2'
                ?   <span style={{marginLeft : '30%' }}>{Object.keys(this.state.studentsItems).length + '  students'}</span>
                :
                    null
              }
          </MenuItem>
          {this.state.isStudentsLoaded == '1'
            ? <MuiThemeProvider>
                <CircularProgress
                  size={60}
                  thickness={4}
                  style={{
                  'marginLeft': '40%',
                  'marginTop': '130%'
                }}/>
              </MuiThemeProvider>
            : Object
              .keys(this.state.studentsItems)
              .map((k, index) => k != this.props.selectedStudentId
                ? <MenuItem
                    key={k}
                    onClick={() => {
                    dispatch(selectStudent(k));
                    this.setState({isBadgeRemoved : true});
                    this.updateBadgeContent(k,true);
                  }}
                    style={{
                    height: 70,
                    color: 'white',
                    'borderBottom': '1px solid #1c262f',
                    'paddingTop': '10px',
                    backgroundColor: 'rgb(46, 61, 73)'
                  }}
                    data-route="/dashboard">
                    {this.state.studentsItems[k].first_name + ' ' + this.state.studentsItems[k].last_name}
                    {
                        this.getBadgeContent(k)       
                    }
                  </MenuItem>
                : <MenuItem
                  key={k}
                  onClick={() => {
                  dispatch(selectStudent(k));
                  this.setState({isBadgeRemoved : true});
                }}
                  style={{
                  height: 70,
                  color: 'white',
                  'borderBottom': '1px solid #1c262f',
                  'paddingTop': '10px',
                  backgroundColor: '#02ccba'
                }}
                  data-route="/dashboard">
                  {this.state.studentsItems[k].first_name + ' ' + this.state.studentsItems[k].last_name}
                </MenuItem>)
        }
        </Drawer>
      </Grid>
    );
  }
}

function select(state) {
  return {
    selectedStudentId: getSelectedStudentId(state),
    markUnreadStuID : getUnreadMarkStuID(state)
  }
}

export default connect(select)(StuDrawer);