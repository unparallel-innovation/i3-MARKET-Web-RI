import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import AccessService from './AccessService';
import { useMap } from '/lib/hooks.js';
import DeleteToggle from '../../../common/DeleteToggle';
import { useState } from 'react';

export default function DatasetDistribution(props) {
    const { eventKey, onDelete } = props;
    const [dtStream, setDtStream] = useState(false);
    const [ accessServiceC ] = useMap(eventKey, 'accessService');

    const accessServiceEl = <AccessService key={'accessServiceKey'} eventKey={eventKey + 'accessService0'} />;

    return (
        <Accordion>
            <Card className="mb-3">
                <DeleteToggle eventKey={eventKey}
                    className="bg-secondary text-white" onDelete={onDelete}>
                    Distribution
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'title'}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Distribution Title"
                                name={eventKey + 'title'}
                            />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder="Distribution Description"
                                name={eventKey + 'description'}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'accessRights'}>
                                    <Form.Label>Access Rights</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Access Rights"
                                        name={eventKey + 'accessRights'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'downloadType'}>
                                    <Form.Label>Download Type</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Download Type"
                                        name={eventKey + 'downloadType'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'license'}>
                                    <Form.Label>License</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="License"
                                        name={eventKey + 'license'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'conformsTo'}>
                                    <Form.Label>conformsTo</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="conformsTo"
                                        name={eventKey + 'conformsTo'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'mediaType'}>
                                    <Form.Label>mediaType</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="mediaType"
                                        name={eventKey + 'mediaType'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'packageFormat'}>
                                    <Form.Label>packageFormat</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="packageFormat"
                                        name={eventKey + 'packageFormat'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataStream'}>
                                    <Form.Label>Data Stream</Form.Label>
                                    <Form.Control as="select" value={dtStream} name={eventKey + 'dataStream'}
                                      onChange={e => { setDtStream(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col/>
                        </Row>

                        <div className="d-flex align-items-center my-3">
                            <h5 className="flex-grow-1 mb-0">
                                Access Service
                            </h5>
                        </div>

                        { accessServiceEl }

                        <input type="hidden" value={accessServiceC}
                            name={eventKey + 'accessServiceC'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
