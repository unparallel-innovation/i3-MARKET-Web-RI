import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const data = req.body;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        return await connector.createDataPurchase(user.access_token, user.id_token, 'web-ri', user.usernameDID, '', data);
    }
    return null;
});
