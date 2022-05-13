import { getSession } from '../../../lib/session';
import { catchErrors } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    await session.destroy()

    // TODO logout from OIDC

    res.redirect('/auth')
});
