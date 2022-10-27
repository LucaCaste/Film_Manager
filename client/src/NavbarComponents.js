import 'bootstrap-icons/font/bootstrap-icons.css';
import {useNavigate} from 'react-router-dom';

function LibraryNavbar(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className="navbar-brand text-white" style={{ cursor: 'pointer' }} onClick={()=>{navigate('/')}}>
                <i className="bi bi-collection-play" style={{ fontSize: 25, color: "white" }}> Film Library</i>
            </div>
            <div>
                <input type="text" className="form-control" placeholder="Search" onKeyUp={ev => {props.setSearchedFilm(ev.target.value); navigate(`/Search/${ev.target.value}`)}}></input>
            </div>
            <div>
                <i style={{position:'relative', top: -3, fontSize: 20, color: "white" }}>Welcome,</i>
                <i style={{position:'relative', top: -3, fontSize: 20, color: "white" }}> <b>  {props.user.name + "  "}   </b>    </i>
                <i className="bi bi-box-arrow-right" style={{ fontSize: 25, color: "white", cursor: 'pointer'}} onClick = {props.logout}></i>
            </div>
        </>
    );
}

export { LibraryNavbar };