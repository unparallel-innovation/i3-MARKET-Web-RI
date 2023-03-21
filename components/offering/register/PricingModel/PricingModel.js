import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import OneTimePayment from './PaymentType/OneTimePayment';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';
import CustomLabel from '../../../common/CustomLabel';

function getPaymentType(props) {
    const { basicPrice, hasPaymentOnSubscription, hasFreePrice } = props;

    if (basicPrice > 0)
        return 'oneTime';
    else if (hasPaymentOnSubscription && hasPaymentOnSubscription.hasSubscriptionPrice > 0)
        return 'subscription';
    else if (hasFreePrice && hasFreePrice.hasPriceFree)
        return 'free';
    return 'oneTime';
}

export default function PricingModel(props) {
    const { hasPaymentOnSubscription, eventKey } = props;

    const previousType = getPaymentType(props);

    const [type, setType] = useState(previousType);

    let paymentTypeEl = '';

    switch (type) {
        case 'oneTime':
            paymentTypeEl = <OneTimePayment {...props}/>;
            break;
        case 'subscription':
            paymentTypeEl = <PaymentOnSubscription {...hasPaymentOnSubscription} eventKey={eventKey + 'paymentSubscription0'} />;
            break;
        case 'free':
            paymentTypeEl = <input type="hidden" value={'true'} name={eventKey + 'freePrice0hasPriceFree'} />;
            break;
    }

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <CustomLabel value="Payment Type" required />
                    <Form.Group controlId={'paymentType'}>
                        <Form.Control as="select" value={type} onChange={e => { setType(e.target.value); }} >
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
    );
}
