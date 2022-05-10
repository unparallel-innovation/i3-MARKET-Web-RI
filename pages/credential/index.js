import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function Credential() {
    const router = useRouter();

    return (
        <div className="d-flex flex-column vw-100 vh-100 justify-content-center align-content-center align-items-center">
            <Form className="p-5">
                <h1>Credential</h1>
                <Button type="submit" href={`api/credential?code=${router.query.code}`}>Submit</Button>
            </Form>
        </div>
    );
}
