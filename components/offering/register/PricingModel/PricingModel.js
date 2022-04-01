import { useMap } from '/lib/hooks.js';
import { Col, Form, Row } from 'react-bootstrap';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';
import PaymentOnAPI from './PaymentType/PaymentOnAPI';
import PaymentOnUnit from './PaymentType/PaymentOnUnit';
import PaymentOnSize from './PaymentType/PaymentOnSize';
import FreePrice from './PaymentType/FreePrice';

export default function PricingModel(props) {
    const { eventKey } = props;

    // payment on subscription
    const [ paymentSubscriptionC ] = useMap(eventKey, 'paymentSubscription');
    const paymentSubscriptionEl = <PaymentOnSubscription key={'paymentSubscriptionKey'} eventKey={'paymentSubscription'} />;

    // payment on API
    const [ paymentApiC ] = useMap(eventKey, 'paymentApi');
    const paymentApiEl = <PaymentOnAPI key={'paymentApiKey'} eventKey={'paymentApi'} />;

    // payment on Unit
    const [ paymentUnitC ] = useMap(eventKey, 'paymentUnit');
    const paymentUnitEl = <PaymentOnUnit key={'paymentUnitKey'} eventKey={'paymentUnit'} />

    // payment on Size
    const [ paymentSizeC ] = useMap(eventKey, 'paymentSize');
    const paymentSizeEl = <PaymentOnSize key={'paymentSizeKey'} eventKey={'paymentSize'} />

    // Free Price
    const [ freePriceC ] = useMap(eventKey, 'freePrice');
    const freePriceEl = <FreePrice key={'freePriceKey'} eventKey={'freePrice'} />

    return (<>
        <Form.Group controlId={eventKey + 'pricingModelName'}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" name={eventKey + 'pricingModelName'} />
        </Form.Group>
        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'basicPrice'}>
                    <Form.Label>Basic Price</Form.Label>
                    <Form.Control type="text" placeholder="Basic Price" name={eventKey + 'basicPrice'} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'currency'}>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control type="text" placeholder="Currency" name={eventKey + 'currency'} />
                </Form.Group>
            </Col>
        </Row>

        <div className="d-flex align-items-center my-3">
            <h5 className="flex-grow-1 mb-0">Payment Type</h5>
        </div>

        { paymentSubscriptionEl }
        { paymentApiEl }
        { paymentUnitEl }
        { paymentSizeEl }
        { freePriceEl }

        <input type="hidden" value={paymentSubscriptionC} name={eventKey + 'paymentSubscriptionC'} />
        <input type="hidden" value={paymentApiC} name={eventKey + 'paymentApiC'} />
        <input type="hidden" value={paymentUnitC} name={eventKey + 'paymentUnitC'} />
        <input type="hidden" value={paymentSizeC} name={eventKey + 'paymentSizeC'} />
        <input type="hidden" value={freePriceC} name={eventKey + 'freePriceC'} />
    </>);
}
