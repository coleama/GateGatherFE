import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getPlayTypes, getTimeSlots } from '../../api/miscData';
import { useAuth } from '../../utils/context/authContext';
import { updateEvent, createEvent } from '../../api/eventData';

const initialState = {
  name: '',
  date: null,
};

export default function EventForm({ eventObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [playType, setPlayType] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlayTypes().then(setPlayType);
    getTimeSlots().then(setTimeSlots);
    if (eventObj.id) setFormInput(eventObj);
  }, [eventObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventObj.id) {
      updateEvent(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvent(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="event-container">
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5">{eventObj.id ? 'Update' : 'Create' } Event</h2>

          {/* TITLE OF EVENT INPUT  */}
          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Event Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="PlayType">
            <Form.Select
              aria-label="PlayType"
              name="playTypeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.playTypeId}
              required
            >
              <option value="">Select a Option</option>
              {
            playType.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="StartTime">
            <Form.Select
              aria-label="StartTime"
              name="startTimeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.startTimeId}
              required
            >
              <option value="">Select a Option</option>
              {
            timeSlots.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.value}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="EndTime">
            <Form.Select
              aria-label="EndTime"
              name="endTimeId"
              onChange={handleChange}
              className="mb-3"
              value={formInput.endTimeId}
              required
            >
              <option value="">Select a Option</option>
              {
            timeSlots.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.value}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>

          <Form.Group className="mb-3">
            <FloatingLabel htmlFor="date">Date:</FloatingLabel>

            <Form.Control
              type="date"
              id="date"
              name="Date"
              value={formInput.Date}
              min="2023-10-31"
              max="2024-01-30"
              onChange={handleChange}
            />
          </Form.Group>

          {/* SUBMIT BUTTON  */}
          <Button type="submit">{eventObj.id ? 'Update' : 'Create' } Event </Button>
        </Form>
      </div>
    </div>

  );
}

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    playTypeId: PropTypes.number,
    startTimeId: PropTypes.number,
    endTimeId: PropTypes.number,
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};
