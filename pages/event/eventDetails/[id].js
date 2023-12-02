/* eslint-disable no-shadow */
/* eslint-disable no-self-compare */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { addUsersToEvent, deleteEventFromUser, getSingleEvent } from '../../../api/eventData';
import ClassCard from '../../../components/cards/classCard';
import UserCard from '../../../components/cards/userCard';
import { useAuth } from '../../../utils/context/authContext';

export default function ViewEvent() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [eventData, setEventData] = useState({});
  // const [classData, setClassData] = useRouter([]);
  useEffect(() => {
    getSingleEvent(id).then(setEventData);
  }, [id]);

  const update = () => {

  };
  const remove = () => {
    deleteEventFromUser(eventData.id, user.id).then(() => {
      getSingleEvent(id).then(setEventData);
    });
  };
  const add = () => {
    addUsersToEvent(user.id, eventData.id).then(() => {
      getSingleEvent(id).then(setEventData);
    });
  };
  console.warn(eventData);
  console.warn(user);
  return (
    <>
      <div className="event-container">
        <h2>
          Event: {eventData.name}
        </h2>
        <h5>PlayType: {eventData.playType?.name}</h5>
        <h5>Date: {eventData.date}</h5>
        <h5>StartTime: {eventData.startTime?.value} </h5>
        <h5>EndTime: {eventData.endTime?.value} </h5>
        {eventData.users && eventData.users.some((eventUser) => eventUser.id === user.id) ? (
          <Button onClick={remove}>Remove yourself from Event </Button>
        ) : (
          <Button onClick={add}>Sign Up for Event</Button>
        )}
      </div>
      <div>
        <h2 className="h3-sherwood">Looking For these Classes:</h2>
        <div className="card-container">
          <div className="card-list-horizontal">
            {eventData.class?.map((data) => (
              <ClassCard key={data.id} classObj={data} onUpdate={update} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="h3-sherwood">Users that have Signed Up:</h2>
        <div className="card-container">
          <div className="card-list-horizontal">
            {eventData.users?.map((data) => (
              <UserCard key={data.id} userObj={data} eventObj={eventData} onUpdate={update} />
            ))}
          </div>
        </div>
      </div>
    </>

  );
}
