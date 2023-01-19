import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { offeringId, consumerPublicKey, searchType } = req.query;
        if (searchType === 'consumer') {
            const contracts = await connector.getAgreementsByConsumer(user.access_token, user.id_token, consumerPublicKey, false);
            return { contracts, user };
        }
        else {
            const contracts = await connector.getAgreementsByOffering(user.access_token, user.id_token, offeringId);
            return { contracts, user };
        }
    }
    return null;
});
