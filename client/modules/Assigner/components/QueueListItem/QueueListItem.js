import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Chip from 'material-ui/Chip';
import {
  Step,
  Stepper,
  StepButton,
  StepLabel
} from 'material-ui/Stepper';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import SeparatorIcon from 'material-ui/svg-icons/content/remove';

// Import Style
import styles from './QueueListItem.css';

class  QueueListItem extends React.Component {
  
  constructor(props) {
    super(props);

    this.initialPosition = this.props.queue.position;
  }

  componentWillReceiveProps(nextProps) {
    // Notify user of a new project
    if (nextProps.queue.position === 1) {
      this.handleProjectAssigned(this.props.queue.project_id);
    }
  }
  
  render() {
    const styles = {
        stepper: {
            width: this.initialPosition * 30,
        },
    };
    let steps = [];

    for(var i = 1; i <= this.initialPosition; i++ ) {
        steps.push(<Step completed={false} active={this.props.queue.position === i}>
            <StepLabel></StepLabel>
        </Step>);
    }
    return (
        <div className={styles['single-queue']}>
        <Badge badgeContent={this.props.queue.language} secondary={true} badgeStyle={{fontSize: 10, width: 32}}>
            <Chip key={this.props.queue.project_id}>
                {this.props.queue.project_id}
            </Chip>
        </Badge>
        <Stepper linear={false} connector={<SeparatorIcon />} style={styles.stepper} >
            {steps}
        </Stepper>
        </div>
    );
  }
}

QueueListItem.propTypes = {
  queue: PropTypes.shape({
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  handleProjectAssigned: PropTypes.func.isRequired,
};

export default QueueListItem;