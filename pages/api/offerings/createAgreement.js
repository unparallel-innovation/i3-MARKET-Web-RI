import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const data = req.body;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { senderAddress, template } = data
        return await connector.createAgreementRawTransaction(user.access_token, user.id_token, senderAddress, template);
    }
    return null;
});
