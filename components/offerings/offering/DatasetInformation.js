import { Accordion, Card, Row, Table } from 'react-bootstrap';
import CustomToggle from '/components/CustomToggle.js';
import KVCol from './KVCol.js';

export default
function DatasetInformation(props) {
    const {
        measurementType, measurementChannelType, sensorID,
        deviceID, cppType, sensorType, eventKey
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
                                { deviceID }
                            </KVCol>
                        </Row>

                        <Row className="text-center bg-lightgray">
                            <KVCol title="Sensor ID">
                                { sensorID }
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
