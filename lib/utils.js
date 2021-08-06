export
function ts2date(timestamp, options) {
    if (timestamp) {
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
}

export function qs(obj) {
    return Object.keys(obj)
        .map(key => key + '=' + obj[key])
        .join('&');
}
