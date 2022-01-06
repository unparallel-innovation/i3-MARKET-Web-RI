import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../PaymentTypeToggle';
import { useState } from 'react';

export default function HasLicenseGrant(props) {
    const { eventKey, onDelete, onAdd } = props;
    const [copyData, setCopyData] = useState('');
    const [transferable, setTransferable] = useState('');
    const [exclusiveness, setExclusiveness] = useState('');
    const [revocable, setRevocable] = useState('');

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Has License Grant
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'copyData'}>
                                    <Form.Label>Copy Data</Form.Label>
                                    <Form.Control as="select" value={copyData} name={eventKey + 'copyData'}
                                        onChange={e => { setCopyData(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'transferable'}>
                                    <Form.Label>Transferable</Form.Label>
                                    <Form.Control as="select" value={transferable} name={eventKey + 'transferable'}
                                        onChange={e => { setTransferable(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'exclusiveness'}>
                                    <Form.Label>Exclusiveness</Form.Label>
                                    <Form.Control as="select" value={exclusiveness} name={eventKey + 'exclusiveness'}
                                        onChange={e => { setExclusiveness(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'revocable'}>
                                    <Form.Label>Revocable</Form.Label>
                                    <Form.Control as="select" value={revocable} name={eventKey + 'revocable'}
                                        onChange={e => { setRevocable(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
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
