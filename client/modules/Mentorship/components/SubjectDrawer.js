import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

const styles = {
  drawer: {
    width: '50px',
    marginTop: '0px',
    marginLeft: '0px',
    backgroundColor: '#1c262f',
    padding: '0px'
  },

  subjectmenu: {
    color: 'white'
  }
};

export default class SubjectDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  render() {
    return (
      <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0, width:'100%', height:'100%' }}>
        <div>
          <Drawer
            containerStyle={styles.drawer}
            overlayStyle={styles.drawer}
            docked={false}
            open={this.state.open}>
            <MenuItem style={styles.subjectmenu}>
              <SvgIcon>
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M10.012 0L0 5.737v13.22C0 25.03 4.894 29.961 10.969 29.98c2.006 0 3.9-.525 5.512-1.462l8.1-4.65a10.018 10.018 0 0 0 5.4-8.85V1.2L27.994.038 19.875 4.65v14.381c0 .619-.056 1.219-.188 1.819a8.803 8.803 0 0 1-.524 1.688c-.057.13-.132.28-.188.412-.244-.019-.3-.037-.675-.113-.525-.112-1.575-.412-2.831-1.218a7.426 7.426 0 0 1-1.181-.975 8.368 8.368 0 0 1-.976-1.181 8.68 8.68 0 0 1-.73-1.37 8.676 8.676 0 0 1-.47-1.5c-.112-.524-.13-1.068-.13-1.612V1.162L10.011 0zm4.425 27.3c-.543.225-1.106.394-1.687.525-.6.113-1.144.188-1.744.169a8.436 8.436 0 0 1-1.819-.188 8.803 8.803 0 0 1-1.687-.525 9.136 9.136 0 0 1-1.519-.825A9.262 9.262 0 0 1 4.65 25.35a9.124 9.124 0 0 1-1.088-1.331 9.313 9.313 0 0 1-.825-1.538 10.362 10.362 0 0 1-.525-1.687c-.112-.6-.168-1.2-.15-1.819V6.9l7.894-4.594v12.657a9.967 9.967 0 0 0 7.857 9.806c-.17.206-.3.412-.507.619a9.124 9.124 0 0 1-1.331 1.087c-.487.337-1.012.6-1.537.825zM27.77 16.631a8.676 8.676 0 0 1-.469 1.5c-.206.469-.45.938-.75 1.35a7.426 7.426 0 0 1-.975 1.181 8.368 8.368 0 0 1-1.181.976 8.68 8.68 0 0 1-1.369.73 8.102 8.102 0 0 1-1.5.47c-.112.018-.262.037-.356.056.45-1.2.768-2.494.768-3.863V5.794l6-3.45V15c0 .563-.056 1.106-.168 1.631z"
                    fill="#02B3E4"/>
                </g>
              </SvgIcon>
            </MenuItem>
            <MenuItem style={styles.subjectmenu}>SC</MenuItem>
            <MenuItem style={styles.subjectmenu}>AI</MenuItem>
            <MenuItem style={styles.subjectmenu}>DM</MenuItem>
            <MenuItem
              style={{
                bottom: '5px',
                position: 'fixed',
                paddingTop: '20px',
              }}
              containerElement={< Link to = {
              '/'
            } />}>
              <SvgIcon>
                <g fill="#FFF" fillRule="evenodd">
                  <path
                    d="M18.515 9l-3.23-3.3 1.43-1.4 5 5.11a1 1 0 0 1-.016 1.415l-5 4.89-1.398-1.43L18.66 11H8V9h10.515z"/>
                  <path
                    d="M12 18H2.62c-.326 0-.62-.31-.62-.71V2.71c0-.404.29-.71.62-.71H12a1 1 0 0 0 0-2H2.62C1.16 0 0 1.225 0 2.71v14.58C0 18.77 1.163 20 2.62 20H12a1 1 0 0 0 0-2z"/>
                </g>
              </SvgIcon>

            </MenuItem>
          </Drawer>
        </div>
      </Grid>
    );
  }
}