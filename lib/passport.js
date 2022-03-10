import passport from 'passport';
import OIDC_Strategy from 'passport-openidconnect';

passport.use(new OIDC_Strategy({
    issuer: "https://identity1.i3-market.eu",
    authorizationURL: 'https://identity1.i3-market.eu/release2/oidc/auth',
    tokenURL: 'https://identity1.i3-market.eu/release2/oidc/token',
    clientID: 'VrEKGm8FtMUgDNdfS_RWf',
    clientSecret: 'QI0iTQ-l1LDUtnw20gYgNjV2bMCgsQh-qbe6DG3UguRJ8I24NGIMOF_fN_vyXQ2eWMvcFNW9BbkcIf_npFbXpg',
    callbackURL: 'http://localhost:3000/credential',
    passReqToCallback: true
},  function(accessToken, refreshToken, profile, cb) {
    console.log('passport', profile)
    return cb(null, profile);
}));

export default passport
