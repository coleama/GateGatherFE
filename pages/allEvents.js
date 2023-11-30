import React, { useState, useEffect } from 'react';
import { getEvents } from '../api/eventData';
import EventCard from '../components/cards/eventCard';

function AllEvents() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getEvents().then(setEventData);
  }, []);
  const update = () => {
    getEvents().then(setEventData);
  };
  console.warn(eventData);
  return (
    <div className="animate__animated animate__bounceInDown">
      <div className="events-section">
        <h1 className="h3-sherwood">All Events</h1>
        <div className="card-container">
          <div className="card-list-horizontal">
            {eventData.map((data) => (
              <EventCard key={data.id} eventObj={data} onUpdate={update} />
            ))}
          </div>
        </div>
      </div>

    </div>

  );
}

export default AllEvents;
