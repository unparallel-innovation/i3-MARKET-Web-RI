import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../DeleteToggle';

export default function AccessService(props) {
    const { eventKey, onDelete } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <DeleteToggle eventKey={eventKey} onDelete={onDelete}>
                    Access Service
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'endpointDescription'}>
                                    <Form.Label>Endpoint Description</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Endpoint Description"
                                        name={eventKey + 'endpointDescription'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'endpointUrl'}>
                                    <Form.Label>Endpoint URL</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Endpoint URL"
                                        name={eventKey + 'endpointUrl'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'conformsTo'}>
                                    <Form.Label>Conforms To</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Conforms To"
                                        name={eventKey + 'conformsTo'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'servesDataset'}>
                                    <Form.Label>Serves Dataset</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Serves Dataset"
                                        name={eventKey + 'servesDataset'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'serviceSpecs'}>
                                    <Form.Label>Service Specs</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Service Specs"
                                        name={eventKey + 'serviceSpecs'}
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
