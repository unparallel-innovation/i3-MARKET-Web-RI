import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';
import CustomLabel from '../../../common/CustomLabel';

export default function HasLicenseGrant(props) {
    const { copyData, transferable, exclusiveness, revocable, eventKey } = props;
    const [cd, setCopyData] = useState(copyData);
    const [tf, setTransferable] = useState(transferable);
    const [excl, setExclusiveness] = useState(exclusiveness);
    const [rev, setRevocable] = useState(revocable);

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
                                    <CustomLabel value="Copy Data" tooltip="If licence grant to copy data" />
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
                                    <CustomLabel value="Transferable" tooltip="If licence is transferable" />
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
                                    <CustomLabel value="Exclusiveness" tooltip="If licence grant exclusiveness" />
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
                                    <CustomLabel value="Revocable" tooltip="If licence is revocable" />
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
