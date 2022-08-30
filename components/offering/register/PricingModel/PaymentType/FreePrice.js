import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export default function FreePrice(props) {
    const { eventKey } = props;
    const [freePrice, setFreePrice] = useState('');

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'hasPriceFree'}>
                        <Form.Control as="select" value={freePrice} name={eventKey + 'hasPriceFree'}
                                      onChange={e => { setFreePrice(e.target.value); }} >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col />
            </Row>
        </>
    )
}
