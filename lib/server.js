import Connector from 'connector-ri';

const endpoint = 'http://95.211.3.249:8182/SdkRefImpl/';
const username = 'i3market';
const password = 'sgfjlsn44r50.,fsf03';

export
const connector = new Connector(endpoint, username, password);

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
    };
}
