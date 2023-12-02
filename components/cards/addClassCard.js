import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default function AddClassCard({ classObj, addFunction, isClassAdded }) {
  return (
    <>
      <div className="class-card">
        <Card>
          <Card.Img variant="top" src={classObj.image} alt={classObj.name} bg="transparent" />
          <Card.Body>
            <Card.Title>{classObj.name}</Card.Title>
            <p>{classObj.description}</p>
            <Button onClick={addFunction}>
              {isClassAdded ? 'Remove Class' : 'Add Class'}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

AddClassCard.propTypes = {
  classObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  addFunction: PropTypes.func.isRequired,
  isClassAdded: PropTypes.bool.isRequired,
};
