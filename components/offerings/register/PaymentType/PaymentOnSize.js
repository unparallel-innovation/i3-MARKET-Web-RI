import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../../../PaymentTypeToggle';

export default function PaymentOnSize(props) {
    const { eventKey, onDelete, onAdd, title } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Payment on Size {title}
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnSizeName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnSizeName'} />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" name={eventKey + 'description'}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataSize'}>
                                    <Form.Label>Data Size</Form.Label>
                                    <Form.Control type="text" placeholder="Data Size" name={eventKey + 'dataSize'} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasSizePrice'}>
                                    <Form.Label>Size Price</Form.Label>
                                    <Form.Control type="text" placeholder="Size Price" name={eventKey + 'hasSizePrice'} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}