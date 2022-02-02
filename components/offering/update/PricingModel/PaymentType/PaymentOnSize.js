import { Col, Form, Row } from 'react-bootstrap';

export default function PaymentOnSize(props) {
    const {
        paymentId, paymentOnSizeName, description,
        dataSize, hasSizePrice, eventKey
    } = props;

    return (
        <>
            <h6 className="flex-grow-1 mt-4 mb-4">Payment on Size</h6>

            <Form.Group controlId={eventKey + 'paymentOnSizeName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                    name={eventKey + 'paymentOnSizeName'} defaultValue={paymentOnSizeName}/>
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description"
                    name={eventKey + 'description'} defaultValue={description}/>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'dataSize'}>
                        <Form.Label>Data Size</Form.Label>
                        <Form.Control type="text" placeholder="Data Size"
                            name={eventKey + 'dataSize'} defaultValue={dataSize}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'hasSizePrice'}>
                        <Form.Label>Size Price</Form.Label>
                        <Form.Control type="text" placeholder="Size Price"
                            name={eventKey + 'hasSizePrice'} defaultValue={hasSizePrice}/>
                    </Form.Group>
                </Col>
            </Row>
            <input type="hidden" name={eventKey + 'paymentId'} defaultValue={paymentId} />
        </>
    );
}
