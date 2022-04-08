import { Col, Form, Row } from 'react-bootstrap';
import { useUser } from '../../../lib/hooks';

export default function General(props) {
    const { categories } = props;
    const user = useUser({ redirectTo: '/login', redirectIfFound: false });

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Offering Title" name="title" required />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Offering Description" name="description" required/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" className="mr-3" name="category" placeholder="Category" >
                        { categoryEl }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="provider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control type="text" placeholder="Provider" name="provider" required />
                    {/*<input type="hidden" name="isProvidedBy" value={'provider_webri'} />*/}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="owner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" placeholder="Owner" name="owner" required />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="marketId">
                    <Form.Label>Marketplace</Form.Label>
                    <Form.Control type="text" placeholder="Marketplace" name="marketId" required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="expirationTime">
                    <Form.Label>Expiration Time</Form.Label>
                    <Form.Control type="date" placeholder="Expiration Time" name="expirationTime" required />
                </Form.Group>
            </Col>
        </Row>
    </>);
}
