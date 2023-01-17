import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import Footer from '../../components/common/Footer';

export default function Auth() {
    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">

                <Form className="formContainer">
                    <div className="formLogo">
                        <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                    </div>

                    <div className="formUserInput">
                        <div className="d-flex flex-column w-100">

                            <Row>
                                <Col/>
                                <Col><Button className="w-100 mb-4" type="submit" href={'/login'}>Login</Button></Col>
                                <Col/>
                            </Row>

                            <Row>
                                <Col/>
                                <Col><Button className="w-100 bg-secondary" type="submit" href={'/register'}>Register</Button></Col>
                                <Col/>
                            </Row>
                        </div>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
