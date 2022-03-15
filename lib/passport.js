import passport from 'passport'
import { Issuer, Strategy as OidcStrategy, TokenSet} from 'openid-client';

export default async function (){
    const issuer = await Issuer.discover("https://identity1.i3-market.eu/release2/oidc/")

    const client = new issuer.Client({
        client_id: 'VrEKGm8FtMUgDNdfS_RWf',
        client_secret: 'QI0iTQ-l1LDUtnw20gYgNjV2bMCgsQh-qbe6DG3UguRJ8I24NGIMOF_fN_vyXQ2eWMvcFNW9BbkcIf_npFbXpg',
        redirect_uris: 'http://localhost:3000/credential',
        application_type: 'web',
        grant_types: ['authorization_code'],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_jwt', // One of 'none' (only for PKCE), 'client_secret_basic', 'client_secret_jwt', 'client_secret_post', 'private_key_jwt'
        id_token_signed_response_alg: 'EdDSA' // One o
    })

    passport.use('oidc',
        new OidcStrategy({
            client,
            usePKCE: false
        }, (token, done) => {
            return done(null, token)
        }))

    return passport
}
