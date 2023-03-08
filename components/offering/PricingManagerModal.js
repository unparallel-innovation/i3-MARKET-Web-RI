import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';

export default function PricingManagerModal(props) {
    const { onClose, onSubmit, eventKey } = props;

    const [cost, setCost] = useState(0);
    const [estValue, setEstValue] = useState(0);
    const [dataComp, setDataComp] = useState(0);
    const [dataAcc, setDataAcc] = useState(0);
    const [uniq, setUniq] = useState(0);
    const [rarity, setRarity] = useState(0);
    const [price, setPrice] = useState(0);

    function onClick() {
        const parameters = {
            'CostOfCollecting': cost,
            'EstimatedValue': estValue,
            'DataCompleteness': dataComp,
            'DataAccuracy': dataAcc,
            'UniqueEntries': uniq,
            'Rarity': rarity
        };

        fetch(`/api/price?parameters=${JSON.stringify(parameters)}`).
            then(res => {
                res.json().then(r => {
                    setPrice(r);
                });
            });
    }

    function onConfirm() {
        onSubmit(price);
    }

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'costOfCollection'}>
                        <Form.Label>Cost Of Collecting</Form.Label>
                        <div className="d-inline-block" title="Cost of collecting, storing and analysis (if relevant)">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'costOfCollection'} min={0}
                            value={cost} onChange={e => { setCost(e.target.value); }}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'estimatedValue'}>
                        <Form.Label>Estimated Value</Form.Label>
                        <div className="d-inline-block" title="Estimated  value for the consumer">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'estimatedValue'} min={0}
                            value={estValue} onChange={e => { setEstValue(e.target.value); }}/>
                    </Form.Group>
                </Col>

            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'dataCompleteness'}>
                        <Form.Label>Data Completeness</Form.Label>
                        <div className="d-inline-block" title="Data Completeness: The data is complete">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'dataCompleteness'} min={0}
                            value={dataComp} onChange={e => { setDataComp(e.target.value); }}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'dataAccuracy'}>
                        <Form.Label>Data Accuracy</Form.Label>
                        <div className="d-inline-block" title="Data Accuracy and Validity: The data is accurate">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'dataAccuracy'} min={0}
                            value={dataAcc} onChange={e => { setDataAcc(e.target.value); }}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'uniqueEntries'}>
                        <Form.Label>Unique Entries</Form.Label>
                        <div className="d-inline-block" title="Unique entries-values: The are no duplicates in the dataset">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'uniqueEntries'} min={0}
                            value={uniq} onChange={e => { setUniq(e.target.value); }}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'rarity'}>
                        <Form.Label>Rarity</Form.Label>
                        <div className="d-inline-block" title="Rarity-Scarceness: The data is rare">
                            <InfoCircle className="ml-2" />
                        </div>
                        <Form.Control type="number" name={eventKey + 'rarity'} min={0}
                            value={rarity} onChange={e => { setRarity(e.target.value); }}/>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className="d-flex align-items-center">
                        <Button onClick={onClick}>Calculate</Button>
                        <div className="ml-2">Recommended Price: {Math.round(price)}</div>
                    </div>
                </Col>
            </Row>

            <hr className="mt-2 mb-2" />

            <div className="float-right">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button className="ml-2" variant="primary" onClick={onConfirm}>Submit</Button>
            </div>
        </>
    );
}
