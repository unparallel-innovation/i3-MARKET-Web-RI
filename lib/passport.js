import passport from 'passport';
import { Issuer, Strategy as OidcStrategy } from 'openid-client';
import { getOidcIssuer } from './utils';

const issuer = new Issuer(getOidcIssuer());

const oidc_client = JSON.parse(process.env.OIDC_CLIENT);

const client = new issuer.Client({
    client_id: oidc_client.client_id,
    client_secret: oidc_client.client_secret,
    redirect_uris: oidc_client.redirect_uris,
    application_type: 'web',
    grant_types: ['authorization_code'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_jwt',
    id_token_signed_response_alg: 'EdDSA'
});

passport.logout = function () {
    return client.endSessionUrl();
};

passport.use('oidc',
    new OidcStrategy({
        client,
        usePKCE: false,
    }, (tokenSet, done) => {
        return done(null, tokenSet);
    }));

export default passport;
