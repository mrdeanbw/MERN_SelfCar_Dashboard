import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../../../theme-default';
import {Grid, Row, Col} from 'react-bootstrap';

import CircularProgress from 'material-ui/CircularProgress';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import request from '../../../../server/util/requestApi';
import { connect } from 'react-redux';
import $ from 'jquery';


import { getSessionToken, getSelectedTeacherID } from '../MentorshipReducer';
import Data from '../../../data';
import css from '../style/MessageList.css';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList : null,
      messageText  : '',
      isConversationsLoaded: '0', // 0 : initial,  1 : loadding, 2 : loaded 
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.generateWordTag = this.generateWordTag.bind(this);    
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    if ( this.props.messageUrl != nextProps.messageUrl ) {
      this.setState({ isConversationsLoaded : '1' });
    
      var settings = {
        "url": nextProps.messageUrl,
        "method": "GET",
        "headers": {
          "accept": "application/vnd.layer+json; version=1.0",
          "content-type": "application/json;charset=UTF-8",
          "authorization": 'Layer session-token="'+ nextProps.sessionToken +'"',
        }
      }
      $.ajax(settings).done(function (response) {
        this.setState({messageList: response});
        this.setState({ isConversationsLoaded : '2' });
        //console.log(response);
      }.bind(this));
    }
  }

  _handleTextFieldChange(e){
      this.setState({ messageText : e.target.value });
  }

 sendMessage(){
   if (!this.state.messageText)   return ;  
      //console.log(this.state.messageText);
      var settings = {
          "url": this.props.messageUrl,
          "method": "POST",
          "headers": {
            "accept": "application/vnd.layer+json; version=1.0",
            "authorization": 'Layer session-token="'+ this.props.sessionToken +'"',
      },
      "data": JSON.stringify(
             {
                  "parts": [
                      {
                          "body": this.state.messageText,
                          "mime_type": "text/plain"
                      },
                      // {
                      //     //"body": "YW55IGNhcm5hbCBwbGVhc3VyZQ==",
                      //     //"mime_type": "image/jpeg",
                      //     "encoding": "base64"
                      // }
                  ],
                  "notification": {
                      "title" : "New Message",
                      "text"  : "New Message",
                      "sound" : "chime.aiff"
                  }
              }) 
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      this.setState((prevState, props) => {
        return { messageList: [response, ...prevState.messageList] };
      });

    }.bind(this));
 }

 deleteMessage(messageUrlToDelete, messageIndexToDelete){
    var _this = this;
    var settings = {
      "url": messageUrlToDelete + '?mode=all_participants',
      "method": "DELETE",
      "headers": {
        "accept": "application/vnd.layer+json; version=1.0",
        "authorization": 'Layer session-token="'+ this.props.sessionToken +'"',
        "content-type": "application/json",
      }
    }

    $.ajax(settings).done(function (response) {     
      _this.setState((prevState,props)=>{
        messageList :  prevState.messageList.splice(messageIndexToDelete,1);
      })  
      //console.log(_this.state.messageList);  
    });
 }

 generateWordTag(message, messageIndex){
   let _this = this ;
   var messagestyle;
    return Object.keys(message.parts).map(function(k, index){
    
      if (message.sender.user_id == Data.TeacherTabs[_this.props.selectedTeacherID].guru_uid )
          messagestyle = css.message_blue;
        else 
          messagestyle = css.message_red;
 
      return (
              <div key={index}>
                  <div style={{ }}>
                      <IconMenu
                        iconButtonElement={<p className={messagestyle}> {message.parts[k].body} </p>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      >
                        <MenuItem primaryText="Delete Message" onClick={() => _this.deleteMessage(message.url, messageIndex)}/>
                      </IconMenu>
                  </div>       
                  <div> 
                    {message.sent_at} 
                    <hr/>
                  </div>
              </div>
             );
    });
 }

  render() {
    let _this = this;

   return (
        <Grid fluid={true} style={{width:'100%', height:'100%' }}>

            {this.state.isConversationsLoaded == '1'
              ?
                <MuiThemeProvider>
                  <CircularProgress
                    size={50}
                    thickness={3}
                    style={{
                    'marginLeft': '45%',
                    'marginTop' : '35%'
                  }}/>
                </MuiThemeProvider>
                :
                this.state.isConversationsLoaded == '2' ?
              <div style={{width:'100%', height:'100%' }}>
                <div style={{width:'100%', height:'calc(100% - 80px)', overflowY: 'scroll'}}>
                    
                    {        
                      //this.state.messageList &&
                      this.state.messageList.map((message, index) =>
                          this.generateWordTag(message, index)
                      ).reverse()
                    }
                </div>           
                <div style={{ width:'100%', height:'80px'}}  >    
                  <Row>
                    <Col xs = {10} sm={10} md={10}  lg={10}>
                        <TextField hintText="Write a message..."
                                    fullWidth={true}       
                                    value={this.state.messageText}                                         
                                    onChange = { this._handleTextFieldChange }
                        /> 
                    </Col>

                    <Col xs={2} sm={2} md={2} lg={2}>
                      <RaisedButton label="Send" primary={true} onClick={ this.sendMessage} style={{width: '80%'}}/>
                    </Col>
                  </Row>
                </div>
              </div>
              :
              null
            }
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionToken : getSessionToken(state),
    selectedTeacherID : getSelectedTeacherID(state)
  };
};

export default connect(
  mapStateToProps
)(MessageList);