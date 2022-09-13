import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import FreePrice from './PaymentType/FreePrice';
import OneTimePayment from './PaymentType/OneTimePayment';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';
import CustomLabel from '../../../common/CustomLabel';

function getPaymentType(props) {
    const { basicPrice, hasPaymentOnSubscription, hasFreePrice, toUpdate, eventKey } = props;

    if (basicPrice > 0)
        return 'oneTime';
    else if (hasPaymentOnSubscription.hasSubscriptionPrice > 0)
        return 'subscription';
    else if (hasFreePrice.hasPriceFree)
        return 'free';
}

export default function PricingModel(props) {
    const { toUpdate, eventKey } = props;

    let previousType = 'oneTime';

    if (toUpdate)
        previousType = getPaymentType(props);

    const [type, setType] = useState(previousType);

    let paymentTypeEl = '';

    switch (type) {
        case 'oneTime':
            paymentTypeEl = <OneTimePayment {...props}/>;
            break;
        case 'subscription':
            paymentTypeEl = <PaymentOnSubscription eventKey={eventKey + 'paymentSubscription0'} />;
            break;
        case 'free':
            paymentTypeEl = <FreePrice eventKey={eventKey + 'freePrice0'}/>;
            break;
    }

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <CustomLabel value="Payment Type" required />
                    <Form.Group controlId={'paymentType'}>
                        <Form.Control as="select" value={type} onChange={e => { setType(e.target.value); }} disabled={toUpdate}>
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
