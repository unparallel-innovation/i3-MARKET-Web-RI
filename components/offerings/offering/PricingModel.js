import { Card, Col } from 'react-bootstrap';
import { ts2date } from '/lib/utils.js';

export default
function PricingModel(props) {
    const { hasPaymentType } = props;
    const paymentType = hasPaymentType[0];
    let paymentTypeEl = null;
    let paymentTypeTitle = 'Invalid payment type';
    let price = null;
    let repeatPrice = null;

    const { hasSubscriptionPrice } = paymentType;

    // TODO add other types
    if (hasSubscriptionPrice) {
        const {
            timeDuration, repeat, fromValue,
            toValue, hasSubscriptionPrice
        } = paymentType;

        const dateOpt = { year: 'numeric', day: 'numeric', month: 'long' };

        paymentTypeEl = (
            <Card.Text>
                {/* Description<br /> */}
                Duration: { timeDuration }<br />
                Repeat Mode: { repeat }<br />
                Date: { ts2date(fromValue, dateOpt) } to { ts2date(toValue, dateOpt) }
            </Card.Text>
        );

        price = hasSubscriptionPrice;

        paymentTypeTitle = 'Subscription';

        // TODO complete this
        switch (repeat) {
            case 'weekly':
                repeatPrice = 'we';
            case 'monthly':
            case 'Monthly':
                repeatPrice = 'mo';
        }
    }

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
                    {/* <Card.Title> */}
                    {/*   Name plan */}
                    {/* </Card.Title> */}
                    { paymentTypeEl }
                </Card.Body>
            </Card>
        </Col>
    );
}
