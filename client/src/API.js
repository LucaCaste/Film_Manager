const dayjs = require("dayjs");
const URL = 'http://localhost:3001/api'



async function getAllFilms(user) {
  const response = await fetch(URL + '/films', { credentials: 'include'});
  const filmsJson = await response.json();
  if (response.ok) {
    return filmsJson.map((f) => ({ id: f.id, title: f.title, favorites: f.favorite, watchingDate: dayjs(f.watchdate), rating: f.rating, user: f.user }))
  } else {
    throw filmsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getFavoritesFilms(user) {
  const response = await fetch(URL + '/films/favorite', { credentials: 'include' });
  const filmsJson = await response.json();
  if (response.ok) {
    return filmsJson.map((f) => ({ id: f.id, title: f.title, favorites: f.favorite, watchingDate: dayjs(f.watchdate), rating: f.rating, user: f.user  }))
  } else {
    throw filmsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getBestRatedFilms(user) {
  const response = await fetch(URL + '/films/bestrated', { credentials: 'include' });
  const filmsJson = await response.json();
  if (response.ok) {
    return filmsJson.map((f) => ({ id: f.id, title: f.title, favorites: f.favorite, watchingDate: dayjs(f.watchdate), rating: f.rating, user: f.user  }))
  } else {
    throw filmsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getSeenLastMonthFilms(user) {
  const response = await fetch(URL + '/films/seenlastmonth', { credentials: 'include' });
  const filmsJson = await response.json();
  if (response.ok) {
    return filmsJson.map((f) => ({ id: f.id, title: f.title, favorites: f.favorite, watchingDate: dayjs(f.watchdate), rating: f.rating, user: f.user  }))
  } else {
    throw filmsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getUnseenFilms(user) {
  const response = await fetch(URL + '/films/unseen', { credentials: 'include' });
  const filmsJson = await response.json();
  if (response.ok) {
    return filmsJson.map((f) => ({ id: f.id, title: f.title, favorites: f.favorite, watchingDate: dayjs(f.watchdate), rating: f.rating, user: f.user  }))
  } else {
    throw filmsJson;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

function deleteFilm(id) {
  // call: DELETE /api/film/:id
  return new Promise((resolve, reject) => {
    fetch((URL + '/film/' + id), {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function addFilm(film) {
  // call: POST /api/film
  return new Promise((resolve, reject) => {
    fetch((URL + '/film'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: film.title, favorite: film.favorites, watchdate: dayjs(film.watchingDate).format('YYYY-MM-DD'), rating: film.rating }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

function updateFilm(film) {
  // call: PUT /api/film/:id
  return new Promise((resolve, reject) => {
    fetch((URL + '/film/' + film.id), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: film.title, favorite: film.favorites, watchdate: dayjs(film.watchingDate).format('YYYY-MM-DD'), rating: film.rating }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response.json()
          .then((obj) => { reject(obj); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}

async function logIn(credentials) {
  let response = await fetch((URL + '/sessions'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch((URL + '/sessions/current'), { method: 'DELETE', credentials: 'include' });
}

async function getUserInfo() {
  const response = await fetch((URL + '/sessions/current'), { credentials: 'include' });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

const API = {
  getAllFilms,
  getFavoritesFilms,
  getBestRatedFilms,
  getSeenLastMonthFilms,
  getUnseenFilms,
  addFilm,
  updateFilm,
  deleteFilm,
  logIn,
  logOut,
  getUserInfo
};
export default API;