import { Col, Form, Row } from 'react-bootstrap';
import PaymentOnSubscription from './PricingModel/PaymentOnSubscription';
import PaymentOnApi from './PricingModel/PaymentOnApi';
import PaymentOnSize from './PricingModel/PaymentOnSize';
import PaymentOnUnit from './PricingModel/PaymentOnUnit';
import FreePrice from './PricingModel/FreePrice';

export default function PricingModel(props) {
    const {
        basicPrice, currency, pricingModelName,
        hasFreePrice, hasPaymentOnApi, hasPaymentOnSize,
        hasPaymentOnSubscription, hasPaymentOnUnit, eventKey
    } = props;

    const paymentSubscriptionEl = hasPaymentOnSubscription.map((item, idx) => (
        <PaymentOnSubscription key={item.paymentId} eventKey={`hasPaymentOnSubscription${idx}`} { ...item } />
    ));

    const paymentApiEl = hasPaymentOnApi.map((item, idx) => (
        <PaymentOnApi key={item.paymentId} eventKey={`hasPaymentOnApi${idx}`} { ...item } />
    ));

    const paymentSizeEl = hasPaymentOnSize.map((item, idx) => (
        <PaymentOnSize key={item.paymentId} eventKey={`hasPaymentOnSize${idx}`} { ...item } />
    ));

    const paymentUnitEl = hasPaymentOnUnit.map((item, idx) => (
        <PaymentOnUnit key={item.paymentId} eventKey={`hasPaymentOnUnit${idx}`} { ...item } />
    ));

    const hasFreePriceEl = hasFreePrice.map((item, idx) => (
        <FreePrice key={item.paymentId} eventKey={`hasFreePrice${idx}`} { ...item } />
    ));

    return (
        <>
            <Form.Group controlId={eventKey + 'pricingModelName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                    name={eventKey + 'pricingModelName'} defaultValue={pricingModelName}/>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'basicPrice'}>
                        <Form.Label>Basic Price</Form.Label>
                        <Form.Control type="text" placeholder="Basic Price"
                            name={eventKey + 'basicPrice'} defaultValue={basicPrice}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'currency'}>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control type="text" placeholder="Currency"
                            name={eventKey + 'currency'} defaultValue={currency}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <div className="d-flex align-items-center my-3">
                <h5 className="flex-grow-1 mb-0">Payment Type</h5>
            </div>

            { paymentSubscriptionEl }
            { paymentApiEl }
            { paymentSizeEl }
            { paymentUnitEl }
            { hasFreePriceEl }

        </>
    );

}
