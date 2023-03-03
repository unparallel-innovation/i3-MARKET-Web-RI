import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { id, response } = req.body;
        return await connector.respondToRating(id, user.access_token, user.id_token, response);
    }
    return null;
});
