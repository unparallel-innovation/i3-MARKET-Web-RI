import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { agreementId } = req.query;
        return await connector.getAgreement(user.access_token, user.id_token, agreementId);
    }
    return null;
});
