import { Col, Form, Row } from 'react-bootstrap';

export default function DatasetInformation(props) {
    const {
        datasetInformationId, cppType, deviceId, measurementChannelType,
        measurementType, sensorId, sensorType, eventKey
    } = props;

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'cppType'}>
                        <Form.Label>cpp Type</Form.Label>
                        <Form.Control type="text" placeholder="cpp Type"
                            name={eventKey + 'cppType'} defaultValue={cppType}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'deviceId'}>
                        <Form.Label>Device ID</Form.Label>
                        <Form.Control type="text" placeholder="Device ID"
                            name={eventKey + 'deviceId'} defaultValue={deviceId}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'measurementChannelType'}>
                        <Form.Label>Measurement Channel Type</Form.Label>
                        <Form.Control type="text" placeholder="Measurement Channel Type"
                            name={eventKey + 'measurementChannelType'} defaultValue={measurementChannelType}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'measurementType'}>
                        <Form.Label>Measurement Type</Form.Label>
                        <Form.Control type="text" placeholder="Measurement Type"
                            name={eventKey + 'measurementType'} defaultValue={measurementType}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'sensorId'}>
                        <Form.Label>Sensor ID</Form.Label>
                        <Form.Control type="text" placeholder="Sensor ID"
                            name={eventKey + 'sensorId'} defaultValue={sensorId}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'sensorType'}>
                        <Form.Label>Sensor Type</Form.Label>
                        <Form.Control type="text" placeholder="Sensor Type"
                            name={eventKey + 'sensorType'} defaultValue={sensorType}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <input type="hidden" name={eventKey + 'datasetInformationId'} defaultValue={datasetInformationId} />
        </>
    );
}
