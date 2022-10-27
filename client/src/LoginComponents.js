import { Form, Button, Alert, Container, Row, Col, Navbar } from 'react-bootstrap';
import { useState } from 'react';
const validator = require('email-validator');

function LoginForm(props) {
    const [username, setUsername] = useState('testuser@polito.it');
    const [password, setPassword] = useState('password');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setErrorMessage('');
        const credentials = { username, password };

        let valid = true;
        if (!validator.validate(username)) {
            props.setErrorMessage('Please insert email in the form "something@something.something"')
            valid = false;
            return;
        }
        if (password === '' || password === undefined) {
            props.setErrorMessage('Please insert password')
            valid = false;
            return;
        }

        if (valid) props.login(credentials);
    };

    return (
        <>
            <Navbar bg="primary">
                <Container fluid>
                    <div className="navbar-brand text-white" style={{ cursor: 'pointer' }}>
                        <i className="bi bi-collection-play" style={{ fontSize: 25, color: "white" }}> Film Library</i>
                    </div>
                    <div>
                        <i className="bi bi-person-circle" style={{ fontSize: 25, color: "white" }}></i>
                    </div>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <h2>Login</h2>
                        <Form>
                            {props.errorMessage ? <Alert variant='danger'>{props.errorMessage}</Alert> : ''}
                            <Form.Group controlId='username'>
                                <Form.Label>email</Form.Label>
                                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} autoComplete="on" />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} autoComplete="on" />
                            </Form.Group>
                            <Button onClick={handleSubmit}>Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export { LoginForm};