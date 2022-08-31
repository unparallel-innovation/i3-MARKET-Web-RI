import { useMap } from '/lib/hooks.js';
import PaymentOnSubscription from './PaymentOnSubscription';
import PaymentOnAPI from './PaymentOnApi';
import PaymentOnUnit from './PaymentOnUnit';
import PaymentOnSize from './PaymentOnSize';
import FreePrice from './FreePrice';
import OneTimePurchase from './OneTimePurchase';

export default function PricingModel(props) {
    const { basicPrice, currency, pricingModelName,
        hasFreePrice, hasPaymentOnApi, hasPaymentOnSize,
        hasPaymentOnSubscription, hasPaymentOnUnit, eventKey
    } = props;

    const oneTimePurchase = {
        basicPrice, currency, pricingModelName, eventKey
    };

    // one-time purchase
    const [ oneTimePurchaseC ] = useMap(eventKey, 'oneTimePurchase');
    const oneTimePurchaseEl = <OneTimePurchase key={'oneTimePurchaseKey'} eventKey={eventKey + 'oneTimePurchase0'} {...oneTimePurchase}/>;

    // payment on subscription
    const [ paymentSubscriptionC ] = useMap(eventKey, 'paymentSubscription');
    const paymentSubscriptionEl = <PaymentOnSubscription key={'paymentSubscriptionKey'} eventKey={eventKey + 'paymentSubscription0'} {...hasPaymentOnSubscription}/>;

    // payment on API
    const [ paymentApiC ] = useMap(eventKey, 'paymentApi');
    const paymentApiEl = <PaymentOnAPI key={'paymentApiKey'} eventKey={eventKey + 'paymentApi0'} {...hasPaymentOnApi} />;

    // payment on Unit
    const [ paymentUnitC ] = useMap(eventKey, 'paymentUnit');
    const paymentUnitEl = <PaymentOnUnit key={'paymentUnitKey'} eventKey={eventKey + 'paymentUnit0'} {...hasPaymentOnUnit} />;

    // payment on Size
    const [ paymentSizeC ] = useMap(eventKey, 'paymentSize');
    const paymentSizeEl = <PaymentOnSize key={'paymentSizeKey'} eventKey={eventKey + 'paymentSize0'} {...hasPaymentOnSize} />;

    // free price
    const [ freePriceC ] = useMap(eventKey, 'freePrice');
    const freePriceEl = <FreePrice key={'freePriceKey'} eventKey={eventKey + 'freePrice0'} {...hasFreePrice} />;

    return (<>
        { oneTimePurchaseEl }
        { paymentSubscriptionEl }
        { paymentApiEl }
        { paymentUnitEl }
        { paymentSizeEl }
        { freePriceEl }

        <input type="hidden" value={oneTimePurchaseC} name={eventKey + 'oneTimePurchaseC'} />
        <input type="hidden" value={paymentSubscriptionC} name={eventKey + 'paymentSubscriptionC'} />
        <input type="hidden" value={paymentApiC} name={eventKey + 'paymentApiC'} />
        <input type="hidden" value={paymentUnitC} name={eventKey + 'paymentUnitC'} />
        <input type="hidden" value={paymentSizeC} name={eventKey + 'paymentSizeC'} />
        <input type="hidden" value={freePriceC} name={eventKey + 'freePriceC'} />
    </>);
}
