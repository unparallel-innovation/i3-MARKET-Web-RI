import { catchErrors } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);

    const oidcClient = process.env.OIDC_CLIENT;
    if(!oidcClient)
        await session.destroy();

    return { hasClient: oidcClient !== undefined };
});
