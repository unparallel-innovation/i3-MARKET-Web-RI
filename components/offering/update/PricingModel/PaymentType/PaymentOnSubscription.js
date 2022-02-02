import { Col, Form, Row } from 'react-bootstrap';

export default function PaymentOnSubscription(props) {
    const {
        paymentId, paymentOnSubscriptionName, description, paymentType,
        hasSubscriptionPrice, repeat, timeDuration, eventKey
    } = props;

    return (
        <>
            <h6 className="flex-grow-1 mt-4 mb-4">Payment on Subscription</h6>

            <Form.Group controlId={eventKey + 'paymentOnSubscriptionName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                    name={eventKey + 'paymentOnSubscriptionName'} defaultValue={paymentOnSubscriptionName}/>
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description"
                    name={eventKey + 'description'} defaultValue={description}/>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'hasSubscriptionPrice'}>
                        <Form.Label>Subscription Price</Form.Label>
                        <Form.Control type="text" placeholder="Subscription Price"
                            name={eventKey + 'hasSubscriptionPrice'} defaultValue={hasSubscriptionPrice}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'paymentType'}>
                        <Form.Label>Payment Type</Form.Label>
                        <Form.Control type="text" placeholder="Payment Type"
                            name={eventKey + 'paymentType'} defaultValue={paymentType}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'repeat'}>
                        <Form.Label>Repeat</Form.Label>
                        <Form.Control type="text" placeholder="Repeat"
                            name={eventKey + 'repeat'} defaultValue={repeat}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'timeDuration'}>
                        <Form.Label>Time Duration</Form.Label>
                        <Form.Control type="text" placeholder="Time Duration"
                            name={eventKey + 'timeDuration'} defaultValue={timeDuration} />
                    </Form.Group>
                </Col>
            </Row>
            <input type="hidden" name={eventKey + 'paymentId'} defaultValue={paymentId} />
        </>
    );
}
