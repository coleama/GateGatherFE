/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'animate.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllCreatedEventsOnUser, getAllSignedUpEventsOnUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/cards/eventCard';
import SignedEventCard from '../components/cards/signedEventCard';
import ProfileClassCard from '../components/cards/profileClassCard';

export default function Profile() {
  const { user } = useAuth();
  const [eventData, setEventData] = useState([]);
  const [signedUp, setSignedUp] = useState([]);

  const update = () => {
    getAllCreatedEventsOnUser(user.uid).then(setEventData);
    getAllSignedUpEventsOnUser(user.uid).then(setSignedUp);
  };
  useEffect(() => {
    getAllCreatedEventsOnUser(user.uid).then(setEventData);
    getAllSignedUpEventsOnUser(user.uid).then(setSignedUp);
  }, [user.uid]);
  console.warn('event', eventData);
  console.warn('signed', signedUp);
  console.warn(user);

  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="text-center my-4">
        <h1 className="h3-sherwood">Hello {user.name}</h1>
        {eventData.length === 0 && (
          <>
            <h3 className="h3-sherwood">
              You're not Hosting anything
            </h3>
            <Link href="/event/new" passHref>
              <Button variant="info">Create your own event</Button>
            </Link>
          </>

        )}
        {eventData.length > 0 && (
        <div className="events-section">
          <h3 className="h3-sherwood">Events you're Hosting</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {eventData.map((event) => (
                <EventCard key={event.id} eventObj={event} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
        )}
        {signedUp.length === 0 && (
          <>
            <h3 className="h3-sherwood">You're not signed up for anything but I know a Place</h3>
            <Link href="/allEvents" passHref>
              <Button variant="info">Sign up for events</Button>
            </Link>
          </>
        )}
        {signedUp.length > 0 && (
        <div className="events-section">
          <h3 className="h3-sherwood">Events you're signed up for</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {signedUp.map((event) => (
                <SignedEventCard key={event.id} eventObj={event} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
        )}

        {user.class.length > 0 && (
        <div>
          <h3 className="h3-sherwood">Your Favorite Classes</h3>
          <div className="card-container">
            <div className="card-list-horizontal">
              {user.class.map((data) => (
                <ProfileClassCard key={data.id} classObj={data} userObj={user} onUpdate={update} />
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Render buttons to navigate to other pages if no data */}

        {user.class.length === 0 && (
        <Link href="/event/new" passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        )}
      </div>
    </div>
  );
}
