import { Card, Col, Row } from 'react-bootstrap';
import KVCol2 from '../../common/KVCol2';
import TextElem from '../../common/TextElem';

function PaymentType(props) {
    const { paymentTypeTitle, price, repeatPrice, paymentTypeEl } = props;

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

function freePrice(item) {
    return item.hasPriceFree ? (
        <PaymentType
            key={'free'}
            paymentTypeTitle="Free"
            price={item.hasPriceFree}
            repeatPrice="mo"
            paymentTypeEl={null}
        />
    ) : '';
}

function paymentOnApi(item) {
    const { paymentOnApiName, hasApiPrice, description, numberOfObject } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Number Objects'} value={numberOfObject} />
            <TextElem title={'Description'} value={description} />
        </Card.Text>
    );

    return paymentOnApiName ? (
        <PaymentType
            key={'api'}
            paymentTypeTitle="API"
            price={hasApiPrice}
            repeatPrice="mo"
            paymentTypeEl={paymentTypeEl}
        />
    ) : '';
}

function paymentOnSize(item) {
    const { hasSizePrice, dataSize, paymentOnSizeName, description } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnSizeName} />
            <TextElem title={'Description'} value={description} />
            <TextElem title={'Size'} value={dataSize} />
        </Card.Text>
    );

    return paymentOnSizeName ? (
        <PaymentType
            key={'size'}
            paymentTypeTitle="Size"
            price={hasSizePrice}
            repeatPrice="GB"
            paymentTypeEl={paymentTypeEl}
        />
    ) : '';
}

function paymentSubscription(item) {
    const {
        paymentOnSubscriptionName, paymentType, description,
        timeDuration, repeat, hasSubscriptionPrice
    } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnSubscriptionName} />
            <TextElem title={'Description'} value={description} />
            <TextElem title={'Payment Type'} value={paymentType} />
            <TextElem title={'Duration'} value={timeDuration} />
            <TextElem title={'Repeat Mode'} value={repeat} />
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

    return paymentOnSubscriptionName ? (
        <PaymentType
            key={'subscription'}
            paymentTypeTitle="Subscription"
            price={hasSubscriptionPrice}
            repeatPrice={repeatPrice}
            paymentTypeEl={paymentTypeEl}
        />
    ) : '';
}

function paymentUnit(item) {
    const { paymentOnUnitName, description, hasUnitPrice, dataUnit } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnUnitName} />
            <TextElem title={'Description'} value={description} />
            <TextElem title={'Data unit'} value={dataUnit} />
        </Card.Text>
    );

    return paymentOnUnitName ? (
        <PaymentType
            key={'unit'}
            paymentTypeTitle="Unit"
            price={hasUnitPrice}
            repeatPrice="mo"
            paymentTypeEl={paymentTypeEl}
        />
    ) : '';
}

export default
function PricingModel(props) {
    const {
        pricingModelName, basicPrice, currency,
        hasFreePrice, hasPaymentOnApi, hasPaymentOnSize,
        hasPaymentOnSubscription, hasPaymentOnUnit
    } = props;

    const freeEl = freePrice(hasFreePrice);
    const apiEl = paymentOnApi(hasPaymentOnApi);
    const sizeEl = paymentOnSize(hasPaymentOnSize);
    const subscriptionEl = paymentSubscription(hasPaymentOnSubscription);
    const unitEl = paymentUnit(hasPaymentOnUnit);

    return (<>
        <h3 className="mb-4 mt-4 text-center">Pricing Model</h3>
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
