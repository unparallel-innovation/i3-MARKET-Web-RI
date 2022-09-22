import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';
import CustomLabel from '../../../common/CustomLabel';

export default function HasIntendedUse(props) {
    const { processData, editData, shareDataWithThirdParty, eventKey } = props;
    const [process, setProcessData] = useState(processData);
    const [share, setShareData] = useState(shareDataWithThirdParty);
    const [edit, setEditData] = useState(editData);

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Has Intended Use
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'processData'}>
                                    <CustomLabel value="Process Data" tooltip="If consumer allowed to process data" />
                                    <Form.Control as="select" value={process} name={eventKey + 'processData'}
                                        onChange={e => { setProcessData(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'shareDataWithThirdParty'}>
                                    <CustomLabel value="Share Data With Third Party" tooltip="If consumer allowed to share data with third parties" />
                                    <Form.Control as="select" value={share} name={eventKey + 'shareDataWithThirdParty'}
                                        onChange={e => { setShareData(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'editData'}>
                                    <CustomLabel value="Edit Data" tooltip="If consumer allowed to edit the Data" />
                                    <Form.Control as="select" value={edit} name={eventKey + 'editData'}
                                        onChange={e => { setEditData(e.target.value); }}
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
