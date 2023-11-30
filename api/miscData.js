import { dbUrl } from '../utils/auth';

const getClasses = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/classes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getPlayTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/playType`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getTimeSlots = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/timeSlots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getClasses,
  getPlayTypes,
  getTimeSlots,
};
