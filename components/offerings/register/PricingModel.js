import { useMap } from '/lib/hooks.js';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../DeleteToggle';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';
import PaymentOnPlan from './PaymentType/PaymentOnPlan';
import PaymentOnAPI from './PaymentType/PaymentOnAPI';
import PaymentOnUnit from './PaymentType/PaymentOnUnit';
import PaymentOnSize from './PaymentType/PaymentOnSize';
import FreePrice from './PaymentType/FreePrice';

export default function PricingModel(props) {
    const { eventKey, onDelete } = props;

    // payment on subscription
    const [
        paymentSubscriptionMap, paymentSubscriptionC,
        paymentSubscriptionOnDelete, paymentSubscriptionOnAdd
    ] = useMap(eventKey, 'paymentSubscription');

    const paymentSubscriptionEl = (Object.keys(paymentSubscriptionMap)).map((item, idx) => (
        <PaymentOnSubscription key={item} eventKey={item}
            onDelete={paymentSubscriptionOnDelete} onAdd={paymentSubscriptionOnAdd} />
    ));

    // // payment on plan
    // const [
    //     paymentPlanMap, paymentPlanC,
    //     paymentPlanOnDelete, paymentPlanOnAdd
    // ] = useMap(eventKey, 'paymentPlan');
    //
    // const paymentPlanEl = (Object.keys(paymentPlanMap)).map((item, idx) => (
    //     <PaymentOnPlan key={item} eventKey={item}
    //         onDelete={paymentPlanOnDelete} onAdd={paymentPlanOnAdd} />
    // ));

    // payment on API
    const [
        paymentApiMap, paymentApiC,
        paymentApiOnDelete, paymentApiOnAdd
    ] = useMap(eventKey, 'paymentApi');

    const paymentApiEl = (Object.keys(paymentApiMap)).map((item, idx) => (
        <PaymentOnAPI key={item} eventKey={item}
            onDelete={paymentApiOnDelete} onAdd={paymentApiOnAdd} />
    ));

    // payment on Unit
    const [
        paymentUnitMap, paymentUnitC,
        paymentUnitOnDelete, paymentUnitOnAdd
    ] = useMap(eventKey, 'paymentUnit');

    const paymentUnitEl = (Object.keys(paymentUnitMap)).map((item, idx) => (
        <PaymentOnUnit key={item} eventKey={item}
            onDelete={paymentUnitOnDelete} onAdd={paymentUnitOnAdd} />
    ));

    // payment on Size
    const [
        paymentSizeMap, paymentSizeC,
        paymentSizeOnDelete, paymentSizeOnAdd
    ] = useMap(eventKey, 'paymentSize');

    const paymentSizeEl = (Object.keys(paymentSizeMap)).map((item, idx) => (
        <PaymentOnSize key={item} eventKey={item}
            onDelete={paymentSizeOnDelete} onAdd={paymentSizeOnAdd} />
    ));

    // Free Price
    const [
        freePriceMap, freePriceC,
        freePriceOnDelete, freePriceOnAdd
    ] = useMap(eventKey, 'freePrice');

    const freePriceEl = (Object.keys(freePriceMap)).map((item, idx) => (
        <FreePrice key={item} eventKey={item}
            onDelete={freePriceOnDelete} onAdd={freePriceOnAdd} />
    ));

    return (
        <Accordion>
            <Card className="my-3">
                <DeleteToggle eventKey={eventKey} onDelete={onDelete} className="bg-primary text-white" >
                    Pricing Model
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'pricingModelName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name={eventKey + 'pricingModelName'} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'basicPrice'}>
                                    <Form.Label>Basic Price</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Basic Price"
                                        name={eventKey + 'basicPrice'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'currency'}>
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Currency"
                                        name={eventKey + 'currency'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex align-items-center my-3">
                            <h5 className="flex-grow-1 mb-0">Payment Type</h5>
                        </div>

                        { paymentSubscriptionEl }
                        {/*{ paymentPlanEl }*/}
                        { paymentApiEl }
                        { paymentUnitEl }
                        { paymentSizeEl }
                        { freePriceEl }

                        <input type="hidden" value={paymentSubscriptionC} name={eventKey + 'paymentSubscriptionC'} />
                        {/*<input type="hidden" value={paymentPlanC} name={eventKey + 'paymentPlanC'} />*/}
                        <input type="hidden" value={paymentApiC} name={eventKey + 'paymentApiC'} />
                        <input type="hidden" value={paymentUnitC} name={eventKey + 'paymentUnitC'} />
                        <input type="hidden" value={paymentSizeC} name={eventKey + 'paymentSizeC'} />
                        <input type="hidden" value={freePriceC} name={eventKey + 'freePriceC'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
