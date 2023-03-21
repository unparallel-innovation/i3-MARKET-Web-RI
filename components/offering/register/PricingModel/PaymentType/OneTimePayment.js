import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import PricingManagerModal from '../../../PricingManagerModal';
import CustomLabel from '../../../../common/CustomLabel';

export default function OneTimePayment(props) {
    const { basicPrice, pricingModelName, eventKey } = props;
    const [ show, setShow ] = useState(false);
    const [ price, setPrice ] = useState(basicPrice);

    function onSubmit(price,e) {
        e.preventDefault();
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
                <CustomLabel value="Name" tooltip="The name to define the legacy , by Marketplace, pricing model related to the data offering" />
                <Form.Control type="text" name={eventKey + 'pricingModelName'} defaultValue={pricingModelName} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'basicPrice'}>
                        <div className="d-flex align-items-lg-start">
                            <CustomLabel value="Basic Price" tooltip="The generic basic price for the traded data for basic cost of trade" />
                            <Button size="sm" className="ml-2" style={{ marginTop: -4 }} onClick={() => setShow(true)}> Get Recommended Price </Button>
                        </div>
                        <Form.Control type="number" name={eventKey + 'basicPrice'} min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'currency'}>
                        <CustomLabel value="Currency" tooltip="The file format of the distribution" />
                        <Form.Control type="text" name={eventKey + 'currency'} defaultValue={'EUR'} disabled />
                        <input type="hidden" name={eventKey + 'currency'} defaultValue={'EUR'} />
                    </Form.Group>
                </Col>
            </Row>
            { showModal(show) }
        </>
    );
}
