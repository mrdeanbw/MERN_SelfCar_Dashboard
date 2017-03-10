import React, { PropTypes } from 'react';
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

// Import Style
import styles from './QueueListItem.css';

function QueueListItem(props) {
  return (
    <div className={styles['single-queue']}>
      <Badge badgeContent={props.queue.language}>
        <Chip key={props.queue.project_id}>
            {props.queue.project_id}
        </Chip>
      </Badge>
      <p>{props.queue.position}</p> 
    </div>
  );
}

QueueListItem.propTypes = {
  queue: PropTypes.shape({
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  //queuePosition: PropTypes.number.isRequired
};

export default QueueListItem;