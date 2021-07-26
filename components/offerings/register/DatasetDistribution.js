import {useState} from "react";
import {Accordion, Card, Col, Form, Row} from "react-bootstrap";
import CustomToggle from "../../CustomToggle";
import { AddNew } from '/components/buttons.js';
import AccessService from "./AccessService";

export default function DatasetDistribution(props) {
    const { eventKey } = props;
    const [ accessServiceN, setAccessServiceN ] = useState(1);

    const accessServiceEl = (Array.from(Array(accessServiceN).keys())).map((item, idx) => (
        <AccessService key={idx} eventKey={`${eventKey}accessService${idx}`} />
    ));

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey}>
                    Distribution
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'title'}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Distribution Title"
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
                                <Form.Group controlId={eventKey + 'license'}>
                                    <Form.Label>License</Form.Label>
                                    <Form.Control type="text" placeholder="License"
                                                  name={eventKey + 'license'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'conformsTo'}>
                                    <Form.Label>conformsTo</Form.Label>
                                    <Form.Control type="text" placeholder="conformsTo"
                                                  name={eventKey + 'conformsTo'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'mediaType'}>
                                    <Form.Label>mediaType</Form.Label>
                                    <Form.Control type="text" placeholder="mediaType"
                                                  name={eventKey + 'mediaType'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'packageFormat'}>
                                    <Form.Label>packageFormat</Form.Label>
                                    <Form.Control type="text" placeholder="packageFormat"
                                                  name={eventKey + 'packageFormat'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                      <div className="d-flex align-items-center my-3">
                        <h5 className="flex-grow-1 mb-0">
                          Access Service
                        </h5>
                        <AddNew onClick={e => {
                              setAccessServiceN(accessServiceN + 1);
                          }} />
                      </div>

                        {accessServiceEl}

                        <input type="hidden" value={accessServiceN}
                               name={eventKey + 'accessServiceN'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
