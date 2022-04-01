import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import CustomToggle from '../../../../common/CustomToggle';

export default function PaymentOnSubscription(props) {
    const { eventKey } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Payment on Subscription
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnSubscriptionName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnSubscriptionName'} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" name="description"/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasSubscriptionPrice'}>
                                    <Form.Label>Subscription Price</Form.Label>
                                    <Form.Control type="text"
                                          placeholder="Subscription Price" name={eventKey + 'hasSubscriptionPrice'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'paymentType'}>
                                    <Form.Label>Payment Type</Form.Label>
                                    <Form.Control type="text" placeholder="Payment Type" name={eventKey + 'paymentType'} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'repeat'}>
                                    <Form.Label>Repeat</Form.Label>
                                    <Form.Control type="text" placeholder="repeat" name={eventKey + 'repeat'} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'timeDuration'}>
                                    <Form.Label>Time Duration</Form.Label>
                                    <Form.Control type="text" placeholder="Time Duration" name={eventKey + 'timeDuration'} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
