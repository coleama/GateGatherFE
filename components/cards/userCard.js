/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteEventFromUser } from '../../api/eventData';

export default function UserCard({ userObj, eventObj, onUpdate }) {
  const deleteThisUser = () => {
    if (window.confirm('Remove user from your event?')) {
      deleteEventFromUser(eventObj.id, userObj.id).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <div className="event-card">
      <Card>
        <Card.Body>
          <Card.Title>{userObj.name}</Card.Title>
          <p>Email: {userObj.email}</p>
          {userObj.class && (
          <>
            <p>{userObj.name}'s preferred Classes:</p>
            <ul>
              {userObj.class.map((classItem) => (
                <li key={classItem.id}>{classItem.name}</li>
              ))}
            </ul>
          </>
          )}
          <Link href={`/user/${userObj.id}`} passHref>
            <Button variant="primary">View</Button>
          </Link>
          {eventObj.uid === user.uid && (
          <>
            <Button variant="danger" onClick={deleteThisUser}>
              Remove User
            </Button>
          </>
          )}
        </Card.Body>
      </Card>
    </div>

  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    class: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
