import { Card, Col, Row } from 'react-bootstrap';
import KVCol2 from '../../common/KVCol2';

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

function freePrice(item){
    return (
        <PaymentType
            key={'free'}
            paymentTypeTitle="Free"
            price={item.hasPriceFree}
            repeatPrice="mo"
            paymentTypeEl={null}
        />
    )
}

function paymentOnApi(item){
    const { hasApiPrice, description, numberOfObject } = item;

    const paymentTypeEl = (
        <Card.Text>
            Number Objects: { numberOfObject }<br />
            Description: { description }<br />
        </Card.Text>
    );

    return (
        <PaymentType
            key={'api'}
            paymentTypeTitle="API"
            price={hasApiPrice}
            repeatPrice="mo"
            paymentTypeEl={paymentTypeEl}
        />
    );
}

function paymentOnSize(item){
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
            key={'size'}
            paymentTypeTitle="Size"
            price={hasSizePrice}
            repeatPrice="GB"
            paymentTypeEl={paymentTypeEl}
        />
    )
}

function paymentSubscription(item){

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
            key={'subscription'}
            paymentTypeTitle="Subscription"
            price={hasSubscriptionPrice}
            repeatPrice={repeatPrice}
            paymentTypeEl={paymentTypeEl}
        />
    );

}

function paymentUnit(item){
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
            key={'unit'}
            paymentTypeTitle="Unit"
            price={hasUnitPrice}
            repeatPrice="mo"
            paymentTypeEl={paymentTypeEl}
        />
    );
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
