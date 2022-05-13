import { getSession } from '../../../lib/session';
import { catchErrors } from '../../../lib/server';
import passport from '../../../lib/passport';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);

    // delete user session
    await session.destroy();

    // logout from oidc
    res.redirect(passport.logout());
    // TODO redirect to auth
});
