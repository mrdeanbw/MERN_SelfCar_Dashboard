import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../../../theme-default';
import {Grid, Row, Col} from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';

import request from '../../../../server/util/requestApi';
import { connect } from 'react-redux';
import $ from 'jquery';


import { getSessionToken, getSelectedTeacherID } from '../MentorshipReducer';
import Data from '../../../data';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList : null,
      messageText  : '',
      isConversationsLodded: false,
    };

    this.sendMessage = this.sendMessage.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.generateWordTag = this.generateWordTag.bind(this);
    
  }

  componentWillMount() {

  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

      this.setState({isConversationsLodded : false});
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": nextProps.messageUrl,
        "method": "GET",
        "headers": {
          "accept": "application/vnd.layer+json; version=1.0",
          "content-type": "application/json;charset=UTF-8",
          "authorization": 'Layer session-token="'+ nextProps.sessionToken +'"',
          "cache-control": "no-cache",
        }
      }

      $.ajax(settings).done(function (response) {
        this.setState({messageList: response});
        this.setState({isConversationsLodded : true});
        console.log(response);
      }.bind(this));
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

 generateWordTag(message)
 {  
   let _this = this ;
    return Object.keys(message.parts).map(function(k, index){
    
      if (message.sender.user_id== Data.TeacherTabs[_this.props.selectedTeacherID].guru_uid ){
           
         var messagestyle = {   'borderRadius' : '7px',
                                "color"        : "white",
                                'background'   : '#02b3e4',
                                'padding'      : '20px', 
                                'maxWidth'     : '45%',
                                'marginLeft'   : '750px',                              
                            }
        }
      else {
         var messagestyle = {   'borderRadius' : '7px',
                                "color"        : "black",
                                'background'   : '#e0c8c8',
                                'padding'      : '20px', 
                                'maxWidth'     : '45%',
                                'marginLeft'   : '40px',          
                            }
      }
      return (
              <div key={index}>
                  <p style={messagestyle}> {message.parts[k].body} </p>
              </div>
             );
    });
 }

  render() {
    let _this = this;

   return (
        <Grid fluid={true} style={{width:'100%', height:'100%' }}>

            {this.state.isConversationsLodded == false
              ? <MuiThemeProvider>
                  <CircularProgress
                    size={50}
                    thickness={3}
                    style={{
                    'marginLeft': '45%',
                    'marginTop' : '35%'
                  }}/>
                </MuiThemeProvider>
                :
               <div style={{width:'100%', height:'100%' }}>
                <div style={{width:'100%', height:'calc(100% - 80px)', overflowY: 'scroll'}}>
                    {
                      //_this.state.messageList &&
                      _this.state.messageList.map((message) =>
                          this.generateWordTag(message)
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