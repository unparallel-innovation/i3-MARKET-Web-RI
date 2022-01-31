import useUser from '../../../lib/user';
import { Col, Form, Row } from 'react-bootstrap';
import { capitalize } from '../../../lib/utils';

export default function General(props) {
    const { offering, categories } = props;
    const user = useUser();

    if (!user)
        return null;

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Offering Title" name="title" value={offering.dataOfferingTitle} />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Offering Description" name="description"
                value={offering.dataOfferingDescription}/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" className="mr-3" name="category"
                        placeholder="Category" defaultValue={capitalize(offering.category)}
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
            <Col>
                <Form.Group controlId="owner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" placeholder="Owner" name="owner" value={offering.owner}/>
                </Form.Group>
            </Col>
        </Row>

    </>);
}
