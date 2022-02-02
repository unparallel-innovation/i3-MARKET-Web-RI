import { Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function HasLicenseGrant(props) {
    const {
        copyData, transferable, exclusiveness, revocable, eventKey
    } = props;

    const [copyDataTemp, setCopyData] = useState(copyData);
    const [transferableTemp, setTransferable] = useState(transferable);
    const [exclusivenessTemp, setExclusiveness] = useState(exclusiveness);
    const [revocableTemp, setRevocable] = useState(revocable);

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'copyData'}>
                        <Form.Label>Copy Data</Form.Label>
                        <Form.Control as="select" value={copyDataTemp} name={eventKey + 'copyData'}
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
                        <Form.Control as="select" value={transferableTemp} name={eventKey + 'transferable'}
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
                        <Form.Control as="select" value={exclusivenessTemp} name={eventKey + 'exclusiveness'}
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
                        <Form.Control as="select" value={revocableTemp} name={eventKey + 'revocable'}
                            onChange={e => { setRevocable(e.target.value); }}
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
