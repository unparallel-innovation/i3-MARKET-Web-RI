import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CustomLabel from '../../../../common/CustomLabel';

export default function PaymentOnSubscription(props) {
    const {
        paymentOnSubscriptionName, paymentType, description,
        timeDuration, repeat, hasSubscriptionPrice, eventKey
    } = props;
    const [repeatMode, setRepeatMode] = useState(repeat);

    return (
        <>
            <Form.Group controlId={eventKey + 'paymentOnSubscriptionName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name={eventKey + 'paymentOnSubscriptionName'} defaultValue={paymentOnSubscriptionName}/>
            </Form.Group>

            <Form.Group controlId="description">
                <CustomLabel value="Description" tooltip="The description of payment on subscription" />
                <Form.Control as="textarea" rows={3} name={eventKey + 'description'} defaultValue={description} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'hasSubscriptionPrice'}>
                        <CustomLabel value="Subscription Price" tooltip="Price allocated to subscription payment type" />
                        <Form.Control type="number" min={0} name={eventKey + 'hasSubscriptionPrice'} defaultValue={hasSubscriptionPrice} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'repeat'}>
                        <CustomLabel value="Repeat" tooltip="If subscription can be repeated define the frequency" />
                        <Form.Control as="select" value={repeatMode} name={eventKey + 'repeat'}
                            onChange={e => { setRepeatMode(e.target.value); }} >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'timeDuration'}>
                        <CustomLabel value="Time Duration" tooltip="Time duration of subscription. Price is per timeDuration" />
                        <Form.Control type="text" name={eventKey + 'timeDuration'} defaultValue={timeDuration} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
}
