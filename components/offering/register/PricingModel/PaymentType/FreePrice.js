import { Accordion, Card, Form } from 'react-bootstrap';
import CustomToggle from '../../../../common/CustomToggle';

export default function FreePrice(props) {
    const { eventKey } = props;

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
                            <Form.Control type="text" placeholder="Free Price" name={eventKey + 'hasPriceFree'} />
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
