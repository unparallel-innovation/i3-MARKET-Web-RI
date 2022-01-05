import { useMap } from '/lib/hooks.js';
import PaymentType from './PaymentType';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../../DeleteToggle';
import { AddNew } from '/components/buttons.js';
import PaymentOnSubscription from './PaymentType/PaymentOnSubscription';
import PaymentOnPlan from './PaymentType/_old/PaymentOnPlan';
import PaymentOnAPI from './PaymentType/PaymentOnAPI';
import PaymentOnUnit from './PaymentType/PaymentOnUnit';
import PaymentOnSize from './PaymentType/PaymentOnSize';

export default function PricingModel_old(props) {
    const { eventKey, onDelete } = props;
    const [
        paymentTypeMap, paymentTypeC,
        paymentTypeOnDelete, paymentTypeOnAdd
    ] = useMap(eventKey, 'paymentType');

    const paymentTypeEl = (Object.keys(paymentTypeMap)).map((item, idx) => (
        <PaymentType key={item} eventKey={item}
            onDelete={paymentTypeOnDelete} />
    ));

    return (
        <Accordion>
            <Card className="my-3">
                <DeleteToggle eventKey={eventKey} onDelete={onDelete}
                    className="bg-primary text-white"
                >
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
                            <h5 className="flex-grow-1 mb-0">
                                Payment Type
                            </h5>
                            {/*<AddNew onClick={paymentTypeAdd} />*/}
                        </div>

                        { paymentTypeEl }

                        <input type="hidden" value={paymentTypeC}
                            name={eventKey + 'paymentTypeC'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
