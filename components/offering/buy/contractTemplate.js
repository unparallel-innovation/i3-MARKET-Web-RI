import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import moment from 'moment';
import { getDateValue } from '../../../lib/utils';

export default function ContractTemplate(props){
    const router = useRouter();

    const {
        DataOfferingDescription, DataExchangeAgreement, DataStream, Purpose,
        hasDuration, hasIntendedUse, hasLicenseGrant, hasParties
    } = props;

    const hasDutiesObligations = props["hasDuties/Obligations"];


    const [characteristics, setCharacteristics] = useState('');
    const [process, setProcessData] = useState('');
    const [share, setShareData] = useState('');
    const [edit, setEditData] = useState('');
    const [cd, setCopyData] = useState('');
    const [tf, setTransferable] = useState('');
    const [excl, setExclusiveness] = useState('');
    const [rev, setRevocable] = useState('');
    const [ds, setDataStream] = useState('');

    function onCancel() {
        router.back();
    }

    function onSubmit(){
        // createDataPurchaseRequest
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">{'Contract Template'}</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="offeringId">
                            <Form.Label>Data Offering ID</Form.Label>
                            <Form.Control type="text" name="offeringId" defaultValue={DataOfferingDescription.dataOfferingId} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="providerId">
                            <Form.Label>Provider</Form.Label>
                            <Form.Control type="text" name="provider" defaultValue={DataOfferingDescription.provider} disabled />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" defaultValue={DataOfferingDescription.category} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="offeringTitle">
                    <Form.Label>Offering Title</Form.Label>
                    <Form.Control type="text" name="title" defaultValue={DataOfferingDescription.title} />
                </Form.Group>

                <Form.Group controlId="offeringDescription">
                    <Form.Label>Offering Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="offeringDescription" defaultValue={DataOfferingDescription.description} />
                </Form.Group>

                {/* boolean value */}
                <Form.Group controlId="purpose">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control type="text" name="purpose" defaultValue={Purpose} />
                </Form.Group>

                <h5 className="mt-4">Parties</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="dataProvider">
                            <Form.Label>Data Provider</Form.Label>
                            <Form.Control type="text" name="dataProvider" defaultValue={hasParties.Parties.dataProvider} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataConsumer">
                            <Form.Label>Data Consumer</Form.Label>
                            <Form.Control type="text" name="dataConsumer" defaultValue={hasParties.Parties.dataConsumer} />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Duration</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="creationDate">
                            <Form.Label>Creation Date</Form.Label>
                            <Form.Control type="date" name="creationDate"
                                          defaultValue={moment(hasDuration.Duration.creationDate).format('yyyy-MM-DD')}  />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate"
                                          defaultValue={getDateValue(hasDuration.Duration.creationDate)}  />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate"
                                          defaultValue={''/*moment(dataOfferingExpirationTime).format('yyyy-MM-DD')*/}  />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Duties / Obligations</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="qualityOfData">
                            <Form.Label>Quality Of Data</Form.Label>
                            <Form.Control type="text" name="qualityOfData" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="characteristics">
                            <Form.Label>Characteristics</Form.Label>
                            <Form.Control type="text" name="characteristics" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataAvailability">
                            <Form.Label>Data Availability</Form.Label>
                            <Form.Group controlId={'dataAvailability'}>
                                <Form.Control as="select" value={characteristics} name={'dataAvailability'}
                                              onChange={e => { setCharacteristics(e.target.value); }}
                                >
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Description of Data</h5>
                <hr className="mt-2 mb-4" />

                <Form.Group controlId="hasDescriptionOfData">
                    <Form.Control as="textarea" rows={3} name="hasDescriptionOfData" defaultValue={''} />
                </Form.Group>

                <h5 className="mt-4">Has Intended Use</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId={'processData'}>
                            <Form.Label>Process Data</Form.Label>
                            <Form.Control as="select" value={process} name={'processData'}
                                          onChange={e => { setProcessData(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'shareDataWithThirdParty'}>
                            <Form.Label>Share Data With Third Party</Form.Label>
                            <Form.Control as="select" value={share} name={'shareDataWithThirdParty'}
                                          onChange={e => { setShareData(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'editData'}>
                            <Form.Label>Edit Data</Form.Label>
                            <Form.Control as="select" value={edit} name={'editData'}
                                          onChange={e => { setEditData(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                </Row>

                <h5 className="mt-4">Has License Grant</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId={'copyData'}>
                            <Form.Label>Copy Data</Form.Label>
                            <Form.Control as="select" value={cd} name={'copyData'}
                                          onChange={e => { setCopyData(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'transferable'}>
                            <Form.Label>Transferable</Form.Label>
                            <Form.Control as="select" value={tf} name={'transferable'}
                                          onChange={e => { setTransferable(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId={'exclusiveness'}>
                            <Form.Label>Exclusiveness</Form.Label>
                            <Form.Control as="select" value={excl} name={'exclusiveness'}
                                          onChange={e => { setExclusiveness(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'revocable'}>
                            <Form.Label>Revocable</Form.Label>
                            <Form.Control as="select" value={rev} name={'revocable'}
                                          onChange={e => { setRevocable(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Data Stream</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col className="col-md-6">
                        <Form.Group controlId={'dataStream'}>
                            <Form.Control as="select" value={ds} name={'dataStream'}
                                          onChange={e => { setDataStream(e.target.value); }}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Data Exchange Agreement</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="orig">
                            <Form.Label>orig</Form.Label>
                            <Form.Control type="text" name="orig" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dest">
                            <Form.Label>dest</Form.Label>
                            <Form.Control type="text" name="dest" defaultValue={''} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="encAlg">
                            <Form.Label>encAlg</Form.Label>
                            <Form.Control type="text" name="encAlg" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="signingAlg">
                            <Form.Label>signingAlg</Form.Label>
                            <Form.Control type="text" name="signingAlg" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="hashAlg">
                            <Form.Label>hashAlg</Form.Label>
                            <Form.Control type="text" name="hashAlg" defaultValue={''} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="ledgerContractAddress">
                            <Form.Label>ledgerContractAddress</Form.Label>
                            <Form.Control type="text" name="ledgerContractAddress" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="ledgerSignerAddress">
                            <Form.Label>ledgerSignerAddress</Form.Label>
                            <Form.Control type="text" name="ledgerSignerAddress" defaultValue={''} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="pooToPorDelay">
                            <Form.Label>pooToPorDelay</Form.Label>
                            <Form.Control type="text" name="pooToPorDelay" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToPopDelay">
                            <Form.Label>pooToPopDelay</Form.Label>
                            <Form.Control type="text" name="pooToPopDelay" defaultValue={''} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToSecretDelay">
                            <Form.Label>pooToSecretDelay</Form.Label>
                            <Form.Control type="text" name="pooToSecretDelay" defaultValue={''} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}
