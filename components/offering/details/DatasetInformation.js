import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '/components/common/CustomToggle.js';
import KVCol from '../../common/KVCol.js';

export default
function DatasetInformation(props) {
    const {
        measurementType, measurementChannelType, sensorId,
        deviceId, cppType, sensorType, eventKey
    } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Dataset Information</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Measurement Type">
                                { measurementType }
                            </KVCol>
                            <KVCol title="Measurement Channel Type">
                                { measurementChannelType }
                            </KVCol>
                            <KVCol title="Device ID">
                                { deviceId }
                            </KVCol>
                        </Row>

                        <Row className="text-center bg-lightgray">
                            <KVCol title="Sensor ID">
                                { sensorId }
                            </KVCol>
                            <KVCol title="Sensor Type">
                                { sensorType }
                            </KVCol>
                            <KVCol title="CPP Type">
                                { cppType }
                            </KVCol>
                        </Row>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
