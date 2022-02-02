import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function HasIntendedUse(props) {
    const {
        processData, shareDataWithThirdParty, editData, eventKey
    } = props;

    const [processDataTemp, setProcessData] = useState(processData);
    const [shareDataTemp, setShareData] = useState(shareDataWithThirdParty);
    const [editDataTemp, setEditData] = useState(editData);

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'processData'}>
                        <Form.Label>Process Data</Form.Label>
                        <Form.Control as="select" value={processDataTemp} name={eventKey + 'processData'}
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
                        <Form.Control as="select" value={shareDataTemp} name={eventKey + 'shareDataWithThirdParty'}
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
                        <Form.Control as="select" value={editDataTemp} name={eventKey + 'editData'}
                            onChange={e => { setEditData(e.target.value); }}
                        >
                            <option value="">---</option>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
}
