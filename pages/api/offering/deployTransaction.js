import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { signature } = req.body;
        return await connector.deploySignedTransaction(user.access_token, user.id_token, { signedTransaction: signature });
    }
    return null;
});
