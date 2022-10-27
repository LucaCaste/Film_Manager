import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import API from './API';

const AllButtons = [
    { code: '0', name: 'All' },
    { code: '1', name: 'Favorite' },
    { code: '2', name: 'Best Rated' },
    { code: '3', name: 'Seen Last Month' },
    { code: '4', name: 'Unseen' }
];

function FilmButtons(props) {

    const location = useLocation().pathname.toLowerCase();
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
          await API.getUserInfo();
        } catch (err) {
          props.setLoggedIn(false);
        }
      };
    
    useEffect(() => {
          checkAuth();

        switch (location) {
            case "/":
                API.getAllFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
            case "/all":
                API.getAllFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                navigate("/");
                break;
            case "/favorite":
                API.getFavoritesFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
            case "/best%20rated":
                API.getBestRatedFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
            case "/seen%20last%20month":
                API.getSeenLastMonthFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
            case "/unseen":
                API.getUnseenFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
            default:
                API.getAllFilms(props.user.id)
                    .then((films) => {
                        props.setShowedFilms(films);
                    })
                    .catch(err => console.log(err))
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location,props.dirty]);

    return (
        <>
            <div className="col-2 bg-light p-3 mb-2">
                <div className='d-grid gap-2'>
                    {
                        AllButtons.map((b) => (<MyButton location = {location} button={b} key={b.code} setActiveButton={props.setActiveButton} setCurrentLocation={props.setCurrentLocation} setShowedFilms={props.setShowedFilms} dirty={props.dirty} /*haltUseEffect={props.haltUseEffect} setHaltUseEffect={props.setHaltUseEffect} */ setInitialLoading={props.setInitialLoading} />))
                    }
                </div>
            </div>
        </>
    );
}

function MyButton(props) {

    const navigate = useNavigate();

    return (
        <>
            <Button
                className={props.location === "/" + props.button.name.toLowerCase().replaceAll(" ", '%20') ? "btn btn-primary text-start" : (props.location === '/' && props.button.name === 'All' ? "btn btn-primary text-start" : "btn btn-light text-start")}
                size="lg"
                onClick={() => {
                    props.setActiveButton(props.button.code);
                    props.setCurrentLocation("/" + props.button.name.toLowerCase().replaceAll(" ", '%20'));
                    props.button.name === 'All' ?
                        navigate("/")
                        :
                        navigate(`/${props.button.name}`)
                }}>
                {props.button.name}
            </Button>
        </>
    );
}

export { FilmButtons };