import Connector from '@unparallel/connector-ri';

export
const connector = new Connector(process.env.SDK_RI_ENDPOINT, process.env.I3MARKET_USERNAME, process.env.I3MARKET_PASSWORD);

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

            console.log("CATCH!", e.message, statusCode, e.error);

            res
                .status(statusCode)
                .send(e.message || e);
        }
    };
}
