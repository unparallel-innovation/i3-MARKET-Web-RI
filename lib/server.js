import { Connector } from '@unparallel/connector-ri';

export
const connector = new Connector(process.env.SDK_RI_ENDPOINT);

export
function catchErrors(handler) {
    return async (req, res) => {
        try {
            const ret = await handler(req, res);
            res.status(200).send(ret);
        } catch (e) {
            let statusCode = 500;
            if(e.error)
                statusCode = e.error.statusCode

            let message = e.message
            if(e.error)
                message = e.error.message

            console.log('CATCH!', statusCode, message);

            res
                .status(statusCode)
                .send(message)
        }
    };
}

