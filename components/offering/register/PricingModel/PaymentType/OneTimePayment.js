import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PricingManagerModal from '../../../PricingManagerModal';

export default function OneTimePayment(props){
    const { eventKey } = props;
    const [ show, setShow ] = useState(false);
    const [ price, setPrice ] = useState('');

    function onSubmit(price) {
        setPrice(Math.round(price));
        onClose();
    }

    function onClose() {
        setShow(false);
    }

    function showModal(show) {
        return (
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    Recommend Price based on Dataset characteristics
                </Modal.Header>
                <Modal.Body>
                    <PricingManagerModal eventKey={eventKey} onClose={onClose} onSubmit={onSubmit}/>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <Form.Group controlId={eventKey + 'pricingModelName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name={eventKey + 'pricingModelName'} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'basicPrice'}>
                        <Form.Label>Basic Price</Form.Label>
                        <Button size="sm" className="ml-2" onClick={() => setShow(true)}> Get Recommended Price </Button>
                        <Form.Control type="number" name={eventKey + 'basicPrice'} min={0}
                                      value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'currency'}>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control type="text" placeholder="Currency" name={eventKey + 'currency'} />
                    </Form.Group>
                </Col>
            </Row>
            { showModal(show) }
        </>
    )
}
