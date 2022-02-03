import { arrayField, dateField, setObjValue } from '../utils';

export
function formUpdate(fd) {
    let offering = {};
    setObjValue(offering, 'dataOfferingId', fd, 'dataOfferingId');
    setObjValue(offering, 'dataOfferingTitle', fd, 'title');
    setObjValue(offering, 'dataOfferingDescription', fd, 'description');
    setObjValue(offering, 'category', fd, 'category');
    setObjValue(offering, 'provider', fd, 'provider');
    setObjValue(offering, 'owner', fd, 'owner');
    setObjValue(offering, 'marketId', fd, 'marketId');
    setObjValue(offering, 'status', fd, 'status');
    dateField(offering, 'dataOfferingExpirationTime', fd.get('expirationTime'));
    offering.hasPricingModel = getPricingModel(fd);
    offering.hasDataset = getDataset(fd);
    offering.contractParameters = getContractParameters(fd);
    return offering;
}

function getPricingModel(fd) {
    const pricingModelEK = 'pricingModel0';

    let obj = {};
    setObjValue(obj, 'pricingModelId', fd, pricingModelEK + 'pricingModelId');
    setObjValue(obj, 'pricingModelName', fd, pricingModelEK + 'pricingModelName');
    setObjValue(obj, 'basicPrice', fd, pricingModelEK + 'pricingModel0basicPrice');
    setObjValue(obj, 'currency', fd, pricingModelEK + 'pricingModel0currency');
    obj.hasPaymentOnSubscription = getPaymentOnSubscription(fd, pricingModelEK);
    obj.hasPaymentOnApi = getPaymentOnApi(fd, pricingModelEK);
    obj.hasPaymentOnUnit = getPaymentOnUnit(fd, pricingModelEK);
    obj.hasPaymentOnSize = getPaymentOnSize(fd, pricingModelEK);
    obj.hasFreePrice = getFreePrice(fd, pricingModelEK);
    let res = [];
    res.push(obj);
    return res;
}

function getPaymentOnSubscription(fd, pricingModelEK) {
    const paymentSubscriptionEK = pricingModelEK + 'paymentSubscription0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentSubscriptionEK + 'paymentId');
    setObjValue(obj, 'paymentOnSubscriptionName', fd, paymentSubscriptionEK + 'paymentOnSubscriptionName');
    setObjValue(obj, 'paymentType', fd, paymentSubscriptionEK + 'paymentType');
    setObjValue(obj, 'timeDuration', fd, paymentSubscriptionEK + 'timeDuration');
    setObjValue(obj, 'description', fd, paymentSubscriptionEK + 'description');
    setObjValue(obj, 'repeat', fd, paymentSubscriptionEK + 'repeat');
    setObjValue(obj, 'hasSubscriptionPrice', fd, paymentSubscriptionEK + 'hasSubscriptionPrice');
    let res = [];
    res.push(obj);
    return res;
}

function getPaymentOnApi(fd, pricingModelEK) {
    const paymentApiEK = pricingModelEK + 'paymentApi0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentApiEK + 'paymentId');
    setObjValue(obj, 'paymentOnApiName', fd, paymentApiEK + 'paymentOnApiName');
    setObjValue(obj, 'description', fd, paymentApiEK + 'description');
    setObjValue(obj, 'numberOfObject', fd, paymentApiEK + 'numberOfObject');
    setObjValue(obj, 'hasApiPrice', fd, paymentApiEK + 'hasApiPrice');
    let res = [];
    res.push(obj);
    return res;
}

function getPaymentOnUnit(fd, pricingModelEK) {
    const paymentUnitEK = pricingModelEK + 'paymentUnit0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentUnitEK + 'paymentId');
    setObjValue(obj, 'paymentOnUnitName', fd, paymentUnitEK + 'paymentOnUnitName');
    setObjValue(obj, 'description', fd, paymentUnitEK + 'description');
    setObjValue(obj, 'dataUnit', fd, paymentUnitEK + 'dataUnit');
    setObjValue(obj, 'hasUnitPrice', fd, paymentUnitEK + 'hasUnitPrice');
    let res = [];
    res.push(obj);
    return res;
}

function getPaymentOnSize(fd, pricingModelEK) {
    const paymentSizeEK = pricingModelEK + 'paymentSize0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentSizeEK + 'paymentId');
    setObjValue(obj, 'paymentOnSizeName', fd, paymentSizeEK + 'paymentOnSizeName');
    setObjValue(obj, 'description', fd, paymentSizeEK + 'description');
    setObjValue(obj, 'dataSize', fd, paymentSizeEK + 'dataSize');
    setObjValue(obj, 'hasSizePrice', fd, paymentSizeEK + 'hasSizePrice');
    let res = [];
    res.push(obj);
    return res;
}

function getFreePrice(fd, pricingModelEK) {
    const freePriceEK = pricingModelEK + 'freePrice0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, freePriceEK + 'paymentId');
    setObjValue(obj, 'hasPriceFree', fd, freePriceEK + 'hasPriceFree');
    let res = [];
    res.push(obj);
    return res;
}

function getDataset(fd) {
    const datasetEK = 'dataset0';

    let obj = {};
    setObjValue(obj, 'datasetId', fd, datasetEK + 'paymentId');
    setObjValue(obj, 'title', fd, datasetEK + 'title');
    setObjValue(obj, 'description', fd, datasetEK + 'description');
    setObjValue(obj, 'keyword', fd, datasetEK + 'keyword');
    setObjValue(obj, 'dataset', fd, datasetEK + 'dataset');
    setObjValue(obj, 'language', fd, datasetEK + 'language');
    setObjValue(obj, 'temporal', fd, datasetEK + 'temporal');
    setObjValue(obj, 'temporalResolution', fd, datasetEK + 'temporalResolution');
    setObjValue(obj, 'spatial', fd, datasetEK + 'spatial');
    setObjValue(obj, 'accrualPeriodicity', fd, datasetEK + 'accrualPeriodicity');
    arrayField(obj, 'theme', fd.get(datasetEK + 'theme'));
    dateField(obj, 'issued', fd.get(datasetEK + 'issued'));
    dateField(obj, 'modified', fd.get(datasetEK + 'modified'));
    obj.distribution = getDistribution(fd, datasetEK);
    obj.datasetInformation = getDatasetInformation(fd, datasetEK);
    let res = [];
    res.push(obj);
    return res;
}

function getDistribution(fd, datasetEK) {
    const distributionEK = datasetEK + 'distribution0';

    let obj = {};
    setObjValue(obj, 'distributionId', fd, distributionEK + 'distributionId');
    setObjValue(obj, 'title', fd, distributionEK + 'title');
    setObjValue(obj, 'description', fd, distributionEK + 'description');
    setObjValue(obj, 'license', fd, distributionEK + 'license');
    setObjValue(obj, 'accessRights', fd, distributionEK + 'accessRights');
    setObjValue(obj, 'downloadType', fd, distributionEK + 'downloadType');
    setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
    setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
    setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
    obj.accessService = getAccessService(fd, distributionEK);
    let res = [];
    res.push(obj);
    return res;
}

function getAccessService(fd, distributionEK) {
    const accessServiceEK = distributionEK + 'accessService0';

    let obj = {};
    setObjValue(obj, 'dataserviceId', fd, accessServiceEK + 'dataserviceId');
    setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
    setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
    setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
    setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
    setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
    let res = [];
    res.push(obj);
    return res;
}

function getDatasetInformation(fd, datasetEK) {
    const informationEK = datasetEK + 'datasetInformation0';

    let obj = {};
    setObjValue(obj, 'datasetInformationId', fd, informationEK + 'datasetInformationId');
    setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
    setObjValue(obj, 'deviceId', fd, informationEK + 'deviceId');
    setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
    setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
    setObjValue(obj, 'sensorId', fd, informationEK + 'sensorId');
    setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
    let res = [];
    res.push(obj);
    return res;
}

function getContractParameters(fd) {
    const contractParameterEK = 'contractParameter0';

    let obj = {};
    setObjValue(obj, 'contractParametersId', fd, contractParameterEK + 'contractParametersId');
    setObjValue(obj, 'interestOfProvider', fd, contractParameterEK + 'interestOfProvider');
    setObjValue(obj, 'interestDescription', fd, contractParameterEK + 'interestDescription');
    setObjValue(obj, 'hasGoverningJurisdiction', fd, contractParameterEK + 'hasGoverningJurisdiction');
    setObjValue(obj, 'purpose', fd, contractParameterEK + 'purpose');
    setObjValue(obj, 'purposeDescription', fd, contractParameterEK + 'purposeDescription');
    obj.hasIntendedUse = getHasIntendedUse(fd, contractParameterEK);
    obj.hasLicenseGrant = getHasLicenseGrant(fd, contractParameterEK);
    let res = [];
    res.push(obj);
    return res;
}

function getHasIntendedUse(fd, contractParameterEK) {
    const hasIntendedUseEK = contractParameterEK + 'hasIntendedUse0';

    let obj = {};
    setObjValue(obj, 'intendedUseId', fd, hasIntendedUseEK + 'intendedUseId');
    setObjValue(obj, 'processData', fd, hasIntendedUseEK + 'processData');
    setObjValue(obj, 'shareDataWithThirdParty', fd, hasIntendedUseEK + 'shareDataWithThirdParty');
    setObjValue(obj, 'editData', fd, hasIntendedUseEK + 'editData');
    let res = [];
    res.push(obj);
    return res;
}

function getHasLicenseGrant(fd, contractParameterEK) {
    const hasLicenseGrantEK = contractParameterEK + 'hasLicenseGrant0';

    let obj = {};
    setObjValue(obj, 'licenseGrantId', fd, hasLicenseGrantEK + 'licenseGrantId');
    setObjValue(obj, 'copyData', fd, hasLicenseGrantEK + 'copyData');
    setObjValue(obj, 'transferable', fd, hasLicenseGrantEK + 'transferable');
    setObjValue(obj, 'exclusiveness', fd, hasLicenseGrantEK + 'exclusiveness');
    setObjValue(obj, 'revocable', fd, hasLicenseGrantEK + 'revocable');
    let res = [];
    res.push(obj);
    return res;
}
