import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import CustomToggle from '../../../common/CustomToggle';
import CustomLabel from '../../../common/CustomLabel';

export default function AccessService(props) {
    const { conformsTo, endpointURL, endpointDescription, servesDataset, serviceSpecs, eventKey } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey}>
                    Access Service
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'endpointUrl'}>
                                    <CustomLabel value="Endpoint URL" tooltip="The root location or primary endpoint of the service [a Web-resolvable IRI]" />
                                    <Form.Control type="text" name={eventKey + 'endpointUrl'} defaultValue={endpointURL} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'endpointDescription'}>
                                    <CustomLabel value="Endpoint Description" tooltip="A description of the services available via the end-points, including their operations, parameters etc" />
                                    <Form.Control type="text" name={eventKey + 'endpointDescription'} defaultValue={endpointDescription} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'conformsTo'}>
                                    <CustomLabel value="Conforms To" tooltip="An established standard to which the distribution conforms" />
                                    <Form.Control type="text" name={eventKey + 'conformsTo'} defaultValue={conformsTo} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'servesDataset'}>
                                    <CustomLabel value="Serves Dataset" tooltip="A collection of data that this data service can distribute.The Dataset ID or Title" />
                                    <Form.Control type="text" name={eventKey + 'servesDataset'} defaultValue={servesDataset} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'serviceSpecs'}>
                                    <CustomLabel value="Service Specs" tooltip="Description of service specification for more detail on the data service implementations" />
                                    <Form.Control type="text" name={eventKey + 'serviceSpecs'} defaultValue={serviceSpecs} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
