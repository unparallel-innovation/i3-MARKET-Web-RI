import issuer from './issuer.json';
import { App, FileEarmarkX, Globe, Lock, Trash } from 'react-bootstrap-icons';
import colors from './colors';
import moment from 'moment';

export function fd2qs(fd) {
    const fde = [...fd.entries()];
    return fde
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
}

export function ts2date(timestamp, options) {
    if (timestamp && timestamp !== 'string') {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en', options).format(date);
    }
    return 'No information';
}

function dateStrToISO(str) {
    return (new Date(str)).toISOString();
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

// https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
export function clone(o) {
    let out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        out[key] = (typeof v === 'object' && v !== null) ? clone(v) : v;
    }
    return out;
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
    obj[fieldName] = JSON.parse(value);
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

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDateValue(date) {
    if (date && date > 0) {
        return moment(date).format('yyyy-MM-DD');
    }
    return '';
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
