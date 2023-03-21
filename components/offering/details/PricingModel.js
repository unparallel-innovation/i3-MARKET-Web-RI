import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';

function OneTimePayment(props) {
    const { pricingModelName, basicPrice, currency } = props;

    if (basicPrice > 0) {
        return (
            <>
                <h6 className="text-center">One-Time Payment</h6>
                <Row className="text-center mt-3 bg-lightgray">
                    <KVCol title="Pricing Model Name">
                        { pricingModelName }
                    </KVCol>
                    <KVCol title="Basic Price">
                        { basicPrice }
                    </KVCol>
                    <KVCol title="Currency">
                        { currency }
                    </KVCol>
                </Row>
            </>
        );
    }
    return '';
}

function PaymentOnSubscription(props) {
    const {
        paymentOnSubscriptionName, paymentType, description,
        timeDuration, repeat, hasSubscriptionPrice, eventKey
    } = props;

    if (hasSubscriptionPrice > 0) {
        return (
            <>
                <h6 className="text-center">Payment On Subscription</h6>
                <Row className="text-center mt-3 bg-lightgray">
                    <KVCol title="Pricing Model Name">
                        { paymentOnSubscriptionName }
                    </KVCol>
                    <KVCol title="Description">
                        { description }
                    </KVCol>
                    <KVCol title="Payment Type">
                        { paymentType }
                    </KVCol>
                </Row>

                <Row className="text-center bg-lightgray">
                    <KVCol title="Subscription Price">
                        { hasSubscriptionPrice }
                    </KVCol>
                    <KVCol title="Repeat">
                        { repeat }
                    </KVCol>
                    <KVCol title="Time Duration">
                        { timeDuration }
                    </KVCol>
                </Row>
            </>
        );
    }
    return '';
}

function FreePrice(props) {
    const { hasPriceFree } = props;

    if (hasPriceFree) {
        return (
            <>
                <h6 className="text-center">Free Price</h6>
                <Row className="text-center mt-3 bg-lightgray">
                    <KVCol title="">
                        0 EUR
                    </KVCol>
                </Row>
            </>
        );
    }
    return '';
}

export default function PricingModel(props) {
    const {
        basicPrice, hasPaymentOnSubscription, hasFreePrice, eventKey
    } = props;

    let paymentTypeEl = '';

    if (basicPrice > 0) {
        paymentTypeEl = <OneTimePayment {...props} />;
    }
    else if (hasPaymentOnSubscription && hasPaymentOnSubscription.hasSubscriptionPrice > 0) {
        paymentTypeEl = <PaymentOnSubscription {...hasPaymentOnSubscription} />;
    }
    else {
        paymentTypeEl = <FreePrice {...hasFreePrice} />;
    }

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey} className="bg-dark text-white">
                    <div className="text-tiny text-light">Pricing Model</div>
                </CustomToggle>

                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        {paymentTypeEl}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
