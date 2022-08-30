import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import FreePrice from './PaymentType/FreePrice';
import OneTimePayment from './PaymentType/OneTimePayment';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';

export default function PricingModel(props) {
    const [type, setType] = useState('oneTime');

    let paymentTypeEl = ''

    switch (type) {
        case 'oneTime':
            paymentTypeEl = <OneTimePayment {...props}/>
            break
        case 'subscription':
            paymentTypeEl = <PaymentOnSubscription {...props} />
            break
        case 'free':
            paymentTypeEl = <FreePrice {...props}/>
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
