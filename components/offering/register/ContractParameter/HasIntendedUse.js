import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import PaymentTypeToggle from '../PaymentTypeToggle';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';

export default function HasIntendedUse(props) {
    const { eventKey } = props;
    const [processData, setProcessData] = useState('');
    const [shareData, setShareData] = useState('');
    const [editData, setEditData] = useState('');

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
                                    <Form.Control as="select" value={processData} name={eventKey + 'processData'}
                                        onChange={e => { setProcessData(e.target.value); }}
                                    >
                                        <option value="">---</option>
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
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
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
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
