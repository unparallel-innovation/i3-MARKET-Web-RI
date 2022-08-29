import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import PricingManagerModal from '../../PricingManagerModal';

export default function PricingModel(props) {
    const [type, setType] = useState('oneTime');

    let paymentTypeEl = ''

    switch (type) {
        case 'oneTime':
            paymentTypeEl = <OneTimeEl {...props}/>
            break
        case 'subscription':
            paymentTypeEl = <SubscriptionEl {...props} />
            break
        case 'free':
            paymentTypeEl = <FreePriceEl {...props}/>
            break
        default:
            paymentTypeEl = <></>
            break
    }

    return (
        <>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId={'paymentType'}>
                        <Form.Control as="select" value={type} onChange={e => { setType(e.target.value); }}>
                            <option value="oneTime">One Time Purchase</option>
                            <option value="subscription">Subscription</option>
                            <option value="free">Free Price</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col />
            </Row>
            {paymentTypeEl}
        </>
    )
}

function OneTimeEl(props){
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

function SubscriptionEl(props){
    const { eventKey } = props;
    const [repeatMode, setRepeatMode] = useState('week');

    return (
        <>
            <Form.Group controlId={eventKey + 'paymentOnSubscriptionName'}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" name={eventKey + 'paymentOnSubscriptionName'} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Description" name="description" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'hasSubscriptionPrice'}>
                        <Form.Label>Subscription Price</Form.Label>
                        <Form.Control type="number" placeholder="Subscription Price" min={0}
                                      name={eventKey + 'hasSubscriptionPrice'}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'paymentType'}>
                        <Form.Label>Payment Type</Form.Label>
                        <Form.Control type="text" placeholder="Payment Type" name={eventKey + 'paymentType'} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'repeat'}>
                        <Form.Label>Repeat</Form.Label>
                        <Form.Control as="select" value={repeatMode} name={eventKey + 'repeat'}
                                      onChange={e => { setRepeatMode(e.target.value); }} >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'timeDuration'}>
                        <Form.Label>Time Duration</Form.Label>
                        <Form.Control type="text" placeholder="Time Duration" name={eventKey + 'timeDuration'} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}


function FreePriceEl(props) {
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
