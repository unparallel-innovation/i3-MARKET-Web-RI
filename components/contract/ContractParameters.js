import { Col, Form, Row } from 'react-bootstrap';
import { getDateValue } from '../../lib/utils';
import { useState } from 'react';
import CustomLabel from '../common/CustomLabel';

export default function ContractParameters(props) {
    const {
        dataOfferingDescription, parties, purpose, duration,
        obligations, intendedUse, licenseGrant, dataStream,
        personalData, pricingModel, dataExchangeAgreement,
        offering, user, disableInput
    } = props;

    const [dataAvailability, setDataAvailability] = useState(obligations.dataAvailability);
    const [process, setProcessData] = useState(intendedUse.processData);
    const [share, setShareData] = useState(intendedUse.shareDataWithThirdParty);
    const [edit, setEditData] = useState(intendedUse.editData);
    const [cd, setCopyData] = useState(licenseGrant.copyData);
    const [tf, setTransferable] = useState(licenseGrant.transferable);
    const [excl, setExclusiveness] = useState(licenseGrant.exclusiveness);
    const [rev, setRevocable] = useState(licenseGrant.revocable);
    const [ds, setDataStream] = useState(dataStream);

    return (
        <>
            <hr className="mt-2" />
            <h4 className="mt-4">Static Parameters</h4>
            <hr className="mt-2 mb-4" />

            <Row>
                <Col>
                    <Form.Group controlId="offeringId">
                        <Form.Label>Data Offering ID</Form.Label>
                        <Form.Control type="text" name="offeringId" defaultValue={dataOfferingDescription.dataOfferingId} disabled />
                        <input type="hidden" name="offeringId" defaultValue={dataOfferingDescription.dataOfferingId} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="version">
                        <Form.Label>Version</Form.Label>
                        <Form.Control type="text" name="version" defaultValue={dataOfferingDescription.version} disabled />
                        <input type="hidden" name="version" defaultValue={dataOfferingDescription.version} />
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" defaultValue={dataOfferingDescription.category} disabled />
                        <input type="hidden" name="category" defaultValue={dataOfferingDescription.category} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="active">
                        <Form.Label>Active</Form.Label>
                        <Form.Control type="text" name="active" defaultValue={dataOfferingDescription.active} disabled />
                        <input type="hidden" name="active" defaultValue={dataOfferingDescription.active} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="dataProvider">
                        <Form.Label>Provider</Form.Label>
                        <Form.Control type="text" name="dataProvider" defaultValue={offering.provider} disabled />
                        <input type="hidden" name="dataProvider" defaultValue={offering.provider} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="dataConsumer">
                        <Form.Label>Consumer</Form.Label>
                        <Form.Control type="text" name="dataConsumer" defaultValue={user.username} disabled />
                        <input type="hidden" name="dataConsumer" defaultValue={user.username} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="providerDid">
                        <Form.Label>Provider Did</Form.Label>
                        <Form.Control type="text" name="providerDid" defaultValue={parties.providerDid} disabled/>
                        <input type="hidden" name="providerDid" defaultValue={parties.providerDid} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="consumerDid">
                        <Form.Label>Consumer Did</Form.Label>
                        <Form.Control type="text" name="consumerDid" defaultValue={user.DID} disabled />
                        <input type="hidden" name="consumerDid" defaultValue={user.DID} />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="offeringTitle">
                <Form.Label>Offering Title</Form.Label>
                <Form.Control type="text" name="title" defaultValue={offering.dataOfferingTitle} disabled />
                <input type="hidden" name="title" defaultValue={offering.dataOfferingTitle} />
            </Form.Group>

            <Form.Group controlId="offeringDescription">
                <Form.Label>Offering Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="offeringDescription" defaultValue={offering.dataOfferingDescription} disabled />
            </Form.Group>

            <Form.Group controlId="personalData">
                <Form.Label>Personal Data</Form.Label>
                <Form.Control as="select" name="personalData" defaultValue={personalData} disabled >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </Form.Control>
                <input type="hidden" name="personalData" defaultValue={personalData} />
            </Form.Group>

            {getPricingModel(pricingModel)}

            <h4 className="mt-4">Dynamic Parameters</h4>
            <hr className="mt-2 mb-4" />

            <h5 className="mt-4">Purpose</h5>
            <hr className="mt-2 mb-4" />

            <Form.Group controlId="purpose">
                <Form.Control type="text" name="purpose" defaultValue={purpose} disabled={disableInput} />
            </Form.Group>

            <h5 className="mt-4">Duration</h5>

            <hr className="mt-2 mb-4" />

            <Row>
                <Col>
                    <Form.Group controlId="creationDate">
                        <CustomLabel value="Creation Date" required />
                        <Form.Control type="date" name="creationDate" defaultValue={getDateValue(duration.creationDate)} required disabled={disableInput}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="startDate">
                        <CustomLabel value="Start Date" required />
                        <Form.Control type="date" name="startDate" defaultValue={getDateValue(duration.startDate)} required disabled={disableInput}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="endDate">
                        <CustomLabel value="End Date" required />
                        <Form.Control type="date" name="endDate" defaultValue={getDateValue(duration.endDate)} required disabled={disableInput}/>
                    </Form.Group>
                </Col>
            </Row>

            <h5 className="mt-4">Duties / Obligations</h5>

            <hr className="mt-2 mb-4" />

            <Row>
                <Col>
                    <Form.Group controlId="qualityOfData">
                        <Form.Label>Quality Of Data</Form.Label>
                        <Form.Control type="text" name="qualityOfData" defaultValue={obligations.qualityOfData} disabled={disableInput}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="characteristics">
                        <Form.Label>Characteristics</Form.Label>
                        <Form.Control type="text" name="characteristics" defaultValue={obligations.characteristics} disabled={disableInput}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="dataAvailability">
                        <Form.Label>Data Availability</Form.Label>
                        <Form.Group controlId={'dataAvailability'}>
                            <Form.Control as="select" value={dataAvailability} name={'dataAvailability'}
                                onChange={e => { setDataAvailability(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setProcessData(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setShareData(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setEditData(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setCopyData(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setTransferable(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setExclusiveness(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setRevocable(e.target.value); }} disabled={disableInput}
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
                            onChange={e => { setDataStream(e.target.value); }} disabled={disableInput}
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
                    <Form.Group controlId="encAlg">
                        <Form.Label>Encryption Algorithm</Form.Label>
                        <Form.Control type="text" name="encAlg" defaultValue={dataExchangeAgreement.encAlg} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="signingAlg">
                        <Form.Label>Signing Algorithm</Form.Label>
                        <Form.Control type="text" name="signingAlg" defaultValue={dataExchangeAgreement.signingAlg} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="hashAlg">
                        <Form.Label>Hash Algorithm</Form.Label>
                        <Form.Control type="text" name="hashAlg" defaultValue={dataExchangeAgreement.hashAlg} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="ledgerContractAddress">
                        <Form.Label>Ledger Contract Address</Form.Label>
                        <Form.Control type="text" name="ledgerContractAddress" defaultValue={dataExchangeAgreement.ledgerContractAddress} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="ledgerSignerAddress">
                        <Form.Label>Ledger Signer Address</Form.Label>
                        <Form.Control type="text" name="ledgerSignerAddress" defaultValue={dataExchangeAgreement.ledgerSignerAddress} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="pooToPorDelay">
                        <Form.Label>PoO to PoR delay</Form.Label>
                        <Form.Control type="text" name="pooToPorDelay" defaultValue={dataExchangeAgreement.pooToPorDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="pooToPopDelay">
                        <Form.Label>PoP to PoR delay</Form.Label>
                        <Form.Control type="text" name="pooToPopDelay" defaultValue={dataExchangeAgreement.pooToPopDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="pooToSecretDelay">
                        <Form.Label>PoO to Secret delay</Form.Label>
                        <Form.Control type="text" name="pooToSecretDelay" defaultValue={dataExchangeAgreement.pooToSecretDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>

            <input type="hidden" name="orig" defaultValue={dataExchangeAgreement.orig} />
            <input type="hidden" name="dest" defaultValue={dataExchangeAgreement.dest} />
        </>
    );
}

function getPricingModel(data) {
    return (
        <>
            <h5 className="mt-4">Pricing</h5>
            <hr className="mt-2 mb-4" />

            {getBasicPrice(data)}

            {getPaymentOnSubscription(data)}

            {getFreePrice(data)}
        </>
    );
}

function getBasicPrice(data) {
    const { pricingModelName, basicPrice, fee, currency } = data;

    if (basicPrice > 0) {
        return (
            <>
                <Form.Group controlId="pricingModelName">
                    <Form.Label>Pricing Model Name</Form.Label>
                    <Form.Control type="text" name="pricingModelName" defaultValue={pricingModelName} disabled />
                    <input type="hidden" name="pricingModelName" defaultValue={pricingModelName} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="basicPrice">
                            <Form.Label>Basic Price</Form.Label>
                            <Form.Control type="text" name="basicPrice" defaultValue={basicPrice} disabled />
                            <input type="hidden" name="basicPrice" defaultValue={basicPrice} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="fee">
                            <Form.Label>Fee</Form.Label>
                            <Form.Control type="text" name="fee" defaultValue={fee} disabled />
                            <input type="hidden" name="fee" defaultValue={fee} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="currency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control type="text" name="currency" defaultValue={currency} disabled />
                            <input type="hidden" name="currency" defaultValue={currency} />
                        </Form.Group>
                    </Col>
                </Row>

                <hr className="mt-2" />
            </>
        );
    }
    return '';
}

function getPaymentOnSubscription(data) {
    const { hasPaymentOnSubscription, currency } = data;

    const {
        paymentOnSubscriptionName, paymentType, timeDuration,
        description, repeat, hasSubscriptionPrice
    } = hasPaymentOnSubscription;

    if (hasSubscriptionPrice > 0) {

        return (
            <>
                <Form.Group controlId="paymentOnSubscriptionName">
                    <Form.Label>Payment On Subscription Name</Form.Label>
                    <Form.Control type="text" name="paymentOnSubscriptionName" defaultValue={paymentOnSubscriptionName} disabled />
                    <input type="hidden" name="paymentOnSubscriptionName" defaultValue={paymentOnSubscriptionName} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionDescription">
                            <Form.Label>Payment On Subscription Name</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionDescription" defaultValue={description} disabled />
                            <input type="hidden" name="paymentOnSubscriptionDescription" defaultValue={description} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionType" defaultValue={paymentType} disabled />
                            <input type="hidden" name="paymentOnSubscriptionType" defaultValue={paymentType} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionPrice">
                            <Form.Label>Subscription Price</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionPrice" defaultValue={hasSubscriptionPrice} disabled />
                            <input type="hidden" name="paymentOnSubscriptionPrice" defaultValue={hasSubscriptionPrice} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionRepeat">
                            <Form.Label>Repeat</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionRepeat" defaultValue={repeat} disabled />
                            <input type="hidden" name="paymentOnSubscriptionRepeat" defaultValue={repeat} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionTimeDuration">
                            <Form.Label>Time Duration</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionTimeDuration" defaultValue={timeDuration} disabled />
                            <input type="hidden" name="paymentOnSubscriptionTimeDuration" defaultValue={timeDuration} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="currency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control type="text" name="currency" defaultValue={currency} disabled />
                            <input type="hidden" name="currency" defaultValue={currency} />
                        </Form.Group>
                    </Col>
                </Row>

                <hr className="mt-2" />
            </>
        );
    }
    return '';
}

function getFreePrice(data) {
    const { hasPriceFree } = data.hasFreePrice;
    if (hasPriceFree) {
        return (
            <>
                <Form.Group controlId="hasFreePrice">
                    <Form.Label>Free Price</Form.Label>
                    <Form.Control type="text" name="hasFreePrice" defaultValue={hasPriceFree} disabled />
                    <input type="hidden" name="hasFreePrice" defaultValue={hasPriceFree} />
                </Form.Group>

                <hr className="mt-2" />
            </>
        );
    }
    return '';
}
