import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';

export default function HasLicenseGrant(props) {
    const { copyData, transferable, exclusiveness, revocable, eventKey } = props;
    const [cd, setCopyData] = useState(Boolean(copyData));
    const [tf, setTransferable] = useState(Boolean(transferable));
    const [excl, setExclusiveness] = useState(Boolean(exclusiveness));
    const [rev, setRevocable] = useState(Boolean(revocable));

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Has License Grant
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'copyData'}>
                                    <Form.Label>Copy Data</Form.Label>
                                    <Form.Control as="select" value={cd} name={eventKey + 'copyData'}
                                        onChange={e => { setCopyData(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'transferable'}>
                                    <Form.Label>Transferable</Form.Label>
                                    <Form.Control as="select" value={tf} name={eventKey + 'transferable'}
                                        onChange={e => { setTransferable(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'exclusiveness'}>
                                    <Form.Label>Exclusiveness</Form.Label>
                                    <Form.Control as="select" value={excl} name={eventKey + 'exclusiveness'}
                                        onChange={e => { setExclusiveness(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'revocable'}>
                                    <Form.Label>Revocable</Form.Label>
                                    <Form.Control as="select" value={rev} name={eventKey + 'revocable'}
                                        onChange={e => { setRevocable(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
