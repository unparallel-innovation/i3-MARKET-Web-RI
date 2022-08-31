import { Card, Col, Row } from 'react-bootstrap';
import TextElem from '../../../common/TextElem';
import { useRouter } from 'next/router';

function PaymentType(props) {
    const router = useRouter();
    const { offeringId, type, title, price, repeatPrice, paymentTypeEl, user } = props;

    function onClick(e) {
        e.preventDefault();
        if (user.consumer) {
            const paymentType = {
                type: type,
                name: title,
                price: price,
                currency: '€'
            };
            router.push({
                pathname: '/offerings/contractTemplate/' + offeringId,
                query: { paymentType: JSON.stringify(paymentType) }
            }, '/offerings/contractTemplate/' + offeringId);
        }
    }

    return (
        <Col className="text-center">
            <Card className={`text-center mb-5 d-inline-block ${user.consumer ? 'cursor-pointer' : ''}`} style={{ width: '350px' }}
                onClick={onClick}>
                <div className="p-2 bg-light" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    { title }
                </div>
                <Card.Body>
                    <div>
                        <span className="display-4 font-weight-bold">
                            { price }&euro;
                        </span>
                        { repeatPrice ? (
                            <span className="ml-2 h3 text-muted">
                            / { repeatPrice }
                            </span>
                        ) : null }
                    </div>
                    { paymentTypeEl }
                </Card.Body>
            </Card>
        </Col>
    );
}

function freePrice(offeringId, item, user) {
    return item.hasPriceFree ? (
        <PaymentType
            key={'free'}
            type="Free Price"
            title="Free"
            price={0}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

function oneTime(offeringId, item, user) {
    return item.basicPrice ? (
        <PaymentType
            key={'oneTime'}
            type="One-Time Purchase"
            title="Single Purchase"
            price={item.basicPrice}
            paymentTypeEl={null}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

function paymentOnApi(offeringId, item, user) {
    const { paymentOnApiName, hasApiPrice, description, numberOfObject } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnApiName} />
            <TextElem title={'Number Objects'} value={numberOfObject} />
            <TextElem title={'Description'} value={description} />
        </Card.Text>
    );

    return hasApiPrice ? (
        <PaymentType
            key={'api'}
            type="Payment on API"
            title="API"
            price={hasApiPrice}
            paymentTypeEl={paymentTypeEl}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

function paymentOnSize(offeringId, item, user) {
    const { hasSizePrice, dataSize, paymentOnSizeName, description } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnSizeName} />
            <TextElem title={'Description'} value={description} />
            <TextElem title={'Size'} value={dataSize} />
        </Card.Text>
    );

    return hasSizePrice ? (
        <PaymentType
            key={'size'}
            type="Payment On Size"
            title="Size"
            price={hasSizePrice}
            paymentTypeEl={paymentTypeEl}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

function paymentSubscription(offeringId, item, user) {
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

    return hasSubscriptionPrice ? (
        <PaymentType
            key={'subscription'}
            type="Payment On Subscription"
            title="Subscription"
            price={hasSubscriptionPrice}
            repeatPrice={repeat}
            paymentTypeEl={paymentTypeEl}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

function paymentUnit(offeringId, item, user) {
    const { paymentOnUnitName, description, hasUnitPrice, dataUnit } = item;

    const paymentTypeEl = (
        <Card.Text>
            <TextElem title={'Name'} value={paymentOnUnitName} />
            <TextElem title={'Description'} value={description} />
            <TextElem title={'Data unit'} value={dataUnit} />
        </Card.Text>
    );

    return hasUnitPrice ? (
        <PaymentType
            key={'unit'}
            type="Payment On Unit"
            title="Unit"
            price={hasUnitPrice}
            repeatPrice="mo"
            paymentTypeEl={paymentTypeEl}
            offeringId={offeringId}
            user={user}
        />
    ) : '';
}

export default
function PricingModel(props) {
    const {
        pricingModelName, basicPrice, currency,
        hasFreePrice, hasPaymentOnApi, hasPaymentOnSize,
        hasPaymentOnSubscription, hasPaymentOnUnit, offeringId, user
    } = props;

    const oneTimePurchase = {
        basicPrice, currency, pricingModelName
    };

    const oneTimeEl = oneTime(offeringId, oneTimePurchase, user);
    const freeEl = freePrice(offeringId, hasFreePrice, user);
    const apiEl = paymentOnApi(offeringId, hasPaymentOnApi, user);
    const sizeEl = paymentOnSize(offeringId, hasPaymentOnSize, user);
    const subscriptionEl = paymentSubscription(offeringId, hasPaymentOnSubscription, user);
    const unitEl = paymentUnit(offeringId, hasPaymentOnUnit, user);

    return (<>
        <Col className="mb-4 mt-4">
            <Row>
                { oneTimeEl }
                { freeEl }
                { apiEl }
                { sizeEl }
                { subscriptionEl }
                { unitEl }
            </Row>
        </Col>
    </>);
}
