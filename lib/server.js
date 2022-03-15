import Connector from '@unparallel/connector-ri';
import { Issuer, Strategy as OidcStrategy, TokenSet } from 'openid-client';
import passport from 'passport';

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

// export const passportPromise = async () => {
//     const issuer = await Issuer.discover("https://identity1.i3-market.eu/release2/oidc/")
//     console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata)
//
//     const client = new issuer.Client({
//         client_id: 'ITm-ZYwKOWilFn_qoKTU9',
//         client_secret: 'FmXVkaUa_dU8HTyHSpkaPVvWtqBboaW_joJ3mkD_P52J6B1F_bOH9GU68tSEwnD0RfRDCwOLNIsagIEMcwcxaw',
//         redirect_uris: ['http://localhost:3000/api/credential'],
//         application_type: 'web',
//         grant_types: ['authorization_code'],
//         response_types: ['code'],
//         token_endpoint_auth_method: 'client_secret_jwt',
//         id_token_signed_response_alg: 'EdDSA'
//     })
//
//     passport.use('oidc',
//         new OidcStrategy({
//             client,
//             usePKCE: false
//         }, (token,done) => {
//             return done(null, token)
//         }))
//
//     return passport;
// }
