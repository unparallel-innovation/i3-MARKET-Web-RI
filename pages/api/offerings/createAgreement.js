import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const data = req.body;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        // TODO waiting for Fernando's fix
        return await connector.createAgreementRawTransaction(user.access_token, user.id_token, '0xdA51CE83304F0A95580C4F45B37EBdf43BF490C6', data);
    }
    return null;
});
