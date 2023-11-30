import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteClassFromUser } from '../../api/userData';

export default function ProfileClassCard({ classObj, userObj, onUpdate }) {
  const deleteThisClass = () => {
    if (window.confirm('Delete this Class from your Favorites?')) {
      deleteClassFromUser(classObj.id, userObj.id).then(() => onUpdate());
    }
  };
  return (
    <>
      <div className="class-card">
        <Card>
          <Card.Img variant="top" src={classObj.image} alt={classObj.name} bg="transparent" />
          <Card.Body>
            <Card.Title>{classObj.name}</Card.Title>
            <p>{classObj.description}</p>
            <Button variant="danger" onClick={deleteThisClass}>
              DELETE
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

ProfileClassCard.propTypes = {
  classObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  userObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
