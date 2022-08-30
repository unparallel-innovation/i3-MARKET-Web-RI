import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import FreePrice from './PaymentType/FreePrice';
import OneTimePayment from './PaymentType/OneTimePayment';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';

export default function PricingModel(props) {
    const { eventKey } = props;
    const [type, setType] = useState('oneTime');

    let paymentTypeEl = ''

    switch (type) {
        case 'oneTime':
            paymentTypeEl = <OneTimePayment eventKey={eventKey}/>
            break
        case 'subscription':
            paymentTypeEl = <PaymentOnSubscription eventKey={eventKey + 'paymentSubscription0'} />
            break
        case 'free':
            paymentTypeEl = <FreePrice eventKey={eventKey + 'freePrice0'}/>
            break
    }

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId={'paymentType'}>
                        <Form.Control as="select" value={type} onChange={e => { setType(e.target.value); }}>
                            <option value="oneTime">One-Time Payment</option>
                            <option value="subscription">Payment On Subscription</option>
                            <option value="free">Free Price</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col />
            </Row>
            {paymentTypeEl}
        </>
    )
}
