import passport from 'passport';
import { Issuer, Strategy as OidcStrategy } from 'openid-client';
import issuerConfig from './issuer.json';

const issuer = new Issuer(issuerConfig);

const client = new issuer.Client({
    client_id: 'jpEr3IPOoR8_XcSjy8fa8',
    client_secret: 'bJBfdsUt4VLTS_7dgQIlCNhVxnIbnrszcLQlgwmW4Jx_By_a9bGxX-w1gOH7wfWcTCoptel3bSWDHb6IoMelCA',
    redirect_uris: ['http://localhost:5300/api/credential'],
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
