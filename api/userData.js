import { dbUrl } from '../utils/auth';

// GET ALL USERS
const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// GET A SINGLE USER DETAILS
const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
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
// CREATE AN USER
const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
// UPDATE AN USER
const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});
// DELETE AN USER
const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
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
// GET ALL EVENTS FOR AN USER
const getAllSignedUpEventsOnUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userEvents/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// GET ALL CREATED EVENTS FOR AN USER
const getAllCreatedEventsOnUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/createdEventUser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteClassFromUser = (classId, userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/userClass/${userId}/${classId}`, {
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
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getAllSignedUpEventsOnUser,
  getAllCreatedEventsOnUser,
  deleteClassFromUser,
};
