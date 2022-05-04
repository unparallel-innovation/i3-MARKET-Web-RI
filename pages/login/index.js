import { Button, Form, Image } from 'react-bootstrap';
import { useState } from 'react';
import Footer from '../../components/common/Footer';

export default function Login() {
    const [role, setRole] = useState('consumer');

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Form className="rounded bg-light p-4">
                    <Image height={100} width={200} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                    <Form.Group className="form-inline mt-4">
                        <Form.Label>Role</Form.Label>
                        <Form.Control className="ml-4" as="select" value={role} onChange={e => { setRole(e.target.value); }} >
                            <option value="consumer">Consumer</option>
                            <option value="provider">Provider</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" href={`api/login/${role}`}>Login</Button>
                    </div>
                </Form>
            </div>
            <Footer />
        </div>
    )
}
