import { dateField, setObjValue } from '../utils';

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
    console.log(offering);
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
    return obj;
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
    return obj;
}

function getPaymentOnApi(fd, pricingModelEK) {
    const paymentApiEK = pricingModelEK + 'paymentApi0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentApiEK + 'paymentId');
    setObjValue(obj, 'paymentOnApiName', fd, paymentApiEK + 'paymentOnApiName');
    setObjValue(obj, 'description', fd, paymentApiEK + 'description');
    setObjValue(obj, 'numberOfObject', fd, paymentApiEK + 'numberOfObject');
    setObjValue(obj, 'hasApiPrice', fd, paymentApiEK + 'hasApiPrice');
    return obj;
}

function getPaymentOnUnit(fd, pricingModelEK) {
    const paymentUnitEK = pricingModelEK + 'paymentUnit0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentUnitEK + 'paymentId');
    setObjValue(obj, 'paymentOnUnitName', fd, paymentUnitEK + 'paymentOnUnitName');
    setObjValue(obj, 'description', fd, paymentUnitEK + 'description');
    setObjValue(obj, 'dataUnit', fd, paymentUnitEK + 'dataUnit');
    setObjValue(obj, 'hasUnitPrice', fd, paymentUnitEK + 'hasUnitPrice');
    return obj;
}

function getPaymentOnSize(fd, pricingModelEK) {
    const paymentSizeEK = pricingModelEK + 'paymentSize0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, paymentSizeEK + 'paymentId');
    setObjValue(obj, 'paymentOnSizeName', fd, paymentSizeEK + 'paymentOnSizeName');
    setObjValue(obj, 'description', fd, paymentSizeEK + 'description');
    setObjValue(obj, 'dataSize', fd, paymentSizeEK + 'dataSize');
    setObjValue(obj, 'hasSizePrice', fd, paymentSizeEK + 'hasSizePrice');
    return obj;
}

function getFreePrice(fd, pricingModelEK) {
    const freePriceEK = pricingModelEK + 'freePrice0';

    let obj = {};
    setObjValue(obj, 'paymentId', fd, freePriceEK + 'paymentId');
    setObjValue(obj, 'hasPriceFree', fd, freePriceEK + 'hasPriceFree');
    return obj;
}
