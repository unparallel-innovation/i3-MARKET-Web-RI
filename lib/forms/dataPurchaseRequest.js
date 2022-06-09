import { setBooleanValue, setIntegerValue, setObjValue } from '../utils';

export function formDataPurchaseRequest(fd){
    let obj = {}
    obj.DataOfferingDescription = getOfferingDescription(fd);
    setObjValue(obj, 'Purpose', fd, 'purpose');
    obj.hasParties = getParties(fd);
    obj.hasDuration = getDuration(fd);
    obj['hasDuties/Obligations'] = getDutiesObligations(fd);
    obj.hasIntendedUse = getIntendedUse(fd);
    obj.hasLicenseGrant = getLicenseGrant(fd);
    obj.DataExchangeAgreement = getDataExchangeAgreement(fd);
    setBooleanValue(obj, 'DataStream', fd, 'dataStream');
    return obj;
}

function getOfferingDescription(fd){
    let obj = {}
    setObjValue(obj, "dataOfferingId", fd, 'offeringId');
    setObjValue(obj, "provider", fd, 'provider');
    setObjValue(obj, "description", fd, 'offeringDescription');
    setObjValue(obj, "title", fd, 'title');
    setObjValue(obj, "category", fd, 'category');
    setBooleanValue(obj, "isActive", fd, 'isActive');
    return obj;
}

function getParties(fd){
    let obj = {}
    let parties = {}
    setObjValue(parties, "dataProvider", fd, 'dataProvider');
    setObjValue(parties, "dataConsumer", fd, 'dataConsumer');
    obj.Parties = parties;
    return obj;
}

function getDuration(fd){
    let obj = {}
    let duration = {}
    setIntegerValue(duration, "creationDate", fd, 'creationDate');
    setIntegerValue(duration, "startDate", fd, 'startDate');
    setIntegerValue(duration, "endDate", fd, 'endDate');
    obj.Duration = duration;
    return obj;
}

function getDutiesObligations(fd){
    return {
        'Duties/Obligations': {
            'qualityofData': fd.get('qualityOfData'),
            'characteristics': fd.get('characteristics'),
            'dataAvailability': JSON.parse(fd.get('dataAvailability'))
        }
    }
}

function getIntendedUse(fd){
    let obj = {}
    let intendedUse = {}
    setBooleanValue(intendedUse, 'processData', fd, 'processData');
    setBooleanValue(intendedUse, 'shareDataWithThirdParty', fd, 'shareDataWithThirdParty');
    setBooleanValue(intendedUse, 'editData', fd, 'editData');
    obj.IntendedUse = intendedUse;
    return obj;
}

function getLicenseGrant(fd){
    let obj = {}
    let licenseGrant = {}
    setBooleanValue(licenseGrant, 'copyData', fd, 'copyData');
    setBooleanValue(licenseGrant, 'transferable', fd, 'transferable');
    setBooleanValue(licenseGrant, 'exclusiveness', fd, 'exclusiveness');
    setBooleanValue(licenseGrant, 'revocable', fd, 'revocable');
    obj.LicenseGrant = licenseGrant;
    return obj;
}

function getDataExchangeAgreement(fd){
    let obj = {}
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
