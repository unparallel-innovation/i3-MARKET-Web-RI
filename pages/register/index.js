import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import Footer from '../../components/common/Footer';
import { useState } from 'react';

export default function Register() {
    const [role, setRole] = useState('consumer');

    async function onSubmit(e) {
        e.preventDefault();

        const info = {
            role: role,
            username: e.target.username.value
        }
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        })
        const data = await res.json()
        if(data.url)
            window.open(data.url, "_self")
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Form className="d-flex flex-column rounded bg-light p-4" onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                        <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                    </div>

                    <Form.Group className="mt-4">
                        <Row className="form-inline">
                            <Col className="col-sm-4 col-form-label">
                                <Form.Label>Role</Form.Label>
                            </Col>
                            <Col className="col-sm-8 col-form-label">
                                <Form.Control as="select" value={role} onChange={e => { setRole(e.target.value); }} >
                                    <option value="consumer">Consumer</option>
                                    <option value="provider">Provider</option>
                                </Form.Control>
                            </Col>

                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row className="form-inline">
                            <Col className="col-sm-4 col-form-label">
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col className="col-sm-8 col-form-label">
                                <Form.Control type="text" placeholder="Username" name="username" required />
                            </Col>
                        </Row>
                    </Form.Group>

                    <div className="text-center mt-4">
                        <Button type="submit">Register</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    )
}
