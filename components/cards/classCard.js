import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function ClassCard({ classObj }) {
  return (
    <>
      <div className="class-card">
        <Card>
          <Card.Img variant="top" src={classObj.image} alt={classObj.name} bg="transparent" />
          <Card.Body>
            <Card.Title>{classObj.name}</Card.Title>
            <p>{classObj.description}</p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

ClassCard.propTypes = {
  classObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
