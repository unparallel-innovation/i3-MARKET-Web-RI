import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const { id } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                const notification = await connector.getNotification(user.access_token, user.id_token, id);
                return { ...notification, user };
            default:
                return null;
        }
    }
    return null;
});
