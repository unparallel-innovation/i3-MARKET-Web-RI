import { Col, Form, Row } from 'react-bootstrap';
import { getAgreementDateValue } from '../../lib/utils';
import { useState } from 'react';
import CustomLabel from '../common/CustomLabel';
import moment from 'moment/moment';

export default function ContractParameters(props) {
    const {
        dataExchangeAgreement, dataOfferingDescription, duration, intendedUse,
        licenseGrant, parties, personalData, pricingModel, purpose, signatures,
        offering, user, disableInput, isAgreement,
        dataOffering, agreementDates, stateValue
    } = props;

    const [process, setProcessData] = useState(intendedUse.processData);
    const [share, setShareData] = useState(intendedUse.shareDataWithThirdParty);
    const [edit, setEditData] = useState(intendedUse.editData);
    const [tf, setTransferable] = useState(licenseGrant.transferable);
    const [excl, setExclusiveness] = useState(licenseGrant.exclusiveness);
    const [paid, setPaidUp] = useState(licenseGrant.paidUp);
    const [rev, setRevocable] = useState(licenseGrant.revocable);
    const [proc, setProcessing] = useState(licenseGrant.processing);
    const [mod, setModifying] = useState(licenseGrant.modifying);
    const [analyze, setAnalyzing] = useState(licenseGrant.analyzing);
    const [storeData, setStoringData] = useState(licenseGrant.storingData);
    const [storeCopy, setStoringCopy] = useState(licenseGrant.storingCopy);
    const [reproduce, setReproducing] = useState(licenseGrant.reproducing);
    const [dist, setDistributing] = useState(licenseGrant.distributing);
    const [loan, setLoaning] = useState(licenseGrant.loaning);
    const [sell, setSelling] = useState(licenseGrant.selling);
    const [rent, setRenting] = useState(licenseGrant.renting);
    const [furtherLicense, setFurtherLicensing] = useState(licenseGrant.furtherLicensing);
    const [lease, setLeasing] = useState(licenseGrant.leasing);

    // process dates
    let creationDate, startDate, endDate;
    if (duration) {
        creationDate = duration.creationDate > 0 ? getAgreementDateValue(duration.creationDate) : getAgreementDateValue(Date.now() / 1000);
        startDate = duration.startDate > 0 ? getAgreementDateValue(duration.startDate) : getAgreementDateValue(Date.now() / 1000);
        if (duration.endDate > 0)
            endDate = getAgreementDateValue(duration.endDate);
        else {
            const newDate = new Date();
            newDate.setMonth(newDate.getMonth() + 6);
            endDate = moment(newDate).format('yyyy-MM-DD');
        }
    }
    else if (agreementDates) {
        creationDate = getAgreementDateValue(agreementDates[0]);
        startDate = getAgreementDateValue(agreementDates[1]);
        endDate = getAgreementDateValue(agreementDates[2]);
    }

    // check if is batch data or data stream
    const dataStream = pricingModel.hasPaymentOnSubscription
        && pricingModel.hasPaymentOnSubscription.hasSubscriptionPrice > 0;

    return (
        <>
            <hr className="mt-2 mb-4" />

            <Row>
                <Col>
                    <Form.Group controlId="offeringId">
                        <Form.Label>Data Offering ID</Form.Label>
                        <Form.Control type="text" name="offeringId" defaultValue={dataOfferingDescription ? dataOfferingDescription.dataOfferingId : dataOffering.dataOfferingId} disabled />
                        <input type="hidden" name="offeringId" defaultValue={dataOfferingDescription ? dataOfferingDescription.dataOfferingId : dataOffering.dataOfferingId} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="version">
                        <Form.Label>Version</Form.Label>
                        <Form.Control type="text" name="version" defaultValue={dataOfferingDescription ? dataOfferingDescription.version : dataOffering.dataOfferingVersion } disabled />
                        <input type="hidden" name="version" defaultValue={dataOfferingDescription ? dataOfferingDescription.version : dataOffering.dataOfferingVersion} />
                    </Form.Group>
                </Col>

                {isAgreement
                    ? <Col>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" defaultValue={stateValue} disabled />
                        </Form.Group>
                    </Col> : null }

            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" defaultValue={offering.category} disabled />
                        <input type="hidden" name="category" defaultValue={offering.category} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="active">
                        <Form.Label>Active</Form.Label>
                        <Form.Control type="text" name="active" defaultValue={offering.active} disabled />
                        <input type="hidden" name="active" defaultValue={offering.active} />
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

            <h5 className="mt-4">Data Stream</h5>
            <hr className="mt-2 mb-4" />

            <Row>
                <Col className="col-md-6">
                    <Form.Group controlId={'dataStream'}>
                        <Form.Control as="select" value={dataStream} name={'dataStream'} disabled>
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

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
                        <CustomLabel value="Creation Date" />
                        <Form.Control type="date" name="creationDate" defaultValue={creationDate} disabled/>
                        <input type="hidden" name="creationDate" defaultValue={creationDate} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="startDate">
                        <CustomLabel value="Start Date" />
                        <Form.Control type="date" name="startDate" defaultValue={startDate} required disabled={disableInput}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="endDate">
                        <CustomLabel value="End Date" />
                        <Form.Control type="date" name="endDate" defaultValue={endDate} required disabled={disableInput}/>
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
                    <Form.Group controlId={'paidUp'}>
                        <CustomLabel value="Paid Up" tooltip="If licence grant to paidUp" />
                        <Form.Control as="select" value={paid} name={'paidUp'}
                            onChange={e => { setPaidUp(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId={'transferable'}>
                        <CustomLabel value="Transferable" tooltip="If license is transferable" />
                        <Form.Control as="select" value={tf} name={'transferable'}
                            onChange={e => { setTransferable(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'exclusiveness'}>
                        <CustomLabel value="Exclusiveness" tooltip="If license grant exclusiveness" />
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
                        <CustomLabel value="Revocable" tooltip="If license is revocable" />
                        <Form.Control as="select" value={rev} name={'revocable'}
                            onChange={e => { setRevocable(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={'processing'}>
                        <CustomLabel value="Processing" tooltip="If license grant data to be processed" />
                        <Form.Control as="select" value={proc} name={'processing'}
                            onChange={e => { setProcessing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'modifying'}>
                        <CustomLabel value="Modifying" tooltip="If license grant data to be modified" />
                        <Form.Control as="select" value={mod} name={'modifying'}
                            onChange={e => { setModifying(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'analyzing'}>
                        <CustomLabel value="Analyzing" tooltip="If license grant data to be analyzed" />
                        <Form.Control as="select" value={analyze} name={'analyzing'}
                            onChange={e => { setAnalyzing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'storingData'}>
                        <CustomLabel value="Storing Data" tooltip="If license grant to store data" />
                        <Form.Control as="select" value={storeData} name={'storingData'}
                            onChange={e => { setStoringData(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={'storingCopy'}>
                        <CustomLabel value="Storing Copy" tooltip="If license grant to store a copy data" />
                        <Form.Control as="select" value={storeCopy} name={'storingCopy'}
                            onChange={e => { setStoringCopy(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'reproducing'}>
                        <CustomLabel value="Reproducing" tooltip="If license grant to reproduce data" />
                        <Form.Control as="select" value={reproduce} name={'reproducing'}
                            onChange={e => { setReproducing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId={'distributing'}>
                        <CustomLabel value="Distributing" tooltip="If license grant to distribute data" />
                        <Form.Control as="select" value={dist} name={'distributing'}
                            onChange={e => { setDistributing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'loaning'}>
                        <CustomLabel value="Loaning" tooltip="If license grant to loan data" />
                        <Form.Control as="select" value={loan} name={'loaning'}
                            onChange={e => { setLoaning(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={'selling'}>
                        <CustomLabel value="Selling" tooltip="If license grant to sell data" />
                        <Form.Control as="select" value={sell} name={'selling'}
                            onChange={e => { setSelling(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'renting'}>
                        <CustomLabel value="Renting" tooltip="If license grant to rent data" />
                        <Form.Control as="select" value={rent} name={'renting'}
                            onChange={e => { setRenting(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'furtherLicensing'}>
                        <CustomLabel value="Further Licensing" tooltip="If license grant for further Licensing" />
                        <Form.Control as="select" value={furtherLicense} name={'furtherLicensing'}
                            onChange={e => { setFurtherLicensing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={'leasing'}>
                        <CustomLabel value="Leasing" tooltip="If license grant to lease data" />
                        <Form.Control as="select" value={lease} name={'leasing'}
                            onChange={e => { setLeasing(e.target.value); }} disabled={disableInput}
                        >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {!isAgreement ? (
                <>
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
                </>
            ) : null }

            {!isAgreement ? (
                <>
                    <input type="hidden" name="providerDid" defaultValue={parties.providerDid} />
                    <input type="hidden" name="consumerDid" defaultValue={user.DID} />
                    <input type="hidden" name="ledgerContractAddress" defaultValue={dataExchangeAgreement.ledgerContractAddress} />
                    <input type="hidden" name="orig" defaultValue={dataExchangeAgreement.orig} />
                    <input type="hidden" name="dest" defaultValue={dataExchangeAgreement.dest} />
                    <input type="hidden" name="dataStream" defaultValue={dataStream} />
                </>
            ) : null}
        </>
    );
}

function getPricingModel(data) {
    return (
        <>
            <h5 className="mt-4">Pricing</h5>
            <hr className="mt-2 mb-4" />

            {getBasicPrice(data)}

            {/*{getPaymentOnSubscription(data)}*/}

            {/*{getFreePrice(data)}*/}
        </>
    );
}

function getBasicPrice(data) {
    const { pricingModelName, basicPrice, fee, currency, price } = data;

    const bPrice = basicPrice ? basicPrice : price;

    if (bPrice > 0) {
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
                            <Form.Control type="text" name="basicPrice" defaultValue={bPrice} disabled />
                            <input type="hidden" name="basicPrice" defaultValue={bPrice} />
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
    const { hasPaymentOnSubscription, paymentOnSubscription, price, currency } = data;

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
