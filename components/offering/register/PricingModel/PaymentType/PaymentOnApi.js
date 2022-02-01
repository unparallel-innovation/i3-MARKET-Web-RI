import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../../PaymentTypeToggle';

export default function PaymentOnApi(props) {
    const { eventKey, onDelete, onAdd } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Payment on API
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnApiName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnApiName'} />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" name={eventKey + 'description'}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'numberOfObject'}>
                                    <Form.Label>Number of Object</Form.Label>
                                    <Form.Control type="text" placeholder="Number of Object" name={eventKey + 'numberOfObject'} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasApiPrice'}>
                                    <Form.Label>API Price</Form.Label>
                                    <Form.Control type="text" placeholder="API Price" name={eventKey + 'hasApiPrice'} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
