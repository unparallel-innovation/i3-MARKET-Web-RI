import passport from '/lib/passport';
import nc from '../../../middleware/auth';

nc.get(
        passport.authenticate(
            'oidc',
            { session: false}
        )
)

export default nc
