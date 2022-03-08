import { Button, Form } from 'react-bootstrap';
import { useUser } from '../lib/hooks';
import { useState } from 'react';

export default function Login() {
    useUser({redirectTo: '/', redirectIfFound: true})

    const [role, setRole] = useState('consumer');

    return (
        <div className="d-flex flex-column vw-100 vh-100 justify-content-center align-content-center align-items-center">
            <Form className="p-5">
                <h1>Login</h1>
                <Form.Group controlId="role">
                    <Form.Control as="select" value={role} onChange={e => { setRole(e.target.value); }} >
                        <option value="consumer">Consumer</option>
                        <option value="provider">Provider</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" href={`api/login/${role}`}>Submit</Button>
            </Form>
        </div>
    );
}
