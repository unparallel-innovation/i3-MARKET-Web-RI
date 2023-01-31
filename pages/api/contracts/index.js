import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';
import agreements from '../../../lib/agreements.json';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { offeringId, consumerPublicKeys, searchType } = req.query;
        if (searchType === 'consumer') {
            return { contracts: agreements, user };

            // TODO change after SDK-RI fix
            const parsedPublicKeys = JSON.parse(consumerPublicKeys);
            const strPublicKeys = `.${parsedPublicKeys.join('.')}`;
            const contracts = await connector.getAgreementsByConsumer(user.access_token, user.id_token, strPublicKeys, false);
            return { contracts, user };
        }
        else {
            const result = await connector.getAgreementsByOffering(user.access_token, user.id_token, offeringId);
            return { contracts: [...result.agreements, ...result.pendingAgreements], user };
        }
    }
    return null;
});
