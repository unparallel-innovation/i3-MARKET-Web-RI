import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { getDateValue } from '../../../lib/utils';
import { formDataPurchaseRequest } from '../../../lib/forms/dataPurchaseRequest';

export default function ContractTemplate(props){
    const router = useRouter();

    const {
        DataOfferingDescription, DataExchangeAgreement, DataStream, Purpose,
        hasDuration, hasIntendedUse, hasLicenseGrant, hasParties, user
    } = props;

    const hasDutiesObligations = props["hasDuties/Obligations"];

    const [dataAvailability, setDataAvailability] = useState(hasDutiesObligations['Duties/Obligations'].dataAvailability);
    const [process, setProcessData] = useState(hasIntendedUse.IntendedUse.processData);
    const [share, setShareData] = useState(hasIntendedUse.IntendedUse.shareDataWithThirdParty);
    const [edit, setEditData] = useState(hasIntendedUse.IntendedUse.editData);
    const [cd, setCopyData] = useState(hasLicenseGrant.LicenseGrant.copyData);
    const [tf, setTransferable] = useState(hasLicenseGrant.LicenseGrant.transferable);
    const [excl, setExclusiveness] = useState(hasLicenseGrant.LicenseGrant.exclusiveness);
    const [rev, setRevocable] = useState(hasLicenseGrant.LicenseGrant.revocable);
    const [ds, setDataStream] = useState(DataStream);

    function onCancel() {
        router.back();
    }

    function onSubmit(e){
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const res = formDataPurchaseRequest(fd);

        fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res),
        }).then(res => {
            router.back()
        });
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit} action={'/api/offerings/purchaseRequest'}>
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
                            <input type="hidden" name="offeringId" defaultValue={DataOfferingDescription.dataOfferingId} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="providerId">
                            <Form.Label>Provider</Form.Label>
                            <Form.Control type="text" name="provider" defaultValue={DataOfferingDescription.provider} disabled />
                            <input type="hidden" name="provider" defaultValue={DataOfferingDescription.provider} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" defaultValue={DataOfferingDescription.category} disabled />
                            <input type="hidden" name="category" defaultValue={DataOfferingDescription.category} />
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
                            <Form.Control type="text" name="dataConsumer" defaultValue={user.username} />
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
                                          defaultValue={getDateValue(hasDuration.Duration.creationDate) }/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate"
                                          defaultValue={getDateValue(hasDuration.Duration.startDate)}  />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate"
                                          defaultValue={getDateValue(hasDuration.Duration.endDate)} />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Duties / Obligations</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="qualityOfData">
                            <Form.Label>Quality Of Data</Form.Label>
                            <Form.Control type="text" name="qualityOfData" defaultValue={hasDutiesObligations['Duties/Obligations'].qualityofData} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="characteristics">
                            <Form.Label>Characteristics</Form.Label>
                            <Form.Control type="text" name="characteristics" defaultValue={hasDutiesObligations['Duties/Obligations'].characteristics} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataAvailability">
                            <Form.Label>Data Availability</Form.Label>
                            <Form.Group controlId={'dataAvailability'}>
                                <Form.Control as="select" value={dataAvailability} name={'dataAvailability'}
                                              onChange={e => { setDataAvailability(e.target.value); }}
                                >
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>
                    </Col>
                </Row>

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
                            <Form.Label>Origin Public Key</Form.Label>
                            <Form.Control type="text" name="orig" defaultValue={DataExchangeAgreement.orig} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dest">
                            <Form.Label>Destination Public Key</Form.Label>
                            <Form.Control type="text" name="dest" defaultValue={DataExchangeAgreement.dest} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="encAlg">
                            <Form.Label>Encryption Algorithm</Form.Label>
                            <Form.Control type="text" name="encAlg" defaultValue={DataExchangeAgreement.encAlg} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="signingAlg">
                            <Form.Label>Signing Algorithm</Form.Label>
                            <Form.Control type="text" name="signingAlg" defaultValue={DataExchangeAgreement.signingAlg} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="hashAlg">
                            <Form.Label>Hash Algorithm</Form.Label>
                            <Form.Control type="text" name="hashAlg" defaultValue={DataExchangeAgreement.hashAlg} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="ledgerContractAddress">
                            <Form.Label>Ledger Contract Address</Form.Label>
                            <Form.Control type="text" name="ledgerContractAddress" defaultValue={DataExchangeAgreement.ledgerContractAddress} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="ledgerSignerAddress">
                            <Form.Label>Origin Address</Form.Label>
                            <Form.Control type="text" name="ledgerSignerAddress" defaultValue={DataExchangeAgreement.ledgerSignerAddress} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="pooToPorDelay">
                            <Form.Label>Maximum delay between PoO and PoR</Form.Label>
                            <Form.Control type="text" name="pooToPorDelay" defaultValue={DataExchangeAgreement.pooToPorDelay} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToPopDelay">
                            <Form.Label>Maximum delay between PoP and PoR</Form.Label>
                            <Form.Control type="text" name="pooToPopDelay" defaultValue={DataExchangeAgreement.pooToPopDelay} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToSecretDelay">
                            <Form.Label>Maximum delay between PoP and Secret</Form.Label>
                            <Form.Control type="text" name="pooToSecretDelay" defaultValue={DataExchangeAgreement.pooToSecretDelay} />
                        </Form.Group>
                    </Col>
                </Row>

                <input type="hidden" value={DataOfferingDescription.isActive} name="isActive" />

            </Form>
        </Layout>
    )
}
