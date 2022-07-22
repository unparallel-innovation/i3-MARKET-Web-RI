import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const parameters = req.body;
        return await connector.getPrice(user.access_token, user.id_token, parameters);
    }
    return null;
});
