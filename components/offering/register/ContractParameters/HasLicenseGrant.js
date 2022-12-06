import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import CustomToggle from '../../../common/CustomToggle';
import CustomLabel from '../../../common/CustomLabel';

export default function HasLicenseGrant(props) {
    const {
        transferable, exclusiveness, paidUp, revocable, processing,
        modifying, analyzing, storingData, storingCopy, reproducing,
        distributing, loaning, selling, renting, furtherLicensing, leasing,
        eventKey
    } = props;

    const [tf, setTransferable] = useState(transferable);
    const [excl, setExclusiveness] = useState(exclusiveness);
    const [paid, setPaidUp] = useState(paidUp);
    const [rev, setRevocable] = useState(revocable);
    const [proc, setProcessing] = useState(processing);
    const [mod, setModifying] = useState(modifying);
    const [analyze, setAnalyzing] = useState(analyzing);
    const [storeData, setStoringData] = useState(storingData);
    const [storeCopy, setStoringCopy] = useState(storingCopy);
    const [reproduce, setReproducing] = useState(reproducing);
    const [dist, setDistributing] = useState(distributing);
    const [loan, setLoaning] = useState(loaning);
    const [sell, setSelling] = useState(selling);
    const [rent, setRenting] = useState(renting);
    const [furtherLicense, setFurtherLicensing] = useState(furtherLicensing);
    const [lease, setLeasing] = useState(leasing);

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    Has License Grant
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'paidUp'}>
                                    <CustomLabel value="Paid Up" tooltip="If licence grant to paidUp" />
                                    <Form.Control as="select" value={paid} name={eventKey + 'paidUp'}
                                                  onChange={e => { setPaidUp(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId={eventKey + 'transferable'}>
                                    <CustomLabel value="Transferable" tooltip="If license is transferable" />
                                    <Form.Control as="select" value={tf} name={eventKey + 'transferable'}
                                                  onChange={e => { setTransferable(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'exclusiveness'}>
                                    <CustomLabel value="Exclusiveness" tooltip="If license grant exclusiveness" />
                                    <Form.Control as="select" value={excl} name={eventKey + 'exclusiveness'}
                                                  onChange={e => { setExclusiveness(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'revocable'}>
                                    <CustomLabel value="Revocable" tooltip="If license is revocable" />
                                    <Form.Control as="select" value={rev} name={eventKey + 'revocable'}
                                                  onChange={e => { setRevocable(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'processing'}>
                                    <CustomLabel value="Processing" tooltip="If license grant data to be processed" />
                                    <Form.Control as="select" value={proc} name={eventKey + 'processing'}
                                                  onChange={e => { setProcessing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'modifying'}>
                                    <CustomLabel value="Modifying" tooltip="If license grant data to be modified" />
                                    <Form.Control as="select" value={mod} name={eventKey + 'modifying'}
                                                  onChange={e => { setModifying(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'analyzing'}>
                                    <CustomLabel value="Analyzing" tooltip="If license grant data to be analyzed" />
                                    <Form.Control as="select" value={analyze} name={eventKey + 'analyzing'}
                                                  onChange={e => { setAnalyzing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'storingData'}>
                                    <CustomLabel value="Storing Data" tooltip="If license grant to store data" />
                                    <Form.Control as="select" value={storeData} name={eventKey + 'storingData'}
                                                  onChange={e => { setStoringData(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'storingCopy'}>
                                    <CustomLabel value="Storing Copy" tooltip="If license grant to store a copy data" />
                                    <Form.Control as="select" value={storeCopy} name={eventKey + 'storingCopy'}
                                                  onChange={e => { setStoringCopy(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'reproducing'}>
                                    <CustomLabel value="Reproducing" tooltip="If license grant to reproduce data" />
                                    <Form.Control as="select" value={reproduce} name={eventKey + 'reproducing'}
                                                  onChange={e => { setReproducing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId={eventKey + 'distributing'}>
                                    <CustomLabel value="Distributing" tooltip="If license grant to distribute data" />
                                    <Form.Control as="select" value={dist} name={eventKey + 'distributing'}
                                                  onChange={e => { setDistributing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'loaning'}>
                                    <CustomLabel value="Loaning" tooltip="If license grant to loan data" />
                                    <Form.Control as="select" value={loan} name={eventKey + 'loaning'}
                                                  onChange={e => { setLoaning(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'selling'}>
                                    <CustomLabel value="Selling" tooltip="If license grant to sell data" />
                                    <Form.Control as="select" value={sell} name={eventKey + 'selling'}
                                                  onChange={e => { setSelling(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'renting'}>
                                    <CustomLabel value="Renting" tooltip="If license grant to rent data" />
                                    <Form.Control as="select" value={rent} name={eventKey + 'renting'}
                                                  onChange={e => { setRenting(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'furtherLicensing'}>
                                    <CustomLabel value="Further Licensing" tooltip="If license grant for further Licensing" />
                                    <Form.Control as="select" value={furtherLicense} name={eventKey + 'furtherLicensing'}
                                                  onChange={e => { setFurtherLicensing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'leasing'}>
                                    <CustomLabel value="Leasing" tooltip="If license grant to lease data" />
                                    <Form.Control as="select" value={lease} name={eventKey + 'leasing'}
                                                  onChange={e => { setLeasing(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
