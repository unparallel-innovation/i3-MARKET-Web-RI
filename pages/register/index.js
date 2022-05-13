import { Button, Col, Form, Image } from 'react-bootstrap';
import Footer from '../../components/common/Footer';
import { useState } from 'react';

export default function Register() {
    const [role, setRole] = useState('consumer');

    async function onSubmit(e) {
        e.preventDefault();

        const info = {
            username: e.target.username.value
        };
        if (role === 'consumer') {
            info.consumer = true;
        }
        else if (role === 'provider') {
            info.provider = true;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });
        const data = await res.json();
        if (data.url)
            window.open(data.url, '_self');
    }

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Form className="formContainer" onSubmit={onSubmit}>
                    <div className="formLogo">
                        <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                    </div>

                    <div className="formUserInput">
                        <div className="d-flex w-100 flex-column">
                            <div className="d-flex">
                                <Col className="col-sm-3 text-right">
                                    <Form.Label className="col-form-label">Role</Form.Label>
                                </Col>
                                <Col className="col-sm-9" >
                                    <Form.Control className="formInput" as="select" value={role} onChange={e => { setRole(e.target.value); }} >
                                        <option value="consumer">Consumer</option>
                                        <option value="provider">Provider</option>
                                    </Form.Control>
                                </Col>
                            </div>

                            <div className="d-flex mt-3">
                                <Col className="col-sm-3 text-right">
                                    <Form.Label className="col-form-label">Username</Form.Label>
                                </Col>
                                <Col className="col-sm-9" >
                                    <Form.Control className="formInput" type="text" placeholder="Username" name="username" required />
                                </Col>
                            </div>
                        </div>
                    </div>

                    <div className="formBtnContainer">
                        <Button className="formBtn bg-secondary" type="submit">Register</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
