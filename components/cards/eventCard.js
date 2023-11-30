import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent } from '../../api/eventData';

export default function EventCard({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm('Delete this Event?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <div className="event-card">
      <Card>
        <Card.Body>
          <Card.Title>{eventObj.name}</Card.Title>
          <p>Date: {eventObj.date}</p>
          <p>Start Time: {eventObj.startTime.value}</p>
          <p>End Time: {eventObj.endTime.value}</p>
          <p>PlayType: {eventObj.playType.name}</p>
          {eventObj.class && (
          <>
            <p>Looking For Classes:</p>
            <ul>
              {eventObj.class.map((classItem) => (
                <li key={classItem.id}>{classItem.name}</li>
              ))}
            </ul>
          </>
          )}
          <Link href={`/event/eventDetails/${eventObj.id}`} passHref>
            <Button variant="primary">View</Button>
          </Link>
          {eventObj.uid === user.uid && (
          <>
            <Link href={`/event/editEvent/${eventObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisEvent}>
              DELETE
            </Button>
          </>
          )}
        </Card.Body>
      </Card>
    </div>

  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    endTime: PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    playType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    uid: PropTypes.string.isRequired,
    class: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
