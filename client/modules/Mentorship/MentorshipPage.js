import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../../components/Header';
import LeftDrawer from '../../components/LeftDrawer';

import fetch from 'isomorphic-fetch';

//=================== Redux ========================

import { connect } from 'react-redux';
import { getSelectedStudentId, getSelectedTeacherID, getFetchedMessages } from './MentorshipReducer';
import { updateSessionToken } from './MentorshipActions';
//=================== /Redux ========================

import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../../theme-default';
import Data from '../../data';
import request from '../../../server/util/requestApi';
import $ from 'jquery';

//=================== Components ========================
import TeacherTabs    from   './components/TeacherTabs';
import StuDrawer      from   './components/StuDrawer';
import SubjectDrawer  from   './components/SubjectDrawer';
import MessageList    from   './components/MessageList';

//=================== Material UI components ========================
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-bootstrap';
import Forms from 'react-bootstrap';

import axios from 'axios';
import { getAuthToken } from '../../../server/util/request';

class MentorshipPage extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
        navDrawerOpen: true,
        students : {},

        selectedStudentID: '',
        selectedTeacherID: '-1',
        selectedConversationId :'',
        selectedMessageurl : '',
        
        auth_token : {},
        auth_token_Array : [],
        students_Array : [],     // All students for all teachers
        conversations_Array : [],
        isStudentsLoaded : '0',  // 0 : initial,  1 : loadding, 2 : loaded 
        
        conversations: '',
        fetchedMessages : [],
        messageItems : {},
        session_token : '',
        messageText   : "",
    };

    this.fetchConversations  = this.fetchConversations.bind(this);
    this.fetchConversationsForTeachers = this.fetchConversationsForTeachers.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.getMessageURLfromConversation = this.getMessageURLfromConversation.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }

  componentDidMount(){
    let _this = this;
    Data.TeacherTabs.map(function(teacher,teacherIndex){
        let settings = {                
          "url": "https://hoth.udacity.com/v2/authenticate",
          "method": "POST",
          "headers": {
            "accept": "application/json",
            "content-type": "application/json",
          },
          "data": JSON.stringify(
          {
            "email"    : teacher.email,
            "password" : teacher.passWord,
          }) 
        }
        $.ajax(settings).done(function (response) {
           var auth_token_temp = "Bearer " + JSON.parse(response).jwt;
            _this.setState((prevState, props) => {
              return { auth_token_Array : [{ 
                index : teacherIndex,  
                guru_uid : teacher.guru_uid, 
                auth_token : auth_token_temp,
                total_unread : 0,
              }, 
              ...prevState.auth_token_Array] 
              };
            });
            let settings = {
              "url": "https://guru.udacity.com/api/guru/get_students?guru_uid=" + Data.TeacherTabs[teacherIndex].guru_uid,
              "method": "GET",
              "headers": {
                "authorization": "Bearer " + JSON.parse(response).jwt ,
              }
            };

            $.ajax(settings).done(function (res) {
              _this.setState((prevState, props) => {
                return { students_Array : [
                  {
                    guru_id : Data.TeacherTabs[teacherIndex].guru_uid,
                    studata : res
                  }, 
                ...prevState.students_Array] 
                };
              });  
            });
           _this.fetchConversationsForTeachers(teacherIndex,auth_token_temp);
        });
  });
  }
 
  componentWillReceiveProps(nextProps){
    let _this = this; 
    if (this.state.fetchedMessages != nextProps.fetchedMessages){
      this.setState({ fetchedMessages : nextProps.fetchedMessages });    
    }
      // Only when the props are changed 
      if (this.state.selectedTeacherID != nextProps.selectedTeacherID || this.state.selectedStudentID != nextProps.selectedStudentId){
          if (this.state.selectedTeacherID != nextProps.selectedTeacherID) 
            { 
              this.setState({ isStudentsLoaded : '1' });
              this.setState({ selectedTeacherID : nextProps.selectedTeacherID });
          
              let settings = {                
                "url": "https://hoth.udacity.com/v2/authenticate",
                "method": "POST",
                "headers": {
                  "accept": "application/json",
                  "content-type": "application/json",
                },
                "data": JSON.stringify(
                {
                  "email"    : Data.TeacherTabs[nextProps.selectedTeacherID].email,
                  "password" : Data.TeacherTabs[nextProps.selectedTeacherID].passWord,
                }) 
              }

              $.ajax(settings).done(function (response) {
                  _this.setState({auth_token : "Bearer " + JSON.parse(response).jwt });
                  let settings = {
                    "url": "https://guru.udacity.com/api/guru/get_students?guru_uid=" + Data.TeacherTabs[nextProps.selectedTeacherID].guru_uid,
                    "method": "GET",
                    "headers": {
                      "authorization": "Bearer " + JSON.parse(response).jwt  ,
                    }
                  }

                  $.ajax(settings).done(function (res) {
                      _this.setState({ students : res.students });
                      _this.setState({isStudentsLoaded : '2'});
                      _this.fetchConversations(nextProps.selectedTeacherID);
                      
                  });
              });    
            }   
        if (this.state.selectedStudentID != nextProps.selectedStudentId){
          this.setState({ selectedStudentID : nextProps.selectedStudentId });
          this.getMessageURLfromConversation(this.state.conversations, nextProps.selectedStudentId );
        }          
      }
  }
  
  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  fetchConversations(selectedTeacherID){
    let _this = this;

  $.ajax({
    method: "POST",
    url: "https://api.layer.com/nonces",
    headers : { Accept : "application/vnd.layer+json; version=1.0" }
  })
  .done(function( res ) {

        $.ajax({
          method: "POST",
          url: "https://guru.udacity.com/api/get_identity_token",
          headers : { 'accept'  : 'application/json, text/plain', 
                      'Content-Type'  : 'application/json; charset=UTF-8',                     
                      'Authorization' : _this.state.auth_token,
                    },
          data: JSON.stringify({
              "nonce" : res.nonce,
              "uid"   : Data.TeacherTabs[selectedTeacherID].guru_uid
        })
    })
    .done(function(res){          
        $.ajax({
            method: "POST",
            url: "https://api.layer.com/sessions",
            headers : { 'accept'  : 'application/vnd.layer+json; version=1.0' },
            data: JSON.stringify({
                'app_id' : "layer:///apps/production/7681aaf4-21fa-11e6-a25e-59700300610c",
                'identity_token'   : res.identity_token
        })
    })
    .done(function(res){
        _this.props.dispatch(updateSessionToken(res.session_token));
        $.ajax({
            method: "GET",
            url: "https://api.layer.com/conversations?sort_by=created_at&page_size=100",
            headers : {  'accept'  : 'application/vnd.layer+json; version=1.0' ,
                        'authorization' : 'Layer session-token="' +   res.session_token + '"' },
        })
    .done(function(res){
        _this.setState({conversations : res });
      })
     })
    })
  });
}

  fetchConversationsForTeachers(selectedTeacherID, auth_token ){
    let _this = this;

    $.ajax({
      method: "POST",
      url: "https://api.layer.com/nonces",
      headers : { Accept : "application/vnd.layer+json; version=1.0" }
    })
    .done(function( res ) {    
          $.ajax({
            method: "POST",
            url: "https://guru.udacity.com/api/get_identity_token",
            headers : { 'accept'  : 'application/json, text/plain', 
                        'Content-Type'  : 'application/json; charset=UTF-8',                     
                        'Authorization' : auth_token,
                      },
            data: JSON.stringify({
                "nonce" : res.nonce,
                "uid"   : Data.TeacherTabs[selectedTeacherID].guru_uid
          })
      })
      .done(function(res){          
          $.ajax({
              method: "POST",
              url: "https://api.layer.com/sessions",
              headers : { 'accept'  : 'application/vnd.layer+json; version=1.0' },
              data: JSON.stringify({
                  'app_id' : "layer:///apps/production/7681aaf4-21fa-11e6-a25e-59700300610c",
                  'identity_token'   : res.identity_token
          })
      })
      .done(function(res){
          $.ajax({
              method: "GET",
              url: "https://api.layer.com/conversations?sort_by=created_at&page_size=100",
              headers : {  'accept'  : 'application/vnd.layer+json; version=1.0' ,
                          'authorization' : 'Layer session-token="' +   res.session_token + '"' },
      })
      .done(function(res){
          _this.setState((prevState, props) => {
              return { conversations_Array : [
                {
                  guru_id : Data.TeacherTabs[selectedTeacherID].guru_uid,
                  conversationData : res
                },
              ...prevState.conversations_Array] 
              };
            });

          let ntotal_unread = 0;
          res.forEach( function (conversation){
            for (let i = 0;i < _this.state.students_Array.length; i++){
              if (_this.state.students_Array[i].guru_id == Data.TeacherTabs[selectedTeacherID].guru_uid){
                Object.keys(_this.state.students_Array[i].studata.students).forEach(function(key){
                    if (conversation.participants[0] == key || conversation.participants[1] == key){
                      ntotal_unread += conversation.unread_message_count;
                    }
                })
              }
            }
          });
          _this.setState((prevState, props) =>{
            let temp = [];
            Object.assign(temp, prevState.auth_token_Array);
            for (let i = 0 ;  i < temp.length; i++){
              if (temp[i].index == selectedTeacherID){
                temp[i].total_unread = ntotal_unread;
                break
              }
            }
            return { auth_token_Array : temp }; 
          });
        })
      })
      })
    });
  }

  getMessageURLfromConversation(conversations, selectedStudentID ){
      let _this  = this;
      let messageurl = null;      
      for (var conversation of conversations){
        if  ((conversation.participants[1] == selectedStudentID) || (conversation.participants[0] == selectedStudentID) ){
          messageurl = conversation.messages_url ;
          _this.setState({ selectedMessageurl : conversation.messages_url })
          return messageurl;
          break ; 
        }
      }
  }

  _handleTextFieldChange(e){
      this.setState({ messageText : e.target.value });
  }

  render(){ 
      let   { navDrawerOpen } = this.state;   
      const paddingLeftDrawerOpen = 236;

      const styles = {
        header: {
          paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
        },
        container: {
          margin: '80px 20px 20px 15px',
          paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
        },
        messagelist: {
          marginLeft : 360,
          height : 500  
        },
        messagebox: {
          marginLeft : 380,
          marginTop  : 20,   
        }
      };
    
    return (
        <MuiThemeProvider muiTheme={ThemeDefault}>
            <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0, width:'100vw', height:'100vh' }}>
              <div style={{width:'50px', height:'100%', display:'inline-block'}}>
                  <SubjectDrawer/>
              </div>

              <div style={{width:'300px', height:'100%', display:'inline-block'}}>
                  <StuDrawer isStudentsLoaded = {this.state.isStudentsLoaded} stuDrawerItems={this.state.students} selectedTeacherID ={this.state.selectedTeacherID} conversations={this.state.conversations} />
              </div>

              <div style={{position:'absolute', left:350, top:0, width:'calc(100% - 350px)', height:'100%', display:'inline-block'}}>
                  <div style={{width:'100%', height:'50px'}}>
                      <TeacherTabs auth_token_Array= {this.state.auth_token_Array} />
                  </div>
                  <div style={{width:'100%', height:'calc(100% - 50px)'}}>
                      <MessageList messageUrl={this.state.selectedMessageurl} />
                  </div>
              </div>
            </Grid>
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedStudentId : getSelectedStudentId(state),
    selectedTeacherID : getSelectedTeacherID(state),
    fetchedMessages   : getFetchedMessages(state)
  };
};

export default connect(
  mapStateToProps
)(MentorshipPage);
