import {useRouter} from 'next/router';
import {Button, Form} from 'react-bootstrap';
import {ROLE_CONSUMER, ROLE_PROVIDER} from '/lib/user';

export default function Login() {
    const router = useRouter();

    function onSubmit(e) {
        e.preventDefault();

        /* this info should come from api call */

        localStorage.setItem('user', JSON.stringify({
            name: 'John James Doe',
            company: 'Siemens',
            roles: ROLE_PROVIDER | ROLE_CONSUMER,
            providerId: 'provider-webri',
        }));

        router.push('/');
    }

    return <div className="d-flex flex-column vw-100 vh-100 justify-content-center">
        <Form className="p-5" onSubmit={onSubmit}>
            <h1>Login</h1>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="username" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Password" name="password" />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    </div>;
}
