import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getClasses, getPlayTypes, getTimeSlots } from '../../api/miscData';
import { useAuth } from '../../utils/context/authContext';
import {
  updateEvent, createEvent, addClassToEvent, deleteClassFromEvent,
} from '../../api/eventData';
import AddClassCard from '../cards/addClassCard';

const initialState = {
  name: '',
  date: null,
};

export default function EventForm({ eventObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [allClasses, setAllClasses] = useState([]);
  const [classData, setClassData] = useState([]);
  const [removeClassData, setRemoveClassData] = useState([]);
  const [playType, setPlayType] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlayTypes().then(setPlayType);
    getTimeSlots().then(setTimeSlots);
    getClasses().then(setAllClasses);
    if (eventObj.id) setFormInput(eventObj);
  }, [eventObj]);

  // eslint-disable-next-line react/prop-types
  const isClassAdded = (classId) => eventObj.class?.some((classItem) => classItem.id === classId);

  const addClass = (selectedClass) => {
    // Check if the class is not already in the array
    if (!classData.some((c) => c.id === selectedClass.id)) {
      // Add the class to the array
      setClassData((prevClasses) => [...prevClasses, selectedClass]);
    }
  };

  const removeClass = (removeSelectedClass) => {
  // Check if the class is not already in the array
    if (!removeClassData.some((c) => c.id === removeSelectedClass.id)) {
    // Add the class to the array
      setRemoveClassData((prevClasses) => [...prevClasses, removeSelectedClass]);
    }
  };

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
      const addClassPromises = classData.map((classItem) => addClassToEvent(classItem.id, eventObj.id)
        .then(() => console.warn(`Class ${classItem.id} added to event ${eventObj.id}`))
        .catch((error) => console.error(error)));

      const removeClassPromises = removeClassData.map((classItem) => deleteClassFromEvent(eventObj.id, classItem.id)
        .then(() => console.warn(`Class ${classItem.id} removed from event ${eventObj.id}`))
        .catch((error) => console.error(error)));

      Promise.all([...addClassPromises, ...removeClassPromises])
        .then(() => {
          updateEvent(formInput).then(() => router.push('/'));
        })
        .catch((error) => console.error(error));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvent(payload).then((eventResponse) => {
        const eventId = eventResponse.id;
        classData.forEach((classItem) => {
          addClassToEvent(classItem.id, eventId)
            .then(() => console.warn(`Class ${classItem.id} added to event ${eventId}`))
            .catch((error) => console.error(error));
        });
        router.push('/');
      });
    }
  };
  console.warn('this', removeClassData);
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
          <div className="card-container">
            <div className="card-list-horizontal">
              {allClasses.map((data) => (
                <AddClassCard
                  key={data.id}
                  classObj={data}
                  addFunction={() => {
                    if (isClassAdded(data.id)) {
                      removeClass(data);
                    } else {
                      addClass(data);
                    }
                  }}
                  isClassAdded={isClassAdded(data.id)}
                />
              ))}
            </div>
          </div>
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
