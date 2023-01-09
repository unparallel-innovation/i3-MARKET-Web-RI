import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        console.log('create agreement raw transaction backend');

        const { senderAddress, template } = req.body;
        const res = await connector.createAgreementRawTransaction(user.access_token, user.id_token, senderAddress, template);
        console.log(res);

        return {};
    }
    return null;
});
