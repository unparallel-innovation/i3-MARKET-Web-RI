import { arrayField, dateField, setBooleanValue, setIntegerValue, setObjValue } from '/lib/utils';

export
function formRegister(fd, toUpdate) {
    let offering = {};
    if (toUpdate) {
        offering.context = JSON.parse(fd.get('context'));
        setObjValue(offering, 'dataOfferingId', fd, 'dataOfferingId');
        setObjValue(offering, 'status', fd, 'status');
        setObjValue(offering, 'createdAt', fd, 'createdAt');
        setIntegerValue(offering, 'version', fd, 'version');
    }
    else {
        offering.status = 'Inactive';
        offering.active = false; // same as status.Inactive
    }
    setObjValue(offering, 'dataOfferingTitle', fd, 'title');
    setObjValue(offering, 'dataOfferingDescription', fd, 'description');
    setObjValue(offering, 'provider', fd, 'provider');
    setObjValue(offering, 'providerDid', fd, 'providerDid');
    setObjValue(offering, 'owner', fd, 'owner');
    setObjValue(offering, 'ownerDid', fd, 'ownerDid');
    setObjValue(offering, 'marketId', fd, 'market');
    setObjValue(offering, 'marketDid', fd, 'marketDid');
    setObjValue(offering, 'category', fd, 'category');
    setObjValue(offering, 'ownerConsentForm', fd, 'ownerConsentForm');
    setBooleanValue(offering, 'personalData', fd, 'personalData');
    setBooleanValue(offering, 'inSharedNetwork', fd, 'inSharedNetwork');
    dateField(offering, 'dataOfferingExpirationTime', fd.get('expirationTime'));
    offering.contractParameters = getContractParameters(fd);
    offering.hasPricingModel = getPricingModel(fd);
    offering.hasDataset = getDataset(fd, toUpdate);
    return offering;
}

function getPricingModel(fd) {
    const pricingModelEK = 'pricingModel0';

    let obj = {};
    setObjValue(obj, 'pricingModelName', fd, pricingModelEK + 'pricingModelName');
    setIntegerValue(obj, 'basicPrice', fd, pricingModelEK + 'basicPrice');
    setObjValue(obj, 'currency', fd, pricingModelEK + 'currency');
    obj.hasPaymentOnSubscription = getPaymentOnSubscription(fd, pricingModelEK);
    obj.hasPaymentOnApi = getPaymentOnApi(fd, pricingModelEK);
    obj.hasPaymentOnUnit = getPaymentOnUnit(fd, pricingModelEK);
    obj.hasPaymentOnSize = getPaymentOnSize(fd, pricingModelEK);
    obj.hasFreePrice = getFreePrice(fd, pricingModelEK);
    return obj;
}

function getPaymentOnSubscription(fd, pricingModelEK) {
    const paymentSubscriptionEK = pricingModelEK + 'paymentSubscription0';

    let obj = {};
    setObjValue(obj, 'paymentOnSubscriptionName', fd, paymentSubscriptionEK + 'paymentOnSubscriptionName');
    setObjValue(obj, 'paymentType', fd, paymentSubscriptionEK + 'paymentType');
    setObjValue(obj, 'timeDuration', fd, paymentSubscriptionEK + 'timeDuration');
    setObjValue(obj, 'description', fd, paymentSubscriptionEK + 'description');
    setObjValue(obj, 'repeat', fd, paymentSubscriptionEK + 'repeat');
    setIntegerValue(obj, 'hasSubscriptionPrice', fd, paymentSubscriptionEK + 'hasSubscriptionPrice');
    return obj;
}

function getPaymentOnApi(fd, pricingModelEK) {
    const paymentApiEK = pricingModelEK + 'paymentApi0';

    let obj = {};
    setObjValue(obj, 'paymentOnApiName', fd, paymentApiEK + 'paymentOnApiName');
    setObjValue(obj, 'description', fd, paymentApiEK + 'description');
    setIntegerValue(obj, 'numberOfObject', fd, paymentApiEK + 'numberOfObject');
    setIntegerValue(obj, 'hasApiPrice', fd, paymentApiEK + 'hasApiPrice');
    return obj;
}

function getPaymentOnUnit(fd, pricingModelEK) {
    const paymentUnitEK = pricingModelEK + 'paymentUnit0';

    let obj = {};
    setObjValue(obj, 'paymentOnUnitName', fd, paymentUnitEK + 'paymentOnUnitName');
    setObjValue(obj, 'description', fd, paymentUnitEK + 'description');
    setIntegerValue(obj, 'dataUnit', fd, paymentUnitEK + 'dataUnit');
    setIntegerValue(obj, 'hasUnitPrice', fd, paymentUnitEK + 'hasUnitPrice');
    return obj;
}

function getPaymentOnSize(fd, pricingModelEK) {
    const paymentSizeEK = pricingModelEK + 'paymentSize0';

    let obj = {};
    setObjValue(obj, 'paymentOnSizeName', fd, paymentSizeEK + 'paymentOnSizeName');
    setObjValue(obj, 'description', fd, paymentSizeEK + 'description');
    setObjValue(obj, 'dataSize', fd, paymentSizeEK + 'dataSize');
    setIntegerValue(obj, 'hasSizePrice', fd, paymentSizeEK + 'hasSizePrice');
    return obj;
}

function getFreePrice(fd, pricingModelEK) {
    const freePriceEK = pricingModelEK + 'freePrice0';

    let obj = {};
    setBooleanValue(obj, 'hasPriceFree', fd, freePriceEK + 'hasPriceFree');
    return obj;
}

function getDataset(fd, toUpdate) {
    const datasetEK = 'dataset0';

    let obj = {};
    setObjValue(obj, 'title', fd, datasetEK + 'title');
    setObjValue(obj, 'description', fd, datasetEK + 'description');
    setObjValue(obj, 'keyword', fd, datasetEK + 'keyword');
    setObjValue(obj, 'dataset', fd, datasetEK + 'dataset');
    setObjValue(obj, 'language', fd, datasetEK + 'language');
    setObjValue(obj, 'temporal', fd, datasetEK + 'temporal');
    if(!toUpdate)
        setObjValue(obj, 'temporalResolution', fd, datasetEK + 'temporalResolution');
    setObjValue(obj, 'spatial', fd, datasetEK + 'spatial');
    setObjValue(obj, 'accrualPeriodicity', fd, datasetEK + 'accrualPeriodicity');
    arrayField(obj, 'theme', fd.get(datasetEK + 'theme'));
    dateField(obj, 'issued', fd.get(datasetEK + 'issued'));
    dateField(obj, 'modified', fd.get(datasetEK + 'modified'));
    obj.distribution = getDistribution(fd, datasetEK);
    obj.datasetInformation = getDatasetInformation(fd, datasetEK);
    return obj;
}

function getDistribution(fd, datasetEK, i = 0, arr = []) {
    const distributionEK = datasetEK + 'distribution' + i;

    if (!fd.has(distributionEK + 'title'))
        return arr;

    let obj = {};
    setObjValue(obj, 'title', fd, distributionEK + 'title');
    setObjValue(obj, 'description', fd, distributionEK + 'description');
    setObjValue(obj, 'license', fd, distributionEK + 'license');
    setObjValue(obj, 'accessRights', fd, distributionEK + 'accessRights');
    setObjValue(obj, 'downloadType', fd, distributionEK + 'downloadType');
    setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
    setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
    setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
    setBooleanValue(obj, 'dataStream', fd, distributionEK + 'dataStream');
    obj.accessService = getAccessService(fd, distributionEK);
    arr.push(obj);
    i += 1;
    return getDistribution(fd, datasetEK, i, arr);
}

function getAccessService(fd, distributionEK) {
    const accessServiceEK = distributionEK + 'accessService0';

    let obj = {};
    setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
    setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
    setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
    setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
    setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
    return obj;
}

function getDatasetInformation( fd, datasetEK, i = 0, arr = []) {
    const informationEK = datasetEK + 'information' + i;

    if (!fd.has(informationEK + 'cppType'))
        return arr;

    let obj = {};
    setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
    setObjValue(obj, 'deviceId', fd, informationEK + 'deviceId');
    setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
    setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
    setObjValue(obj, 'sensorId', fd, informationEK + 'sensorId');
    setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
    arr.push(obj);
    i += 1;
    return getDatasetInformation(fd, datasetEK, i, arr);
}

function getContractParameters(fd) {
    const contractParameterEK = 'contractParameter0';

    let obj = {};
    setObjValue(obj, 'interestOfProvider', fd, contractParameterEK + 'interestOfProvider');
    setObjValue(obj, 'interestDescription', fd, contractParameterEK + 'interestDescription');
    setObjValue(obj, 'hasGoverningJurisdiction', fd, contractParameterEK + 'hasGoverningJurisdiction');
    setObjValue(obj, 'purpose', fd, contractParameterEK + 'purpose');
    setObjValue(obj, 'purposeDescription', fd, contractParameterEK + 'purposeDescription');
    obj.hasIntendedUse = getHasIntendedUse(fd, contractParameterEK);
    obj.hasLicenseGrant = getHasLicenseGrant(fd, contractParameterEK);
    return obj;
}

function getHasIntendedUse(fd, contractParameterEK) {
    const hasIntendedUseEK = contractParameterEK + 'hasIntendedUse0';

    let obj = {};
    setBooleanValue(obj, 'processData', fd, hasIntendedUseEK + 'processData');
    setBooleanValue(obj, 'shareDataWithThirdParty', fd, hasIntendedUseEK + 'shareDataWithThirdParty');
    setBooleanValue(obj, 'editData', fd, hasIntendedUseEK + 'editData');
    return obj;
}

function getHasLicenseGrant(fd, contractParameterEK) {
    const hasLicenseGrantEK = contractParameterEK + 'hasLicenseGrant0';

    let obj = {};
    setBooleanValue(obj, 'copyData', fd, hasLicenseGrantEK + 'copyData');
    setBooleanValue(obj, 'transferable', fd, hasLicenseGrantEK + 'transferable');
    setBooleanValue(obj, 'exclusiveness', fd, hasLicenseGrantEK + 'exclusiveness');
    setBooleanValue(obj, 'revocable', fd, hasLicenseGrantEK + 'revocable');
    return obj;
}
