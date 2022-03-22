import passport from '/lib/passport';
import nc from '../../../middleware/auth';

nc.get(
    passport.authenticate(
        'oidc',
        { scope: 'openid vc vc:provider' }
    )
)

export default nc
