import { Connector } from '@unparallel/connector-ri';
import Logger from 'js-logger';

export
const connector = new Connector(process.env.SDK_RI_ENDPOINT, Logger.OFF);

export
function catchErrors(handler) {
    return async (req, res) => {
        try {
            const ret = await handler(req, res);
            res.status(200).send(ret);
        } catch (e) {

            const { statusCode = 500, errorMessage } = e.error;
            const { error } = errorMessage;

            const errorPath = error.responseBody?.path;
            const errorMsg = error.responseBody ? error.responseBody.message : error.message;

            console.log('CATCH!', statusCode, errorMsg, errorPath);

            res
                .status(statusCode)
                .send(errorMsg + (errorPath ? ', requested endpoint: ' + errorPath : ''));
        }
    };
}

