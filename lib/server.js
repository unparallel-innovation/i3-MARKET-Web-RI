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

            let statusCode = 500
            let message = e.message;
            let info

            if (e.error)
                statusCode = e.error.statusCode;

            if (e.error)
                message = e.error.message;

            // fetch sdk-ri errors
            const errorResponse = e.error?.response
            if(errorResponse){
                statusCode = errorResponse.status
                message = errorResponse.statusText
                info = errorResponse.data
            }

            console.log('CATCH!', statusCode, message, info);

            res
                .status(statusCode)
                .send(message);
        }
    };
}

