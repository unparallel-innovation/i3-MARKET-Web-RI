import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import CustomToggle from '../../../../common/CustomToggle';

export default function PaymentOnUnit(props) {
    const { paymentOnUnitName, hasUnitPrice, description, dataUnit, eventKey } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Payment on Unit
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'paymentOnUnitName'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                name={eventKey + 'paymentOnUnitName'} defaultValue={paymentOnUnitName} />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description"
                                name={eventKey + 'description'} defaultValue={description}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataUnit'}>
                                    <Form.Label>Data Unit</Form.Label>
                                    <Form.Control type="text" placeholder="Data Unit"
                                        name={eventKey + 'dataUnit'} defaultValue={dataUnit} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hasUnitPrice'}>
                                    <Form.Label>Unit Price</Form.Label>
                                    <Form.Control type="text" placeholder="Unit Price"
                                        name={eventKey + 'hasUnitPrice'} defaultValue={hasUnitPrice}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
