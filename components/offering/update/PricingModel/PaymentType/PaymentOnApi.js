import { Col, Form, Row } from 'react-bootstrap';

export default function PaymentOnApi(props) {
    const {
        paymentId, paymentOnApiName, description,
        numberOfObject, hasApiPrice, eventKey
    } = props;

    return (
        <>
            <h6 className="flex-grow-1 mt-4 mb-4">Payment on API</h6>

            <Form.Group controlId={eventKey + 'paymentOnApiName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                    name={eventKey + 'paymentOnApiName'} defaultValue={paymentOnApiName}/>
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description"
                    name={eventKey + 'description'} defaultValue={description}/>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'numberOfObject'}>
                        <Form.Label>Number of Object</Form.Label>
                        <Form.Control type="text" placeholder="Number of Object"
                            name={eventKey + 'numberOfObject'} defaultValue={numberOfObject}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'hasApiPrice'}>
                        <Form.Label>API Price</Form.Label>
                        <Form.Control type="text" placeholder="API Price"
                            name={eventKey + 'hasApiPrice'} defaultValue={hasApiPrice}/>
                    </Form.Group>
                </Col>
            </Row>
            <input type="hidden" name={eventKey + 'paymentId'} defaultValue={paymentId} />
        </>
    );
}
