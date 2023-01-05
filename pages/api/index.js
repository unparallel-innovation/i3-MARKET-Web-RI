import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        return {
            categories: await connector.getCategories(user.access_token, user.id_token)
        };
    }
    return null;
});