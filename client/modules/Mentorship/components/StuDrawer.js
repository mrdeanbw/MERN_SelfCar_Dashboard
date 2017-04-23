import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {getSelectedStudentId} from '../MentorshipReducer';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


import Data from '../../../data';
//===========    Redux   ===============
import {selectStudent} from '../MentorshipActions';
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
      conversations  : this. props.conversations,
    };

    this.getbadgeContent = this.getbadgeContent.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if ( this.state.studentsItems != nextProps.stuDrawerItems ) {
      this.setState({studentsItems: nextProps.stuDrawerItems});
      //this.setState({ isStudentsLoaded: true});
      //this.setState({ isStudentsLoaded: false });
    }
    if (this.state.isStudentsLoaded != nextProps.isStudentsLoaded){
      this.setState({ isStudentsLoaded : nextProps.isStudentsLoaded });
    }
    if (this.state.conversations != nextProps.conversations){
      this.setState({ conversations : nextProps.conversations });
    }
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });
  
  
  getbadgeContent = (studentID)=>{
    let unread_message_count = 0;
    console.log(this.state.conversations);
    if (this.state.conversations.length > 0 ) { 
      for (var conversation of this.state.conversations){
        if  ((conversation.participants[1] == studentID) || (conversation.participants[0] == studentID) ){
          unread_message_count = conversation.unread_message_count ;
          //_this.setState({ selectedMessageurl : conversation.messages_url })
   


                    return (     
                      unread_message_count > 0 ?
                      <Badge
                      badgeContent={ unread_message_count }
                      primary={true}
                      //badgeStyle={{top: 12, right: 12}}
                      >     
                      </Badge>
                      :
                      null
                      );
                 
                      
        }
      }   
    }
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
                    {this.getbadgeContent(k)} 
                   
                  </MenuItem>
                : <MenuItem
                  key={k}
                  onClick={() => {
                  dispatch(selectStudent(k));
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
  return {selectedStudentId: getSelectedStudentId(state)}
}

export default connect(select)(StuDrawer);