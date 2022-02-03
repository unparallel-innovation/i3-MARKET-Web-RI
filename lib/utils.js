export function ts2date(timestamp, options) {
    if (timestamp) {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en', options).format(date);
    }
    return 'No information';
}

export function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
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
    if (value) {
        const arr = [];
        arr.push(value);
        obj[okey] = arr;
    }
    else
        obj[okey] = '';
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
    // else {
    //     obj[fieldName] = '';
    // }
}
