import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export default function PaymentOnSubscription(props){
    const { eventKey } = props;
    const [repeatMode, setRepeatMode] = useState('week');

    return (
        <>
            <Form.Group controlId={eventKey + 'paymentOnSubscriptionName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnSubscriptionName'} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description" name="description" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'hasSubscriptionPrice'}>
                        <Form.Label>Subscription Price</Form.Label>
                        <Form.Control type="number" placeholder="Subscription Price" min={0}
                                      name={eventKey + 'hasSubscriptionPrice'}
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
                        <Form.Control as="select" value={repeatMode} name={eventKey + 'repeat'}
                                      onChange={e => { setRepeatMode(e.target.value); }} >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'timeDuration'}>
                        <Form.Label>Time Duration</Form.Label>
                        <Form.Control type="text" placeholder="Time Duration" name={eventKey + 'timeDuration'} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
