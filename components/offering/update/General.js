import useUser from '../../../lib/user';
import { Col, Form, Row } from 'react-bootstrap';

export default function General(props) {
    const { offering, categories } = props;

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Offering Title" name="title" defaultValue={offering.dataOfferingTitle} />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Offering Description" name="description"
                defaultValue={offering.dataOfferingDescription}/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" className="mr-3" name="category"
                        placeholder="Category" defaultValue={offering.category}
                    >
                        { categoryEl }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="provider">
                    <Form.Label>Provider</Form.Label>
                    {/*<Form.Control type="text" placeholder="Provider"*/}
                    {/*    name="provider" disabled defaultValue={user.providerId} />*/}
                    {/*<input type="hidden" name="provider" value={user.providerId} />*/}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="owner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" placeholder="Owner" name="owner" defaultValue={offering.owner}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group controlId="marketId">
                    <Form.Label>Marketplace</Form.Label>
                    <Form.Control type="text" placeholder="Marketplace"
                        name="marketId" defaultValue={offering.marketId} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="expirationTime">
                    <Form.Label>Expiration Time</Form.Label>
                    <Form.Control type="date" placeholder="Expiration Time"
                        name="expirationTime" default={offering.dataOfferingExpirationTime}/>
                </Form.Group>
            </Col>
        </Row>
        <input type="hidden" name="dataOfferingId" defaultValue={offering.dataOfferingId} />
        <input type="hidden" name="status" defaultValue={offering.status} />
    </>);
}
