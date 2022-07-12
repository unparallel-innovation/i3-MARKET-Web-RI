import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';
import jsonrepair from 'jsonrepair';

export default catchErrors(async (req, res) => {
    const data = req.body;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        return await connector.deploySignedTransaction(user.access_token, user.id_token, { signed_transaction: data.signature });
    }
    return null;
});
