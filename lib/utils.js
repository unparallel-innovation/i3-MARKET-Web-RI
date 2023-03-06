import issuer from './issuer.json';
import { App, FileEarmarkX, Globe, Lock, Trash } from 'react-bootstrap-icons';
import colors from './colors';
import moment from 'moment';

export function citer(c, cb) {
    return Array.from(Array(c).keys()).map(cb).filter(item => !!item);
}

export function ts2date(timestamp, options) {
    if (timestamp && timestamp !== 'required' && timestamp !== 'string') {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en', options).format(date);
    }
}

export function secondsToDate(seconds, options) {
    const date = new Date(seconds * 1000);
    return new Intl.DateTimeFormat('en', options).format(date);
}

export function ISOtoDate(string, format) {
    const date = new Date(string.replaceAll('/', '-'));
    return moment(date).format(format);
}

function dateStrToISO(str) {
    return (new Date(str)).toISOString();
}

export function blockTimestampField(obj, okey, value) {
    if (value)
        obj[okey] = new Date(value).getTime() / 1000;
    else
        obj[okey] = 0;
}

export function dateField(obj, okey, value) {
    if (value)
        obj[okey] = dateStrToISO(value);
    else
        obj[okey] = '';
}

export function arrayField(obj, okey, value) {
    let arr = [];
    if (value) {
        arr.push(value);
        obj[okey] = arr;
    }
    else
        obj[okey] = arr;
}

export function qs(obj) {
    return Object.keys(obj)
        .map(key => key + '=' + obj[key])
        .join('&');
}

export function setObjValue(obj, fieldName, formData, key) {
    const value = formData.get(key);
    if (value) {
        obj[fieldName] = value;
    }
    else {
        obj[fieldName] = '';
    }
}

export function setBooleanValue(obj, fieldName, formData, key) {
    const value = formData.get(key);
    if (value) {
        obj[fieldName] = JSON.parse(value);
    }
    else {
        obj[fieldName] = false;
    }
}

export function setIntegerValue(obj, fieldName, formData, key) {
    const value = formData.get(key);
    if (value) {
        obj[fieldName] = parseInt(value);
    }
    else {
        obj[fieldName] = 0;
    }
}

export function setFloatValue(obj, fieldName, formData, key) {
    const value = formData.get(key);
    if (value) {
        obj[fieldName] = parseFloat(value);
    }
    else {
        obj[fieldName] = 0;
    }
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAgreementDateValue(date) {
    if (date && date > 0) {
        return moment(date * 1000).format('yyyy-MM-DD');
    }
    return '';
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function getOidcIssuer() {
    const oidc_url = process.env.OIDC_URL;
    issuer['authorization_endpoint'] = `${oidc_url}/oidc/auth`;
    issuer['end_session_endpoint'] = `${oidc_url}/oidc/session/end`;
    issuer['issuer'] = oidc_url.substring(0, oidc_url.indexOf('/release2'));
    issuer['jwks_uri'] = `${oidc_url}/oidc/jwks`;
    issuer['registration_endpoint'] = `${oidc_url}/oidc/reg`;
    issuer['token_endpoint'] = `${oidc_url}/oidc/token`;
    issuer['introspection_endpoint'] = `${oidc_url}/oidc/token/introspection`;
    issuer['revocation_endpoint'] = `${oidc_url}/oidc/token/revocation`;
    return issuer;
}

export function getOfferingStatusIcon(status) {
    switch (status) {
        case 'Inactive':
            return <Lock color={colors.primary} size={24} />;
        case 'Active':
            return <Globe color={colors.primary} size={24} />;
        case 'ToBeDeleted':
            return <FileEarmarkX color={colors.primary} size={24} />;
        case 'Deleted':
            return <Trash color={colors.primary} size={24} />;
        default:
            return <App color={colors.primary} size={24} />;
    }
}

export function getAverage(values) {
    if (!values || values.length == 0) {
        return 0;
    }
    else {
        let avg = 0;
        for (const v of values) {
            avg += v;
        }
        //return (values.length > 0) ? avg / values.length : 0;
        let retVal = avg / values.length;
        retVal = Math.floor(retVal * 2 + 0.5);
        return retVal / 2;
    }
}