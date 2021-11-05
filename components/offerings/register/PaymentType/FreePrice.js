import { Accordion, Card, Form } from 'react-bootstrap';
import PaymentTypeToggle from '../../../PaymentTypeToggle';

export default function FreePrice(props) {
    const { eventKey, onDelete, onAdd } = props;

    return (
        <Accordion>
            <Card className="mb-3">
                <PaymentTypeToggle eventKey={eventKey} className="bg-secondary text-white" onDelete={onDelete} onAdd={onAdd}>
                    Free Price
                </PaymentTypeToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'hasPriceFree'}>
                            <Form.Label>Free Price</Form.Label>
                            <Form.Control type="text" placeholder="Free Price" name={eventKey + 'hasPriceFree'} />
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
