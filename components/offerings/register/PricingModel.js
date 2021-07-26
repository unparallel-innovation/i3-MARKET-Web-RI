import {useState} from "react";
import PaymentType from "./PaymentType";
import {Accordion, Card, Col, Form, Row} from "react-bootstrap";
import CustomToggle from "../../CustomToggle";
import { AddNew } from '/components/buttons.js';

export default function PricingModel(props) {
    const [ paymentTypeN, setPaymentTypeN ] = useState(1);
    const { eventKey } = props;

    const paymentTypeEl = (Array.from(Array(paymentTypeN).keys())).map((item, idx) => (
        <PaymentType key={idx}
                     eventKey={`${eventKey}paymentType${idx}`} />
    ));

    return (
        <Accordion>
            <Card className="my-3">
                <CustomToggle eventKey={eventKey}>
                    Pricing Model
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'basicPrice'}>
                                    <Form.Label>Basic Price</Form.Label>
                                    <Form.Control type="text" placeholder="Basic Price"
                                                  name={eventKey + 'basicPrice'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'currency'}>
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Control type="text" placeholder="Currency"
                                                  name={eventKey + 'currency'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                      <div className="d-flex align-items-center my-3">
                        <h5 className="flex-grow-1 mb-0">
                          Payment Type
                        </h5>
                        <AddNew />
                      </div>

                        {paymentTypeEl}

                        <input type="hidden" value={paymentTypeN}
                               name={eventKey + 'paymentTypeN'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
