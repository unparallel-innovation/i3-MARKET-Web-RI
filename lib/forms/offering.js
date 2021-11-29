import { dateField, setObjValue } from '/lib/utils';

function citer(c, cb) {
    return Array.from(Array(c).keys()).map(cb).filter(item => !!item);
}

export
function formRegister(fd) {
    let offering = {};
    setObjValue(offering, 'dataOfferingTitle', fd, 'title');
    setObjValue(offering, 'dataOfferingDescription', fd, 'description');
    setObjValue(offering, 'category', fd, 'category');
    setObjValue(offering, 'provider', fd, 'isProvidedBy');
    setObjValue(offering, 'owner', fd, 'owner');
    setObjValue(offering, 'dataOfferingLabel', fd, 'label');
    setObjValue(offering, 'dataOfferingExpirationTime', fd, 'expirationTime');
    offering.hasPricingModel = getPricingModel(fd);
    offering.hasDataset = getDataset(fd);

    console.log(JSON.stringify(offering));

    return offering;
}

function getPricingModel(fd) {
    const pricingModelC = parseInt(fd.get('pricingModelC'));

    return citer(pricingModelC, (item, idx) => {
        const pricingModelEK = 'pricingModel' + idx;

        let obj = {};
        setObjValue(obj, 'pricingModelName', fd, pricingModelEK + 'pricingModelName');
        setObjValue(obj, 'basicPrice', fd, pricingModelEK + 'basicPrice');
        setObjValue(obj, 'currency', fd, pricingModelEK + 'currency');
        obj.hasPaymentOnSubscription = getPaymentOnSubscription(fd, pricingModelEK);
        obj.hasPaymentOnPlan = getPaymentOnPlan(fd, pricingModelEK);
        obj.hasPaymentOnAPI = getPaymentOnAPI(fd, pricingModelEK);
        obj.hasPaymentOnUnit = getPaymentOnUnit(fd, pricingModelEK);
        obj.hasPaymentOnSize = getPaymentOnSize(fd, pricingModelEK);
        obj.hasFreePrice = getFreePrice(fd, pricingModelEK);
        return obj;
    });
}

function getPaymentOnSubscription(fd, pricingModelEK) {
    const paymentSubscriptionC = parseInt(fd.get(pricingModelEK + 'paymentSubscriptionC'));

    return citer(paymentSubscriptionC, (item, idx) => {
        const paymentSubscriptionEK = pricingModelEK + 'paymentSubscription' + idx;

        let obj = {};
        setObjValue(obj, 'paymentOnSubscriptionName', fd, paymentSubscriptionEK + 'paymentOnSubscriptionName');
        setObjValue(obj, 'paymentType', fd, paymentSubscriptionEK + 'paymentType');
        setObjValue(obj, 'timeDuration', fd, paymentSubscriptionEK + 'timeDuration');
        setObjValue(obj, 'description', fd, paymentSubscriptionEK + 'description');
        setObjValue(obj, 'repeat', fd, paymentSubscriptionEK + 'repeat');
        setObjValue(obj, 'hasSubscriptionPrice', fd, paymentSubscriptionEK + 'hasSubscriptionPrice');
        dateField(obj, 'fromValue', fd.get(paymentSubscriptionEK + 'from'));
        dateField(obj, 'toValue', fd.get(paymentSubscriptionEK + 'to'));
        return obj;
    });
}

function getPaymentOnPlan(fd, pricingModelEK) {
    const paymentPlanC = parseInt(fd.get(pricingModelEK + 'paymentPlanC'));

    return citer(paymentPlanC, (item, idx) => {
        const paymentPlanEK = pricingModelEK + 'paymentPlan' + idx;

        let obj = {};
        setObjValue(obj, 'paymentOnPlanName', fd, paymentPlanEK + 'paymentOnPlanName');
        setObjValue(obj, 'description', fd, paymentPlanEK + 'description');
        setObjValue(obj, 'planDuration', fd, paymentPlanEK + 'planDuration');
        setObjValue(obj, 'hasPlanPrice', fd, paymentPlanEK + 'hasPlanPrice');
        return obj;
    });
}

function getPaymentOnAPI(fd, pricingModelEK) {
    const paymentApiC = parseInt(fd.get(pricingModelEK + 'paymentApiC'));

    return citer(paymentApiC, (item, idx) => {
        const paymentApiEK = pricingModelEK + 'paymentApi' + idx;

        let obj = {};
        setObjValue(obj, 'paymentOnAPIName', fd, paymentApiEK + 'paymentOnAPIName');
        setObjValue(obj, 'description', fd, paymentApiEK + 'description');
        setObjValue(obj, 'numberOfObject', fd, paymentApiEK + 'numberOfObject');
        setObjValue(obj, 'hasAPIPrice', fd, paymentApiEK + 'hasAPIPrice');
        return obj;
    });
}

function getPaymentOnUnit(fd, pricingModelEK) {
    const paymentUnitC = parseInt(fd.get(pricingModelEK + 'paymentUnitC'));

    return citer(paymentUnitC, (item, idx) => {
        const paymentUnitEK = pricingModelEK + 'paymentUnit' + idx;

        let obj = {};
        setObjValue(obj, 'paymentOnUnitName', fd, paymentUnitEK + 'paymentOnUnitName');
        setObjValue(obj, 'description', fd, paymentUnitEK + 'description');
        setObjValue(obj, 'dataUnit', fd, paymentUnitEK + 'dataUnit');
        setObjValue(obj, 'unitID', fd, paymentUnitEK + 'unitID');
        setObjValue(obj, 'hasUnitPrice', fd, paymentUnitEK + 'hasUnitPrice');
        return obj;
    });
}

function getPaymentOnSize(fd, pricingModelEK) {
    const paymentSizeC = parseInt(fd.get(pricingModelEK + 'paymentSizeC'));

    return citer(paymentSizeC, (item, idx) => {
        const paymentSizeEK = pricingModelEK + 'paymentSize' + idx;

        let obj = {};
        setObjValue(obj, 'paymentOnSizeName', fd, paymentSizeEK + 'paymentOnSizeName');
        setObjValue(obj, 'description', fd, paymentSizeEK + 'description');
        setObjValue(obj, 'dataSize', fd, paymentSizeEK + 'dataSize');
        setObjValue(obj, 'hasSizePrice', fd, paymentSizeEK + 'hasSizePrice');
        return obj;
    });
}

function getFreePrice(fd, pricingModelEK) {
    const freePriceC = parseInt(fd.get(pricingModelEK + 'freePriceC'));

    return citer(freePriceC, (item, idx) => {
        const freePriceEK = pricingModelEK + 'freePrice' + idx;

        let obj = {};
        setObjValue(obj, 'hasPriceFree', fd, freePriceEK + 'hasPriceFree');
        return obj;
    });
}

function getDataset(fd) {
    const datasetC = parseInt(fd.get('datasetC'));

    return citer(datasetC, (item, idx) => {
        const datasetEK = 'dataset' + idx;

        let obj = {};
        setObjValue(obj, 'title', fd, datasetEK + 'title');
        setObjValue(obj, 'description', fd, datasetEK + 'description');
        setObjValue(obj, 'creator', fd, datasetEK + 'creator');
        setObjValue(obj, 'keyword', fd, datasetEK + 'keyword');
        setObjValue(obj, 'dataset', fd, datasetEK + 'dataset'); // not in form ?
        setObjValue(obj, 'language', fd, datasetEK + 'language');
        setObjValue(obj, 'temporal', fd, datasetEK + 'temporal');
        setObjValue(obj, 'temporalResolution', fd, datasetEK + 'temporalResolution');
        setObjValue(obj, 'spatial', fd, datasetEK + 'spatial');
        setObjValue(obj, 'accrualPeriodicity', fd, datasetEK + 'accrualPeriodicity');
        setObjValue(obj, 'theme', fd, 'theme'); // not in form
        dateField(obj, 'issued', fd.get(datasetEK + 'issued'));
        dateField(obj, 'modified', fd.get(datasetEK + 'modified'));
        obj.distribution = getDistribution(fd, datasetEK);
        obj.datasetInformation = getDatasetInformation(fd, datasetEK);
        return obj;
    });
}

function getDistribution(fd, datasetEK) {
    const distributionC = parseInt(fd.get(datasetEK + 'distributionC'));

    return citer(distributionC, (item, idx) => {
        const distributionEK = datasetEK + 'distribution' + idx;

        let obj = {};
        setObjValue(obj, 'title', fd, distributionEK + 'title');
        setObjValue(obj, 'description', fd, distributionEK + 'description');
        setObjValue(obj, 'license', fd, distributionEK + 'license');
        setObjValue(obj, 'conformsTo', fd, distributionEK + 'conformsTo');
        setObjValue(obj, 'mediaType', fd, distributionEK + 'mediaType');
        setObjValue(obj, 'packageFormat', fd, distributionEK + 'packageFormat');
        obj.accessService = getAccessService(fd, distributionEK);
        return obj;
    });
}

function getAccessService(fd, distributionEK) {
    const accessServiceC = parseInt(fd.get(distributionEK + 'accessServiceC'));

    return citer(accessServiceC, (item, idx) => {
        const accessServiceEK = distributionEK + 'accessService' + idx;

        let obj = {};
        setObjValue(obj, 'endpointDescription', fd, accessServiceEK + 'endpointDescription');
        setObjValue(obj, 'endpointURL', fd, accessServiceEK + 'endpointURL');
        setObjValue(obj, 'conformsTo', fd, accessServiceEK + 'conformsTo');
        setObjValue(obj, 'servesDataset', fd, accessServiceEK + 'servesDataset');
        setObjValue(obj, 'serviceSpecs', fd, accessServiceEK + 'serviceSpecs');
        return obj;
    });
}

function getDatasetInformation(fd, datasetEK) {
    const datasetInformationC = parseInt(fd.get(datasetEK + 'informationC'));

    return citer(datasetInformationC, (item, idx) => {
        const informationEK = datasetEK + 'information' + idx;

        let obj = {};
        setObjValue(obj, 'cppType', fd, informationEK + 'cppType');
        setObjValue(obj, 'deviceID', fd, informationEK + 'deviceID');
        setObjValue(obj, 'measurementChannelType', fd, informationEK + 'measurementChannelType');
        setObjValue(obj, 'measurementType', fd, informationEK + 'measurementType');
        setObjValue(obj, 'sensorID', fd, informationEK + 'sensorID');
        setObjValue(obj, 'sensorType', fd, informationEK + 'sensorType');
        return obj;
    });
}

export function fd2qs(fd) {
    const fde = [...fd.entries()];
    return fde
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
}
