import { catchErrors, connector } from '/lib/server.js';
import passportPromise from '../../../lib/passport';

export default catchErrors(async (req, res) => {
    const passport = await passportPromise()
    return passport.authenticate('oidc', { scope: 'openid vc vce:consumer' })
});
