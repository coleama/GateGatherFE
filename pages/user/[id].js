/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';
import { useRouter } from 'next/router';
import { getAllCreatedEventsOnUser, getSingleUser } from '../../api/userData';
import EventCard from '../../components/cards/eventCard';
import SignedEventCard from '../../components/cards/signedEventCard';
import ClassCard from '../../components/cards/classCard';

export default function ViewUser() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState({});
  const [eventData, setEventData] = useState([]);

  const update = () => {
    getAllCreatedEventsOnUser(userData.uid).then(setEventData);
  };
  useEffect(() => {
    getSingleUser(id).then(setUserData).then(() => {
      getAllCreatedEventsOnUser(userData.uid).then(setEventData);
    });
  }, [id, userData.uid]);
  console.warn('event', eventData);
  console.warn(userData);
  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <h1 className="h3-sherwood">User: {userData.name}</h1>
        {eventData.length === 0 && (
          <>
            <h3 className="h3-sherwood">
              {userData.name} isn't hosting anything currently.
            </h3>
          </>
        )}
        {eventData.length > 0 && (
        <div className="events-section">
          <h3 className="h3-sherwood">Events {userData.name}  is Hosting</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {eventData.map((event) => (
                <EventCard key={event.id} eventObj={event} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
        )}
        {userData.events?.length === 0 && (
        <>
          <h3 className="h3-sherwood">{userData.name} isn't signed up for anything.</h3>
        </>
        )}
        {userData.events?.length > 0 && (
        <div className="events-section">
          <h3 className="h3-sherwood">Events {userData.name} signed up for</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {userData.events.map((data) => (
                <SignedEventCard key={data.id} eventObj={data} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
        )}
        <div>
          <h3 className="h3-sherwood">{userData.name} Favorite Classes</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {userData.class?.map((data) => (
                <ClassCard key={data.id} classObj={data} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
