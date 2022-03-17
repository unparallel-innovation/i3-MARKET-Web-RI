import passport from 'passport'
import OIDC_Strategy from 'passport-openidconnect';

passport.use(new OIDC_Strategy({
    issuer: "https://identity1.i3-market.eu",
    authorizationURL: 'https://identity1.i3-market.eu/release2/oidc/auth',
    tokenURL: 'https://identity1.i3-market.eu/release2/oidc/token',
    clientID: 'ITm-ZYwKOWilFn_qoKTU9',
    clientSecret: 'FmXVkaUa_dU8HTyHSpkaPVvWtqBboaW_joJ3mkD_P52J6B1F_bOH9GU68tSEwnD0RfRDCwOLNIsagIEMcwcxaw',
    callbackURL: 'http://localhost:3000/api/credential',
}, function (issuer, profile, cb){
    cb(null, issuer, profile)
}))

export default passport
