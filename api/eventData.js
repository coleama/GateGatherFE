import { dbUrl } from '../utils/auth';

// GET ALL EVENTS
const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE EVENT DETAILS
const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

// CREATE AN EVENT
const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

// UPDATE AN EVENT
const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

// DELETE AN EVENT
const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        resolve(data);
      }
    })
    .catch(reject);
});

// GET ALL USERS FOR AN EVENT
const getAllUsersOnEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventUser/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// ADD USER TO AN EVENT
const addUsersToEvent = (userId, eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventUser/${userId}/${eventId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
// add class to event
const addClassToEvent = (classId, eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventClass/${classId}/${eventId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
// delete class from event
const deleteClassFromEvent = (eventId, classId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventClass/${eventId}/${classId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        resolve(data);
      }
    })
    .catch(reject);
});

// DELETE AN EVENT FROM A USER
const deleteEventFromUser = (eventId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/eventUser/${eventId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        resolve(data);
      }
    })
    .catch(reject);
});

export {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllUsersOnEvent,
  addUsersToEvent,
  deleteEventFromUser,
  addClassToEvent,
  deleteClassFromEvent,
};
