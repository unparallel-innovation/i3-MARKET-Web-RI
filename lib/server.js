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
            //
            //
            // const responseData = e.error.response.data
            // console.log('CATCH!', responseData.errorMessage)
            //
            //
            //
            // if (e.error.response.data.statusCode)
            //     statusCode = e.error.data.response.statusCode;
            //
            // console.log('error', e.error.response.status)


            // console.log('CATCH!', e.error.response.data)
            // console.log('CATCH Status!', e.error.response.data.statusCode)
            // console.log('CATCH Message!', e.error.response.data.statusDescription)
            //
            // const msg = e.error.response.data.statusDescription


            res
                .status(500)
                .send('error')


            // res
            //     .status(e.error.response.status || 500)
            //     .send(e.error.message);

            // console.log('Status', e.error.statusCode)
            // console.log('ERROR response', e.error.response.data)
            // console.log('ERROR status', e.error.response.status)
            // console.log('ERROR', e.error.message)

            // console.log('ERROR OBJ', e.error)


            // console.log('ERROR', e)
            //
            //
            // let statusCode = 500;
            //
            // if (e.error)
            //     statusCode = e.error.statusCode;
            //
            //
            //
            // console.log('CATCH!', e.message, statusCode, e.error);
            //
            //
            // res
            //     .status(401)
            //     .send(e.error.message);
        }
    };
}

