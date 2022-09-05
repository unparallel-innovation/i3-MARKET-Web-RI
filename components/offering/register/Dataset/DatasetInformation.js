import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../../common/DeleteToggle';
import CustomLabel from '../../../common/CustomLabel';

export default function DatasetInformation(props) {
    const {
        cppType, deviceId, measurementChannelType,
        measurementType, sensorId, sensorType, eventKey, onDelete
    } = props;

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
                                    <CustomLabel value="CPP Type" tooltip="The cpp types in the dataset. Derived from AGORA requirements" />
                                    <Form.Control type="text" name={eventKey + 'cppType'} defaultValue={cppType} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'deviceId'}>
                                    <CustomLabel value="Device ID" tooltip="Device ID" />
                                    <Form.Control type="text" name={eventKey + 'deviceId'} defaultValue={deviceId} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'measurementType'}>
                                    <CustomLabel value="Measurement Type" tooltip="The data types which represent attributes of observations, measurements in the dataset" />
                                    <Form.Control type="text" name={eventKey + 'measurementType'} defaultValue={measurementType} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'measurementChannelType'}>
                                    <CustomLabel value="Measurement Channel Type" tooltip="The data measurement Channel types in the dataset. Derived from AGORA requirements" />
                                    <Form.Control type="text" name={eventKey + 'measurementChannelType'} defaultValue={measurementChannelType} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'sensorId'}>
                                    <CustomLabel value="Sensor ID" tooltip="Sensor ID" />
                                    <Form.Control type="text" name={eventKey + 'sensorId'} defaultValue={sensorId} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'sensorType'}>
                                    <CustomLabel value="Sensor Type" tooltip="The cpp types in the dataset. Derived from Wellbeing and AGORA requirements" />
                                    <Form.Control type="text" name={eventKey + 'sensorType'} defaultValue={sensorType} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
