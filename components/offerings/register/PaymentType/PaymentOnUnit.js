import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../../../PaymentTypeToggle';

export default function PaymentOnUnit(props) {
    const { eventKey, onDelete, onAdd } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Payment on Unit
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnUnitName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnUnitName'} />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" name={eventKey + 'description'}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataUnit'}>
                                    <Form.Label>Data Unit</Form.Label>
                                    <Form.Control type="text" placeholder="Data Unit" name={eventKey + 'dataUnit'} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'unitID'}>
                                    <Form.Label>Unit ID</Form.Label>
                                    <Form.Control type="text" placeholder="Unit ID" name={eventKey + 'unitID'} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasUnitPrice'}>
                                    <Form.Label>Unit Price</Form.Label>
                                    <Form.Control type="text" placeholder="Unit Price" name={eventKey + 'hasUnitPrice'} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
