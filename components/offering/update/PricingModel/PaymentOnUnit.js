import { Col, Form, Row } from 'react-bootstrap';

export default function PaymentOnUnit(props) {
    const {
        paymentOnUnitName, description,
        dataUnit, hasUnitPrice, eventKey
    } = props;

    return (
        <>
            <h6 className="flex-grow-1 mt-4 mb-4">Payment on Unit</h6>

            <Form.Group controlId={eventKey + 'paymentOnUnitName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"
                    name={'paymentOnUnitName'} defaultValue={paymentOnUnitName}/>
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description"
                    name="description" defaultValue={description}/>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'dataUnit'}>
                        <Form.Label>Data Unit</Form.Label>
                        <Form.Control type="text" placeholder="Data Unit"
                            name={'dataUnit'} defaultValue={dataUnit}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'hasUnitPrice'}>
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control type="text" placeholder="Unit Price"
                            name={'hasUnitPrice'} defaultValue={hasUnitPrice}/>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
}
