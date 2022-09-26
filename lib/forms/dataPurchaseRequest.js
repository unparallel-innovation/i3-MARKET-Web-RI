import { dateField, setBooleanValue, setIntegerValue, setObjValue, timestampField, tsField } from '../utils';

export function formDataPurchaseRequest(fd) {
    let obj = {};
    obj.dataOfferingDescription = getOfferingDescription(fd);
    obj.parties = getParties(fd);
    setObjValue(obj, 'purpose', fd, 'purpose');
    obj.duration = getDuration(fd);
    obj.obligations = getDutiesObligations(fd);
    obj.intendedUse = getIntendedUse(fd);
    obj.licenseGrant = getLicenseGrant(fd);
    setObjValue(obj, 'dataStream', fd, 'dataStream');
    setObjValue(obj, 'personalData', fd, 'personalData');
    obj.pricingModel = getPricingModel(fd);
    obj.dataExchangeAgreement = getDataExchangeAgreement(fd);
    return obj;
}

function getOfferingDescription(fd) {
    let obj = {};
    setObjValue(obj, 'dataOfferingId', fd, 'offeringId');
    setIntegerValue(obj, 'version', fd, 'version');
    setObjValue(obj, 'category', fd, 'category');
    setBooleanValue(obj, 'active', fd, 'active');
    setObjValue(obj, 'title', fd, 'title');
    return obj;
}

function getParties(fd) {
    let obj = {};
    setObjValue(obj, 'providerDid', fd, 'providerDid');
    setObjValue(obj, 'consumerDid', fd, 'consumerDid');
    return obj;
}

function getDuration(fd) {
    let obj = {};
    timestampField(obj, 'creationDate', fd.get('creationDate'));
    timestampField(obj, 'startDate', fd.get('startDate'));
    timestampField(obj, 'endDate', fd.get('endDate'));
    return obj;
}

function getDutiesObligations(fd) {
    let obj = {};
    setIntegerValue(obj, 'qualityOfData', fd, 'qualityOfData');
    setObjValue(obj, 'characteristics', fd, 'characteristics');
    setBooleanValue(obj, 'dataAvailability', fd, 'dataAvailability');
    return obj;
}

function getIntendedUse(fd) {
    let obj = {};
    setBooleanValue(obj, 'processData', fd, 'processData');
    setBooleanValue(obj, 'shareDataWithThirdParty', fd, 'shareDataWithThirdParty');
    setBooleanValue(obj, 'editData', fd, 'editData');
    return obj;
}

function getLicenseGrant(fd) {
    let obj = {};
    setBooleanValue(obj, 'copyData', fd, 'copyData');
    setBooleanValue(obj, 'transferable', fd, 'transferable');
    setBooleanValue(obj, 'exclusiveness', fd, 'exclusiveness');
    setBooleanValue(obj, 'revocable', fd, 'revocable');
    return obj;
}

function getPricingModel(fd){
    let obj = {};
    setObjValue(obj, 'paymentType', fd, 'paymentType');
    setObjValue(obj, 'pricingModelName', fd, 'pricingModelName');
    setIntegerValue(obj, 'basicPrice', fd, 'basicPrice');
    setObjValue(obj, 'currency', fd, 'currency');
    setIntegerValue(obj, 'fee', fd, 'fee');
    obj.hasPaymentOnSubscription = {};
    setObjValue(obj.hasPaymentOnSubscription, 'paymentOnSubscriptionName', fd, 'paymentOnSubscriptionName');
    setObjValue(obj.hasPaymentOnSubscription, 'paymentType', fd, 'paymentOnSubscriptionType');
    setIntegerValue(obj.hasPaymentOnSubscription, 'timeDuration', fd, 'paymentOnSubscriptionTimeDuration');
    setObjValue(obj.hasPaymentOnSubscription, 'description', fd, 'paymentOnSubscriptionDescription');
    setObjValue(obj.hasPaymentOnSubscription, 'repeat', fd, 'paymentOnSubscriptionRepeat');
    setIntegerValue(obj.hasPaymentOnSubscription, 'hasSubscriptionPrice', fd, 'paymentOnSubscriptionPrice');
    obj.hasFreePrice = {};
    setBooleanValue(obj.hasFreePrice, 'hasPriceFree', fd, 'hasFreePrice');
    return obj;
}

function getDataExchangeAgreement(fd) {
    let obj = {};
    setObjValue(obj, 'orig', fd, 'orig');
    setObjValue(obj, 'dest', fd, 'dest');
    setObjValue(obj, 'encAlg', fd, 'encAlg');
    setObjValue(obj, 'signingAlg', fd, 'signingAlg');
    setObjValue(obj, 'hashAlg', fd, 'hashAlg');
    setObjValue(obj, 'ledgerContractAddress', fd, 'ledgerContractAddress');
    setObjValue(obj, 'ledgerSignerAddress', fd, 'ledgerSignerAddress');
    setIntegerValue(obj, 'pooToPorDelay', fd, 'pooToPorDelay');
    setIntegerValue(obj, 'pooToPopDelay', fd, 'pooToPopDelay');
    setIntegerValue(obj, 'pooToSecretDelay', fd, 'pooToSecretDelay');
    return obj;
}
