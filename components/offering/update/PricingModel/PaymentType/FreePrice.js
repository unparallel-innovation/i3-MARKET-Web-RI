import { Form } from 'react-bootstrap';

export default function FreePrice(props) {
    const {
        paymentId, hasPriceFree, eventKey
    } = props;

    return (
        <>
            <h6 className="flex-grow-1 mt-4 mb-4">Free Price</h6>

            <Form.Group controlId={eventKey + 'hasPriceFree'}>
                <Form.Label>Free Price</Form.Label>
                <Form.Control type="text" placeholder="Free Price"
                    name={'hasPriceFree'} defaultValue={hasPriceFree}/>
            </Form.Group>
            <input type="hidden" name={eventKey + 'paymentId'} defaultValue={paymentId} />
        </>
    );
}
