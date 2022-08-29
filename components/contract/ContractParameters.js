import { Col, Form, Row } from 'react-bootstrap';
import { getDateValue } from '../../lib/utils';
import { useState } from 'react';
import Error from '../layout/Error';

export default function ContractParameters(props){


    let json = {
        "dataOfferingDescription": {
            "dataOfferingId": "62ecd16897d095001f105493",
            "version": 0,
            "category": "string",
            "active": true
        },
        "dids": {
            "providerDid": "did:ethr:i3m:0x02b6b4e416dae94b00729fe82bdce4a8480e457be2f177a82b5eb6128ece05b35c",
            "consumerDid": "string"
        },
        "purpose": "string",
        "parties": {
            "dataProvider": "provider-test",
            "dataConsumer": "string"
        },
        "duration": {
            "creationDate": 0,
            "startDate": 0,
            "endDate": 0
        },
        "obligations": {
            "qualityOfData": 0,
            "characteristics": "string",
            "dataAvailability": false
        },
        "intendedUse": {
            "processData": true,
            "shareDataWithThirdParty": true,
            "editData": true
        },
        "licenseGrant": {
            "copyData": true,
            "transferable": false,
            "exclusiveness": true,
            "revocable": true
        },
        "dataStream": true,
        "personalData": true,
        "pricingModel": {
            "paymentType": "payment on subscription",
            "pricingModelName": "Test pricing",
            "basicPrice": 60,
            "currency": "$",
            "fee": 24,
            "hasPaymentOnSubscription": {
                "paymentOnSubscriptionName": "paymentOnSubscriptionName",
                "paymentType": "paymentType",
                "timeDuration": "timeDuration",
                "description": "description",
                "repeat": "repeat",
                "hasSubscriptionPrice": 0
            },
            "hasFreePrice": {
                "hasPriceFree": true
            }
        },
        "dataExchangeAgreement": {
            "orig": "string",
            "dest": "string",
            "encAlg": "string",
            "signingAlg": "string",
            "hashAlg": "string",
            "ledgerContractAddress": "string",
            "ledgerSignerAddress": "string",
            "pooToPorDelay": 0,
            "pooToPopDelay": 0,
            "pooToSecretDelay": 0
        }
    }

    const {
        dataOfferingDescription, dids, purpose, parties,
        duration, obligations, intendedUse, licenseGrant, dataStream,
        personalData, pricingModel, dataExchangeAgreement,
        offering, user, disableInput
    } = json



    const [dataAvailability, setDataAvailability] = useState(obligations.dataAvailability);
    const [process, setProcessData] = useState(intendedUse.processData);
    const [share, setShareData] = useState(intendedUse.shareDataWithThirdParty);
    const [edit, setEditData] = useState(intendedUse.editData);
    const [cd, setCopyData] = useState(licenseGrant.copyData);
    const [tf, setTransferable] = useState(licenseGrant.transferable);
    const [excl, setExclusiveness] = useState(licenseGrant.exclusiveness);
    const [rev, setRevocable] = useState(licenseGrant.revocable);
    const [ds, setDataStream] = useState(dataStream);

    // if (user.provider) {
    //     const error = { message: 'Sorry, you don\'t have permission to access this page!' };
    //     return <Error error={error}/>;
    // }


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
                        <Form.Control type="text" name="dataProvider" defaultValue={parties.dataProvider} disabled />
                        <input type="hidden" name="dataProvider" defaultValue={parties.dataProvider} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="dataConsumer">
                        <Form.Label>Consumer</Form.Label>
                        {/*<Form.Control type="text" name="dataConsumer" defaultValue={user.username} disabled />*/}
                        {/*<input type="hidden" name="dataConsumer" defaultValue={user.username} />*/}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="providerDid">
                        <Form.Label>Provider Did</Form.Label>
                        <Form.Control type="text" name="providerDid" defaultValue={dids.providerDid} disabled/>
                        <input type="hidden" name="providerDid" defaultValue={dids.providerDid} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="consumerDid">
                        <Form.Label>Consumer Did</Form.Label>
                        {/*<Form.Control type="text" name="consumerDid" defaultValue={user.DID} disabled />*/}
                        {/*<input type="hidden" name="consumerDid" defaultValue={user.Did} />*/}
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="offeringTitle">
                <Form.Label>Offering Title</Form.Label>
                {/*<Form.Control type="text" name="title" defaultValue={offering.dataOfferingTitle} disabled />*/}
            </Form.Group>

            <Form.Group controlId="offeringDescription">
                <Form.Label>Offering Description</Form.Label>
                {/*<Form.Control as="textarea" rows={3} name="offeringDescription" defaultValue={offering.dataOfferingDescription} disabled />*/}
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
                        <Form.Label>Creation Date</Form.Label>
                        <Form.Control type="date" name="creationDate" defaultValue={getDateValue(duration.creationDate)} required disabled={disableInput}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="startDate" defaultValue={getDateValue(duration.startDate)} required disabled={disableInput}/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
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
                    <Form.Group controlId="orig">
                        <Form.Label>Origin Public Key</Form.Label>
                        <Form.Control type="text" name="orig" defaultValue={dataExchangeAgreement.orig} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="dest">
                        <Form.Label>Destination Public Key</Form.Label>
                        <Form.Control type="text" name="dest" defaultValue={dataExchangeAgreement.dest} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>

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
                        <Form.Label>Origin Address</Form.Label>
                        <Form.Control type="text" name="ledgerSignerAddress" defaultValue={dataExchangeAgreement.ledgerSignerAddress} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="pooToPorDelay">
                        <Form.Label>Maximum delay between PoO and PoR</Form.Label>
                        <Form.Control type="text" name="pooToPorDelay" defaultValue={dataExchangeAgreement.pooToPorDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="pooToPopDelay">
                        <Form.Label>Maximum delay between PoP and PoR</Form.Label>
                        <Form.Control type="text" name="pooToPopDelay" defaultValue={dataExchangeAgreement.pooToPopDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="pooToSecretDelay">
                        <Form.Label>Maximum delay between PoP and Secret</Form.Label>
                        <Form.Control type="text" name="pooToSecretDelay" defaultValue={dataExchangeAgreement.pooToSecretDelay} disabled={disableInput} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

function getPricingModel(data){
    return (
        <>
            <h5 className="mt-4">Pricing</h5>
            <hr className="mt-2 mb-4" />

            {getBasicPrice(data)}

            {getPaymentOnSubscription(data)}

            {getFreePrice(data)}
        </>
    )
}

function getBasicPrice(data){
    const {pricingModelName, basicPrice, fee, currency} = data

    if(basicPrice){
        return (
            <>
                <Form.Group controlId="pricingModelName">
                    <Form.Label>Pricing Model Name</Form.Label>
                    <Form.Control type="text" name="pricingModelName" defaultValue={pricingModelName} disabled />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="basicPrice">
                            <Form.Label>Basic Price</Form.Label>
                            <Form.Control type="text" name="basicPrice" defaultValue={basicPrice} disabled />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="fee">
                            <Form.Label>Fee</Form.Label>
                            <Form.Control type="text" name="fee" defaultValue={fee} disabled />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="currency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control type="text" name="currency" defaultValue={currency} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <hr className="mt-2" />
            </>
        )
    }
    return ''
}

function getPaymentOnSubscription(data){
    const { hasPaymentOnSubscription, currency } = data
    if(hasPaymentOnSubscription){
        const {
            paymentOnSubscriptionName, paymentType, timeDuration,
            description, repeat, hasSubscriptionPrice
        } = data.hasPaymentOnSubscription

        return (
            <>
                <Form.Group controlId="paymentOnSubscriptionName">
                    <Form.Label>Payment On Subscription Name</Form.Label>
                    <Form.Control type="text" name="paymentOnSubscriptionName" defaultValue={paymentOnSubscriptionName} disabled />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionDescription">
                            <Form.Label>Payment On Subscription Name</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionDescription" defaultValue={description} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionType" defaultValue={paymentType} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="hasSubscriptionPrice">
                            <Form.Label>Subscription Price</Form.Label>
                            <Form.Control type="text" name="hasSubscriptionPrice" defaultValue={hasSubscriptionPrice} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionRepeat">
                            <Form.Label>Repeat</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionRepeat" defaultValue={repeat} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="paymentOnSubscriptionTimeDuration">
                            <Form.Label>Time Duration</Form.Label>
                            <Form.Control type="text" name="paymentOnSubscriptionTimeDuration" defaultValue={timeDuration} disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="currency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control type="text" name="currency" defaultValue={currency} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <hr className="mt-2" />
            </>
        )
    }
    return ''
}

function getFreePrice(data){
    if(data.hasFreePrice){
        const { hasPriceFree} = data.hasFreePrice
        return (
            <>
                <Form.Group controlId="hasFreePrice">
                    <Form.Label>Free Price</Form.Label>
                    <Form.Control type="text" name="hasFreePrice" defaultValue={hasPriceFree} disabled />
                </Form.Group>

                <hr className="mt-2" />
            </>
        )
    }
    return ''
}
