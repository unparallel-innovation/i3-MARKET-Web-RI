import { Form, Row, Col } from 'react-bootstrap';
import user from '/lib/user.js';

export default function General(props) {
    const { categories } = props;

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Offering Title" name="title" />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Offering Description" name="description"/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" className="mr-3" name="category"
                        placeholder="Category"
                    >
                        { categoryEl }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="provider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control type="text" placeholder="Provider"
                        name="provider" disabled value={user.providerId} />
                    <input type="hidden" name="isProvidedBy" value={user.providerId} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="license">
                    <Form.Label>License</Form.Label>
                    <Form.Control type="text" placeholder="License" name="license" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="label">
                    <Form.Label>Label</Form.Label>
                    <Form.Control type="text" placeholder="Label" name="label" />
                </Form.Group>
            </Col>
        </Row>
    </>);
}
