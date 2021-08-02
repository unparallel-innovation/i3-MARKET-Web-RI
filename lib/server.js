import Connector from '@UNPARALLEL/connector-ri';
// import FetchError from '@UNPARALLEL/connector-ri/error';

// let endpoint = "http://95.211.3.251:9181/SdkRefImpl/api/sdk-ri";
let endpoint = "95.211.3.244:3000";
// let endpoint = "95.211.3.251:3000";
// let endpoint = "95.211.3.250:3000";
// let username = "i3market";
// let password = "sgfjlsn44r50.,fsf03";

export
// const connector = new Connector(endpoint, username, password);
const connector = new Connector(endpoint);

export
function catchErrors(handler) {
    return async (req, res) => {
        try {
            const ret = await handler(req, res);
            res.status(200).send(ret);
        } catch (e) {
            let statusCode = 500;

            if (e.error)
                statusCode = e.error.statusCode;

            // console.log("CATCH!", e.message, statusCode, e.error);

            res
                .status(statusCode)
                .send(e.message || e);
        }
    }
}
