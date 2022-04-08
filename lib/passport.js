import passport from 'passport';
import { Issuer, Strategy as OidcStrategy } from 'openid-client';
import issuerConfig from './issuer.json';

const issuer = new Issuer(issuerConfig);

const client = new issuer.Client({
    client_id: 'ITm-ZYwKOWilFn_qoKTU9',
    client_secret: 'FmXVkaUa_dU8HTyHSpkaPVvWtqBboaW_joJ3mkD_P52J6B1F_bOH9GU68tSEwnD0RfRDCwOLNIsagIEMcwcxaw',
    redirect_uris: ['http://localhost:3000/api/credential'],
    application_type: 'web',
    grant_types: ['authorization_code'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_jwt',
    id_token_signed_response_alg: 'EdDSA'
});
passport.use('oidc',
    new OidcStrategy({
        client,
        usePKCE: false,
    }, (tokenSet, done) => {
        return done(null, tokenSet);
    }));

export default passport;
