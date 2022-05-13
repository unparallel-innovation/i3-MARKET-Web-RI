import { Accordion, Card, Form } from 'react-bootstrap';
import CustomToggle from '../../../../common/CustomToggle';
import { useState } from 'react';

export default function FreePrice(props) {
    const { hasPriceFree, eventKey } = props;
    const [freePrice, setFreePrice] = useState(Boolean(hasPriceFree));

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Free Price
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'hasPriceFree'}>
                            <Form.Label>Free Price</Form.Label>
                            <Form.Control as="select" value={freePrice} name={eventKey + 'hasPriceFree'}
                                onChange={e => { setFreePrice(e.target.value); }} >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
