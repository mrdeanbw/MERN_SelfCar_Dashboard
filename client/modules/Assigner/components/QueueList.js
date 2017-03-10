import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import QueueListItem from './QueueListItem/QueueListItem';

function QueueList(props) {
  return (
    <div className="listView">
      {
        props.queues.map(queue => (
          <QueueListItem
            queue={queue}
          />
        ))
      }
    </div>
  );
}

QueueList.propTypes = {
  queues: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps)(QueueList);
