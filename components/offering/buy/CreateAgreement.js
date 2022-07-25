import Layout from '../../layout/Layout';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getDateValue } from '../../../lib/utils';
import { useRouter } from 'next/router';
import Error from '../../layout/Error';
import { walletApi } from '../../../lib/walletApi';

export default function CreateAgreement(props) {
    const router = useRouter();
    const { id, data, user } = props;
    const template = data.template;

    const {
        DataExchangeAgreement, DataOfferingDescription, DataStream, Purpose,
        hasDuration, hasIntendedUse, hasLicenseGrant, hasParties
    } = template;

    const hasDutiesObligations = template['hasDuties/Obligations'];

    if (user.consumer) {
        const error = { message: 'Sorry, you don\'t have permission to access this page!' };
        return <Error error={error}/>;
    }

    function onCancel() {
        router.back();
    }

    async function onSubmit(e) {
        e.preventDefault();
        const api = await walletApi();
        const info = await api.identities.info({ did: user.DID });
        const ethereumAddress = info.addresses[0];

        fetch('/api/offerings/createAgreement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                template,
                senderAddress: ethereumAddress
            }),
        }).then(res => {
            res.json().then(async rawTransaction => {
                const body = {
                    type: 'Transaction',
                    data: rawTransaction
                };
                const signRes = await api.identities.sign({ did: user.DID }, body);

                fetch('/api/offerings/deployTransaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signRes),
                }).then(res => {
                    res.json().then(deployRes => {
                        console.log('transaction deployed', deployRes);

                        fetch('/api/notifications', {
                            method: 'DELETE',
                            body: JSON.stringify({ notificationId: id })
                        }).then(() => {
                            router.back();
                        });
                    });
                });
            });
        });
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">{'Create Data Agreement'}</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>

                <hr className="mt-2 mb-4" />
                <h4 className="mt-4">Static Parameters</h4>
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
                    <Form.Control type="text" name="title" defaultValue={DataOfferingDescription.title} disabled />
                </Form.Group>

                <Form.Group controlId="offeringDescription">
                    <Form.Label>Offering Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="offeringDescription" defaultValue={DataOfferingDescription.description} disabled />
                </Form.Group>

                <h4 className="mt-4">Dynamic Parameters</h4>
                <hr className="mt-2 mb-4" />

                <h5 className="mt-4">Purpose</h5>
                <hr className="mt-2 mb-4" />

                <Form.Group controlId="purpose">
                    <Form.Control type="text" name="purpose" defaultValue={Purpose} disabled />
                </Form.Group>

                <h5 className="mt-4">Parties</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="dataProvider">
                            <Form.Label>Data Provider</Form.Label>
                            <Form.Control type="text" name="dataProvider" defaultValue={hasParties.Parties.dataProvider} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataConsumer">
                            <Form.Label>Data Consumer</Form.Label>
                            <Form.Control type="text" name="dataConsumer" defaultValue={hasParties.Parties.dataConsumer} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Duration</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="creationDate">
                            <Form.Label>Creation Date</Form.Label>
                            <Form.Control type="date" name="creationDate" defaultValue={getDateValue(hasDuration.Duration.creationDate)} disabled />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate" defaultValue={getDateValue(hasDuration.Duration.startDate)} disabled />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate" defaultValue={getDateValue(hasDuration.Duration.endDate)} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Duties / Obligations</h5>

                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="qualityOfData">
                            <Form.Label>Quality Of Data</Form.Label>
                            <Form.Control type="text" name="qualityOfData" defaultValue={hasDutiesObligations['Duties/Obligations'].qualityOfData} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="characteristics">
                            <Form.Label>Characteristics</Form.Label>
                            <Form.Control type="text" name="characteristics" defaultValue={hasDutiesObligations['Duties/Obligations'].characteristics} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataAvailability">
                            <Form.Label>Data Availability</Form.Label>
                            <Form.Control type="text" name="dataAvailability" defaultValue={hasDutiesObligations['Duties/Obligations'].dataAvailability} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Has Intended Use</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId={'processData'}>
                            <Form.Label>Process Data</Form.Label>
                            <Form.Control type="text" name="processData" defaultValue={hasIntendedUse.IntendedUse.processData} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'shareDataWithThirdParty'}>
                            <Form.Label>Share Data With Third Party</Form.Label>
                            <Form.Control type="text" name="shareDataWithThirdParty" defaultValue={hasIntendedUse.IntendedUse.shareDataWithThirdParty} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'editData'}>
                            <Form.Label>Edit Data</Form.Label>
                            <Form.Control type="text" name="editData" defaultValue={hasIntendedUse.IntendedUse.editData} disabled />
                        </Form.Group>
                    </Col>

                </Row>

                <h5 className="mt-4">Has License Grant</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId={'copyData'}>
                            <Form.Label>Copy Data</Form.Label>
                            <Form.Control type="text" name="copyData" defaultValue={hasLicenseGrant.LicenseGrant.copyData} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'transferable'}>
                            <Form.Label>Transferable</Form.Label>
                            <Form.Control type="text" name="transferable" defaultValue={hasLicenseGrant.LicenseGrant.transferable} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId={'exclusiveness'}>
                            <Form.Label>Exclusiveness</Form.Label>
                            <Form.Control type="text" name="exclusiveness" defaultValue={hasLicenseGrant.LicenseGrant.exclusiveness} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'revocable'}>
                            <Form.Label>Revocable</Form.Label>
                            <Form.Control type="text" name="revocable" defaultValue={hasLicenseGrant.LicenseGrant.revocable} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Data Stream</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col className="col-md-6">
                        <Form.Control type="text" name="dataStream" defaultValue={DataStream} disabled />
                    </Col>
                </Row>

                <h5 className="mt-4">Data Exchange Agreement</h5>
                <hr className="mt-2 mb-4" />

                <Row>
                    <Col>
                        <Form.Group controlId="orig">
                            <Form.Label>Origin Public Key</Form.Label>
                            <Form.Control type="text" name="orig" defaultValue={DataExchangeAgreement.orig} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dest">
                            <Form.Label>Destination Public Key</Form.Label>
                            <Form.Control type="text" name="dest" defaultValue={DataExchangeAgreement.dest} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="encAlg">
                            <Form.Label>Encryption Algorithm</Form.Label>
                            <Form.Control type="text" name="encAlg" defaultValue={DataExchangeAgreement.encAlg} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="signingAlg">
                            <Form.Label>Signing Algorithm</Form.Label>
                            <Form.Control type="text" name="signingAlg" defaultValue={DataExchangeAgreement.signingAlg} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="hashAlg">
                            <Form.Label>Hash Algorithm</Form.Label>
                            <Form.Control type="text" name="hashAlg" defaultValue={DataExchangeAgreement.hashAlg} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="ledgerContractAddress">
                            <Form.Label>Ledger Contract Address</Form.Label>
                            <Form.Control type="text" name="ledgerContractAddress" defaultValue={DataExchangeAgreement.ledgerContractAddress} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="ledgerSignerAddress">
                            <Form.Label>Origin Address</Form.Label>
                            <Form.Control type="text" name="ledgerSignerAddress" defaultValue={DataExchangeAgreement.ledgerSignerAddress} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="pooToPorDelay">
                            <Form.Label>Maximum delay between PoO and PoR</Form.Label>
                            <Form.Control type="text" name="pooToPorDelay" defaultValue={DataExchangeAgreement.pooToPorDelay} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToPopDelay">
                            <Form.Label>Maximum delay between PoP and PoR</Form.Label>
                            <Form.Control type="text" name="pooToPopDelay" defaultValue={DataExchangeAgreement.pooToPopDelay} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="pooToSecretDelay">
                            <Form.Label>Maximum delay between PoP and Secret</Form.Label>
                            <Form.Control type="text" name="pooToSecretDelay" defaultValue={DataExchangeAgreement.pooToSecretDelay} disabled />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Layout>
    );
}
