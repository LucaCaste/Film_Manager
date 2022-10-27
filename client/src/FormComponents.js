import { Button, ButtonGroup, Form, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilmButtons } from './ButtonComponents';
import { LibraryNavbar } from './NavbarComponents';
import { Container, Row, Navbar } from 'react-bootstrap';

function FilmForm(props) {
    const navigate = useNavigate();
    const { FilmTitle } = useParams();
    const FilmToEdit = props.showedFilms.find((f) => f.title === FilmTitle);
    const [title, setTitle] = useState(FilmToEdit ? FilmToEdit.title : '');
    const [favorites, setFavorites] = useState(FilmToEdit ? FilmToEdit.favorites : 0);
    const [watchingDate, setWatchingDate] = useState(FilmToEdit ? FilmToEdit.watchingDate : dayjs());
    const [rating, setRating] = useState(FilmToEdit ? FilmToEdit.rating : 0);

    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === "") {
            setErrorMsg('Un film deve avere un titolo');
        } else if (rating > 5 || rating < 0) {
            setErrorMsg('Errore rating: ' + rating);
        } else if ((props.showedFilms.find(f => (f.title === title)) !== undefined) && props.flagAdd) {
            setErrorMsg('Errore nome film presente');
        } else if (dayjs().diff(watchingDate) < 0) {
            setErrorMsg('Non puoi aver visto un film nel futuro!');
        } else {
            let newFilm;
            if (props.flagAdd) {
                newFilm = { id: props.showedFilms.length === 0 ? 1 : props.showedFilms[props.showedFilms.length - 1].id + 1, title: title, favorites: favorites, watchingDate: watchingDate, rating: parseInt(rating), user: props.user.id }
            } else {
                newFilm = { id: FilmToEdit.id, title: title, favorites: favorites, watchingDate: watchingDate, rating: parseInt(rating), user: props.user.id }
            }
            props.modifyFilm(newFilm);
            props.setCurrentLocation('/');
            navigate('/');
        }
    }
    

    return (
        <>
            <Navbar bg="primary">
                <Container fluid>
                    <LibraryNavbar setSearchedFilm={props.setSearchedFilm} logout = {props.log} user={props.user}/>
                </Container>
            </Navbar>
            <Container fluid>
                <Row>
                    <FilmButtons setActiveButton={props.setActiveButton} setCurrentLocation={props.setCurrentLocation} setShowedFilms = {props.setShowedFilms} setLoggedIn={props.setLoggedIn} user={props.user}/>
                    <div className="col-10 p-3 mb-2">
                        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
                        {props.flagAdd ? <h1>Add</h1> : <h1>Edit: {FilmToEdit.title}</h1>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title} onChange={ev => setTitle(ev.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Favorite</Form.Label>
                                <input className="mx-2" type="checkbox" style={{ cursor: 'pointer' }} checked={favorites} value={favorites} onChange={() => setFavorites(!favorites)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Watching Date</Form.Label>
                                <Form.Control type='date' value={dayjs(watchingDate).isValid() ? watchingDate.format('YYYY-MM-DD') : ''} onChange={ev => {dayjs(ev.target.value).isValid() ? setWatchingDate(dayjs(ev.target.value)) : setWatchingDate("invalid date")}} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type='number' min={0} max={5} value={rating} onChange={ev => setRating(ev.target.value)} />
                            </Form.Group>
                            <ButtonGroup className="my-3">
                                <Button type='submit'>Save</Button>
                                <Button className="mx-1" variant='secondary' onClick={() => { navigate(props.currentLocation) }}>Cancel</Button>
                            </ButtonGroup>
                        </Form>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default FilmForm;