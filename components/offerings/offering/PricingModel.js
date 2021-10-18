import {Card, Col} from 'react-bootstrap';
import {ts2date} from '/lib/utils.js';

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
        hasFreePrice,
        hasPaymentOnAPI,
        hasPaymentOnPlan,
        hasPaymentOnSize,
        hasPaymentOnSubscription,
        hasPaymentOnUnit,
    } = props;

    console.log('PricingModel', props);

    const freeEl = hasFreePrice.map((item, idx) => {
        return (
            <PaymentType
                key={'free' + idx}
                paymentTypeTitle="Free"
                price={0}
                repeatPrice="mo"
                paymentTypeEl={null}
            />
        );
    });

    const apiEl = hasPaymentOnAPI.map((item, idx) => {
        const { hasAPIPrice, numberOfObject } = item;

        const paymentTypeEl = (
            <Card.Text>
                Number Objects: { numberOfObject }<br />
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
    });

    const planEl = hasPaymentOnPlan.map((item, idx) => {
        const { hasPlanPrice, planDuration } = item;

        const paymentTypeEl = (
            <Card.Text>
                Duration: { planDuration }<br />
            </Card.Text>
        );

        return (
            <PaymentType
                key={'plan' + idx}
                paymentTypeTitle="Plan"
                price={hasPlanPrice}
                repeatPrice="mo"
                paymentTypeEl={paymentTypeEl}
            />
        );
    });

    const sizeEl = hasPaymentOnSize.map((item, idx) => {
        const { hasSizePrice, dataSize } = item;

        const paymentTypeEl = (
            <Card.Text>
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
    });

    const subscriptionEl = hasPaymentOnSubscription.map((item, idx) => {
        const {
            timeDuration, repeat, fromValue,
            toValue, hasSubscriptionPrice
        } = item;

        const dateOpt = { year: 'numeric', day: 'numeric', month: 'long' };

        const paymentTypeEl = (
            <Card.Text>
                Duration: { timeDuration }<br />
                Repeat Mode: { repeat }<br />
                Date: { ts2date(fromValue, dateOpt) } to { ts2date(toValue, dateOpt) }
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
    });

    const unitEl = hasPaymentOnUnit.map((item, idx) => {
        const { hasUnitPrice, dataUnit, unitID } = item;

        const paymentTypeEl = (
            <Card.Text>
                Data unit: { dataUnit }<br />
                Unit ID: { unitID }<br />
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
    });

    return (<>
        { freeEl }
        { apiEl }
        { planEl }
        { sizeEl }
        { subscriptionEl }
        { unitEl }
    </>);
}
