import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';

export default function HasIntendedUse(props) {
    const { processData, editData, shareDataWithThirdParty, eventKey } = props;
    const [process, setProcessData] = useState(Boolean(processData));
    const [share, setShareData] = useState(Boolean(shareDataWithThirdParty));
    const [edit, setEditData] = useState(Boolean(editData));

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
                                    <Form.Label>Process Data</Form.Label>
                                    <Form.Control as="select" value={process} name={eventKey + 'processData'}
                                        onChange={e => { setProcessData(e.target.value); }}
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'shareDataWithThirdParty'}>
                                    <Form.Label>Share Data With Third Party</Form.Label>
                                    <Form.Control as="select" value={share} name={eventKey + 'shareDataWithThirdParty'}
                                        onChange={e => { setShareData(e.target.value); }}
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'editData'}>
                                    <Form.Label>Edit Data</Form.Label>
                                    <Form.Control as="select" value={edit} name={eventKey + 'editData'}
                                        onChange={e => { setEditData(e.target.value); }}
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
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
