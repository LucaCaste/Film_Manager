import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function PageNotFound(props) {
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="primary">
                <Container fluid>
                    <div className="navbar-brand text-white" style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                        <i className="bi bi-collection-play" style={{ fontSize: 25, color: "white" }}> Film Library</i>
                    </div>
                    {
                        !props.loggedIn ?
                            <div><i className="bi bi-person-circle" style={{ fontSize: 25, color: "white", cursor: 'pointer'}} onClick={() => { navigate('/login') }}></i></div>
                            :
                            <div>
                                <i style={{ position: 'relative', top: -3, fontSize: 20, color: "white" }}>Welcome,</i>
                                <i style={{ position: 'relative', top: -3, fontSize: 20, color: "white" }}> <b>  {props.user.name + "  "}   </b>    </i>
                                <i className="bi bi-box-arrow-right" style={{ fontSize: 25, color: "white",cursor: 'pointer' }} onClick={() => { props.doLogOut(); navigate('/login') }}></i>
                            </div>
                    }
                </Container>
            </Navbar>
            <div className="col-10 p-3 mb-2">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ alignItems: 'center' }}>
                        <h1>Error 404</h1>
                        <br />
                        <h1> Page Not Found</h1>
                    </div>
                </div>
            </div>
        </>);
}

export default PageNotFound;