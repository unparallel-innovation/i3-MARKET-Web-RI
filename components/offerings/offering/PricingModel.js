import { Card, Col, Row } from 'react-bootstrap';
import { ts2date } from '/lib/utils.js';
import KVCol2 from '../../KVCol2';

function PaymentType(props) {
    const {
        paymentTypeTitle, price,
        repeatPrice, paymentTypeEl
    } = props;

    const style = {
        width: '350px',
    };

    return (
        <Col className="text-center">
            <Card className="text-center mb-5 d-inline-block" style={style}>
                <div className="p-2 bg-light">
                    { paymentTypeTitle }
                </div>
                <Card.Body>
                    <div>
                        <span className="display-4 font-weight-bold">
                            { price }&euro;
                        </span>
                        <span className="ml-2 h1 text-muted">
                            / { repeatPrice }
                        </span>
                    </div>
                    { paymentTypeEl }
                </Card.Body>
            </Card>
        </Col>
    );
}

export default
function PricingModel(props) {
    const {
        pricingModelName,
        basicPrice,
        currency,
        hasFreePrice,
        hasPaymentOnAPI,
        hasPaymentOnSize,
        hasPaymentOnSubscription,
        hasPaymentOnUnit,
    } = props;

    const freeEl = hasFreePrice.find(el=>el.hasPriceFree) ? hasFreePrice.map((item, idx) => {
        return (
            <PaymentType
                key={'free' + idx}
                paymentTypeTitle="Free"
                price={item.hasPriceFree}
                repeatPrice="mo"
                paymentTypeEl={null}
            />
        );
    }) : '';

    const apiEl = hasPaymentOnAPI.find(el=>el.hasAPIPrice) ? hasPaymentOnAPI.map((item, idx) => {
        const { hasAPIPrice, description, numberOfObject } = item;

        const paymentTypeEl = (
            <Card.Text>
                Number Objects: { numberOfObject }<br />
                Description: { description }<br />
            </Card.Text>
        );

        return (
            <PaymentType
                key={'api' + idx}
                paymentTypeTitle="API"
                price={hasAPIPrice}
                repeatPrice="mo"
                paymentTypeEl={paymentTypeEl}
            />
        );
    }) : '';

    const sizeEl = hasPaymentOnSize.find(el=>el.hasSizePrice) ? hasPaymentOnSize.map((item, idx) => {
        const { hasSizePrice, dataSize, paymentOnSizeName, description } = item;

        const paymentTypeEl = (
            <Card.Text>
                Name: { paymentOnSizeName} <br />
                Description : { description} <br />
                Size: { dataSize }<br />
            </Card.Text>
        );

        return (
            <PaymentType
                key={'size' + idx}
                paymentTypeTitle="Size"
                price={hasSizePrice}
                repeatPrice="GB"
                paymentTypeEl={paymentTypeEl}
            />
        );
    }) : '';

    const subscriptionEl = hasPaymentOnSubscription.find(el=>el.hasSubscriptionPrice) ? hasPaymentOnSubscription.map((item, idx) => {
        const {
            paymentOnSubscriptionName, paymentType, description,
            timeDuration, repeat, hasSubscriptionPrice
        } = item;

        const paymentTypeEl = (
            <Card.Text>
                Name: { paymentOnSubscriptionName } <br />
                Description: { description } <br />
                Payment Type: { paymentType } <br />
                Duration: { timeDuration }<br />
                Repeat Mode: { repeat }<br />
            </Card.Text>
        );

        let repeatPrice = null;

        // TODO complete this
        switch (repeat) {
            case 'weekly':
                repeatPrice = 'we';
                break;
            case 'monthly':
            case 'Monthly':
                repeatPrice = 'mo';
                break;
            case 'Daily':
                repeatPrice = 'day';
        }

        return (
            <PaymentType
                key={'subscription' + idx}
                paymentTypeTitle="Subscription"
                price={hasSubscriptionPrice}
                repeatPrice={repeatPrice}
                paymentTypeEl={paymentTypeEl}
            />
        );
    }) : '';

    const unitEl = hasPaymentOnUnit.find(el=>el.hasUnitPrice) ? hasPaymentOnUnit.map((item, idx) => {
        const { paymentOnUnitName, description, hasUnitPrice, dataUnit } = item;

        const paymentTypeEl = (
            <Card.Text>
                Name: { paymentOnUnitName } <br />
                Description: { description } <br />
                Data unit: { dataUnit } <br />
            </Card.Text>
        );

        return (
            <PaymentType
                key={'unit' + idx}
                paymentTypeTitle="Unit"
                price={hasUnitPrice}
                repeatPrice="mo"
                paymentTypeEl={paymentTypeEl}
            />
        );
    }) : '';

    return (<>
        <Col>
            <Row className="text-center mb-3">
                <KVCol2 title="Name">
                    { pricingModelName }
                </KVCol2>
                <KVCol2 title="Basic Price">
                    { basicPrice }
                </KVCol2>
                <KVCol2 title="Currency">
                    { currency }
                </KVCol2>
            </Row>
            <Row>
                { freeEl }
                { apiEl }
                { sizeEl }
                { subscriptionEl }
                { unitEl }
            </Row>
        </Col>
    </>);
}
