import { Table, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LibraryNavbar } from './NavbarComponents';
import { Container, Row, Navbar } from 'react-bootstrap';

import { FilmButtons } from './ButtonComponents'

const dayjs = require('dayjs');


function FilmScores(props) {

  return (
    <>
      <Navbar bg="primary">
        <Container fluid>
          <LibraryNavbar setSearchedFilm={props.setSearchedFilm} logout = {props.logout} user={props.user}/>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <FilmButtons setActiveButton={props.setActiveButton} setCurrentLocation={props.setCurrentLocation} setShowedFilms={props.setShowedFilms} dirty={props.dirty} setInitialLoading={props.setInitialLoading} setLoggedIn={props.setLoggedIn} user={props.user}/>
          <div className="col-10 p-3 mb-2">
            <h1>{props.title}</h1>
            <FilmTable showedFilms={props.showedFilms} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} setActiveButton={props.setActiveButton} dirty={props.dirty} setDirty={props.setDirty} setLoggedIn={props.setLoggedIn}></FilmTable>
          </div>
        </Row>
      </Container>
    </>
  );
}

function FilmTable(props) {
  const navigate = useNavigate();

  return (
    <>
      <Table>
        <tbody>
          {
            props.showedFilms.map((f) => <FilmRow film={f} key={f.id} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} setActiveButton={props.setActiveButton} dirty={props.dirty} setDirty={props.setDirty}/>)
          }
        </tbody>
      </Table>
      <div>
        <div className="text-end">
          <i className="bi bi-plus-circle-fill" style={{ fontSize: 30, color: "#007bff", cursor: 'pointer' }} onClick={() => { props.setActiveButton('-1'); navigate('/add'); }} />
        </div>
      </div>
    </>
  );
}

function FilmRow(props) {
  let statusClass = null;

  switch (props.film.status) {
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }
  return (
    <>
      <tr className={statusClass}><FilmData film={props.film} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} setActiveButton={props.setActiveButton} dirty={props.dirty} setDirty={props.setDirty} /></tr>
    </>
  );
}

function FilmData(props) {
  const [rating, setRating] = useState(props.film.rating);
  const navigate = useNavigate();

  function updateFilmFavorite(film) {
    const newFilm = { id: film.id, title: film.title, favorites: !film.favorites, watchingDate: film.watchingDate, rating: film.rating, user: film.user};
    props.updateFilm(newFilm);
  }

  function updateFilmRating(film, rate) {
    const newFilm = { id: film.id, title: film.title, favorites: film.favorites, watchingDate: film.watchingDate, rating: rate, user: film.user };
    props.updateFilm(newFilm);
  }
  return (
    <>
      <td>
        <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={() => { props.setActiveButton('-1'); navigate(`/edit/${props.film.title}`) }} />
        <i className="bi bi-trash" style={{ color: "#A52019", cursor: 'pointer' }} onClick={() => { props.deleteFilm(props.film.id); props.setDirty(!props.dirty) }} />
      </td>
      <td className={props.film.favorites ? "text-danger" : ""}>{props.film.title}</td>
      <td><Form.Label>Favorite</Form.Label> <input type="checkbox" style={{ cursor: 'pointer' }} checked={props.film.favorites} onChange={() => { updateFilmFavorite(props.film); props.setDirty(!props.dirty) }} /></td>
      <td>{dayjs(props.film.watchingDate).format('MMMM D YYYY') === "Invalid Date" ? "" : dayjs(props.film.watchingDate).format('MMMM D YYYY')}</td>
      <td><FilmStars film={props.film} i={0} rating={rating} setRating={setRating} updateFilmRating={updateFilmRating} dirty={props.dirty} setDirty={props.setDirty} /></td>
    </>
  );
}

function FilmStars(props) { //RECURSIVE FUNCTION
  if (props.i >= 5)
    return;
  return (
    <>
      <i className={props.i < props.rating ? "bi-star-fill" : "bi-star"}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          let newRating = props.i + 1
          if (props.i + 1 === props.rating) newRating--;
          props.setRating(newRating);
          props.updateFilmRating(props.film, newRating);
          props.setDirty(!props.dirty);
        }}
      />
      <FilmStars film={props.film} i={props.i + 1} rating={props.rating} setRating={props.setRating} updateFilmRating={props.updateFilmRating} dirty={props.dirty} setDirty={props.setDirty} />
    </>
  );
}

export { FilmScores };
