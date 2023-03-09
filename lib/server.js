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

            let status = 500;
            let message = '';

            const { statusCode, statusDescription, errorMessage } = e.error;

            if (errorMessage) {
                const { error } = errorMessage;

                let errorPath, errorDetail;
                if (typeof error.responseBody === 'object') {
                    errorPath = error.responseBody.path;
                    errorDetail = error.responseBody.message;
                } else {
                    errorDetail = error.responseBody;
                }
                status = statusCode;
                message = statusDescription
                    + (errorDetail ? '. ' + errorDetail : '')
                    + (errorPath ? '. ' + errorPath : '');

                console.log(status, message);
            }
            res
                .status(status)
                .send(message);
        }
    };
}

