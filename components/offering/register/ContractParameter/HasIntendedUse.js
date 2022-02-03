import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../PaymentTypeToggle';
import { useState } from 'react';

export default function HasIntendedUse(props) {
    const { eventKey, onDelete, onAdd } = props;
    const [processData, setProcessData] = useState('');
    const [shareData, setShareData] = useState('');
    const [editData, setEditData] = useState('');

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Has Intended Use
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'processData'}>
                                    <Form.Label>Process Data</Form.Label>
                                    <Form.Control as="select" value={processData} name={eventKey + 'processData'}
                                        onChange={e => { setProcessData(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'shareDataWithThirdParty'}>
                                    <Form.Label>Share Data With Third Party</Form.Label>
                                    <Form.Control as="select" value={shareData} name={eventKey + 'shareDataWithThirdParty'}
                                        onChange={e => { setShareData(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'editData'}>
                                    <Form.Label>Edit Data</Form.Label>
                                    <Form.Control as="select" value={editData} name={eventKey + 'editData'}
                                        onChange={e => { setEditData(e.target.value); }}
                                    >
                                        <option value="">---</option>
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
