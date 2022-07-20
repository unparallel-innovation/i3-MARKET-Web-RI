import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import CustomToggle from '../../../../common/CustomToggle';

export default function PaymentOnAPI(props) {
    const { hasApiPrice, paymentOnApiName, description, numberOfObject, eventKey } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Payment on API
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnAPIName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                name={eventKey + 'paymentOnAPIName'} defaultValue={paymentOnApiName}/>
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description"
                                name={eventKey + 'description'} defaultValue={description}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'numberOfObject'}>
                                    <Form.Label>Number of Object</Form.Label>
                                    <Form.Control type="text" placeholder="Number of Object"
                                        name={eventKey + 'numberOfObject'} defaultValue={numberOfObject}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasAPIPrice'}>
                                    <Form.Label>API Price</Form.Label>
                                    <Form.Control type="number" placeholder="API Price" min={0}
                                        name={eventKey + 'hasAPIPrice'} defaultValue={hasApiPrice} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
