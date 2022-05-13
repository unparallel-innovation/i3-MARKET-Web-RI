import { Button, Col, Form, Image } from 'react-bootstrap';
import { useState } from 'react';
import Footer from '../../components/common/Footer';

export default function Login() {
    const [role, setRole] = useState('consumer');

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Form className="formContainer">
                    <div className="formLogo">
                        <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                    </div>

                    <div className="formUserInput">
                        <div className="d-flex w-100">
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
                    </div>

                    <div className="formBtnContainer">
                        <Button className="formBtn" type="submit" href={`api/login/${role}`}>Login</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
