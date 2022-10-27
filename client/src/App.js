import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FilmScores } from './FilmComponents';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FilmForm from './FormComponents';
import PageNotFound from './NotFound';
import API from './API';
import { LoginForm} from './LoginComponents';

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  )
}

function App2() {
  const [showedFilms, setShowedFilms] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const [currentLocation, setCurrentLocation] = useState('/');
  const [searchedFilm, setSearchedFilm] = useState('');
  const [dirty, setDirty] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user[0]);
      } catch (err) {
        handleError(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    API.getAllFilms()
      .then((films) => {
        setShowedFilms(films);
        setInitialLoading(false);
      })
      .catch(err => console.log(err))
  }, [loggedIn]);

  function handleError(err) {
  }

  function addFilm(film) {

    setShowedFilms(oldFilms => [...oldFilms, Object.assign({}, film, { status: 'added' })]);
    API.addFilm(film);
  }


  function updateFilm(film) {

    switch (activeButton) {
      case '1': if (film.favorites) {
        setShowedFilms(() => showedFilms.map(
          f => (f.id === film.id) ? Object.assign({}, film, { status: 'updated' }) : f
        ));
      } else {
        setShowedFilms(showedFilms.filter((f) => f.id !== film.id));
      }
        break;
      case '2': if (film.rating === 5) {
        setShowedFilms(() => showedFilms.map(
          f => (f.id === film.id) ? Object.assign({}, film, { status: 'updated' }) : f
        ));
      } else {
        setShowedFilms(showedFilms.filter((f) => f.id !== film.id));
      }
        break;
      default:
        setShowedFilms(() => showedFilms.map(
          f => (f.id === film.id) ? Object.assign({}, film, { status: 'updated' }) : f
        ));
    }
    API.updateFilm(film);
  }
  function deleteFilm(id) {
    setShowedFilms(films => showedFilms.map(f => (f.id === id) ? { ...f, status: 'deleted' } : f));
    API.deleteFilm(id);
  }

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then(user => {
        setLoggedIn(true);
        setUser(user);
        setErrorMessage('');
        Navigate('/');
      })
      .catch(err => {
        setErrorMessage(err);
      }
      )
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setErrorMessage("");

    setUser({});
    setShowedFilms([]);
  }

  return (
    <>
        <Routes>
          <Route path='/login' element={!loggedIn ? <LoginForm login={doLogIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <Navigate to='/' />} />
          <Route path='/' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"All"} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/All' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"All"} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/Favorite' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Favorite"} setShowedFilms={setShowedFilms} setActiveButton={setActiveButton} showedFilms={showedFilms} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/Best%20Rated' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Best Rated"} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/Seen%20Last%20Month' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Seen Last Month"} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/Unseen' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Unseen"} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />

          <Route path='/Search' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Search: " + searchedFilm} setShowedFilms={setShowedFilms} showedFilms={showedFilms} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/Search/:filmName' element={loggedIn ? (initialLoading ? <Loading /> : <FilmScores title={"Search: " + searchedFilm} setShowedFilms={setShowedFilms} showedFilms={showedFilms.filter(film => film.title.toLowerCase().includes(searchedFilm.toLowerCase()))} setActiveButton={setActiveButton} deleteFilm={deleteFilm} updateFilm={updateFilm} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setLoggedIn={setLoggedIn} user={user} setSearchedFilm={setSearchedFilm} logout={doLogOut}/>) : <Navigate to='/login' />} />

          <Route path='/add' element={loggedIn ? (initialLoading ? <Loading /> : <FilmForm showedFilms={showedFilms} setShowedFilms={setShowedFilms} setActiveButton={setActiveButton} modifyFilm={addFilm} flagAdd={1} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />
          <Route path='/edit/:FilmTitle' element={loggedIn ? (initialLoading ? <Loading /> : <FilmForm showedFilms={showedFilms} setShowedFilms={setShowedFilms} setActiveButton={setActiveButton} modifyFilm={updateFilm} flagAdd={0} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} dirty={dirty} setDirty={setDirty} setInitialLoading={setInitialLoading} setSearchedFilm={setSearchedFilm} logout={doLogOut} setLoggedIn={setLoggedIn} user={user}/>) : <Navigate to='/login' />} />


          <Route path='*' element={<PageNotFound loggedIn={loggedIn} user={user} doLogOut={doLogOut} />} />
        </Routes>
    </>
  );
}



function Loading() {
  return (
    <h2>Loading data ...</h2>
  )
}



export default App;

