import {Accordion, Card, Col, Form, Row} from 'react-bootstrap';
import DeleteToggle from '../../../DeleteToggle';

export default function DatasetInformation(props) {
    const { eventKey, onDelete } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <DeleteToggle eventKey={eventKey}
                    className="bg-secondary text-white" onDelete={onDelete}>
                    Dataset Information
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'cppType'}>
                                    <Form.Label>cpp Type</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="cpp Type"
                                        name={eventKey + 'cppType'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'deviceID'}>
                                    <Form.Label>Device ID</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Device ID"
                                        name={eventKey + 'deviceID'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'measurementChannelType'}>
                                    <Form.Label>Measurement Channel Type</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Measurement Channel Type"
                                        name={eventKey + 'measurementChannelType'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'measurementType'}>
                                    <Form.Label>Measurement Type</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Measurement Type"
                                        name={eventKey + 'measurementType'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'sensorID'}>
                                    <Form.Label>Sensor ID</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Sensor ID"
                                        name={eventKey + 'sensorID'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'sensorType'}>
                                    <Form.Label>Sensor Type</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Sensor Type"
                                        name={eventKey + 'sensorType'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
