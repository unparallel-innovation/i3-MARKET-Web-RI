import { blockTimestampField, setBooleanValue, setFloatValue, setIntegerValue, setObjValue } from '../utils';

export function formDataPurchaseRequest(fd) {
    let obj = {};
    obj.dataOfferingDescription = getOfferingDescription(fd);
    obj.parties = getParties(fd);
    setObjValue(obj, 'purpose', fd, 'purpose');
    obj.duration = getDuration(fd);
    obj.intendedUse = getIntendedUse(fd);
    obj.licenseGrant = getLicenseGrant(fd);
    setBooleanValue(obj, 'dataStream', fd, 'dataStream');
    setBooleanValue(obj, 'personalData', fd, 'personalData');
    obj.pricingModel = getPricingModel(fd);
    obj.dataExchangeAgreement = getDataExchangeAgreement(fd);
    obj.signatures = getSignatures(fd);
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
    blockTimestampField(obj, 'creationDate', fd.get('creationDate'));
    blockTimestampField(obj, 'startDate', fd.get('startDate'));
    blockTimestampField(obj, 'endDate', fd.get('endDate'));
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
    setBooleanValue(obj, 'transferable', fd, 'transferable');
    setBooleanValue(obj, 'exclusiveness', fd, 'exclusiveness');
    setBooleanValue(obj, 'paidUp', fd, 'paidUp');
    setBooleanValue(obj, 'revocable', fd, 'revocable');
    setBooleanValue(obj, 'processing', fd, 'processing');
    setBooleanValue(obj, 'modifying', fd, 'modifying');
    setBooleanValue(obj, 'analyzing', fd, 'analyzing');
    setBooleanValue(obj, 'storingData', fd, 'storingData');
    setBooleanValue(obj, 'storingCopy', fd, 'storingCopy');
    setBooleanValue(obj, 'reproducing', fd, 'reproducing');
    setBooleanValue(obj, 'distributing', fd, 'distributing');
    setBooleanValue(obj, 'loaning', fd, 'loaning');
    setBooleanValue(obj, 'selling', fd, 'selling');
    setBooleanValue(obj, 'renting', fd, 'renting');
    setBooleanValue(obj, 'furtherLicensing', fd, 'furtherLicensing');
    setBooleanValue(obj, 'leasing', fd, 'leasing');
    return obj;
}

function getPricingModel(fd) {
    let obj = {};
    setObjValue(obj, 'paymentType', fd, 'paymentType');
    setObjValue(obj, 'pricingModelName', fd, 'pricingModelName');
    setFloatValue(obj, 'basicPrice', fd, 'basicPrice');
    setObjValue(obj, 'currency', fd, 'currency');
    setFloatValue(obj, 'fee', fd, 'fee');
    obj.hasPaymentOnSubscription = {};
    setObjValue(obj.hasPaymentOnSubscription, 'paymentOnSubscriptionName', fd, 'paymentOnSubscriptionName');
    setObjValue(obj.hasPaymentOnSubscription, 'paymentType', fd, 'paymentOnSubscriptionType');
    setObjValue(obj.hasPaymentOnSubscription, 'timeDuration', fd, 'paymentOnSubscriptionTimeDuration');
    setObjValue(obj.hasPaymentOnSubscription, 'description', fd, 'paymentOnSubscriptionDescription');
    setObjValue(obj.hasPaymentOnSubscription, 'repeat', fd, 'paymentOnSubscriptionRepeat');
    setFloatValue(obj.hasPaymentOnSubscription, 'hasSubscriptionPrice', fd, 'paymentOnSubscriptionPrice');
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

function getSignatures(fd) {
    let obj = {};
    setObjValue(obj, 'providerSignature', fd, 'providerSignature');
    setObjValue(obj, 'consumerSignature', fd, 'consumerSignature');
    return obj;
}
