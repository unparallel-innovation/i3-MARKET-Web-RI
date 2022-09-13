import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { id, searchType } = req.query;
        let contracts;
        if (searchType === 'consumer')
            contracts = await connector.getAgreementsByConsumer(user.access_token, user.id_token, 'consumer18', false); // TODO replace for user.DID
        else
            contracts = await connector.getAgreementsByOffering(user.access_token, user.id_token, '627cebbbd348c942dab514e3'); // TODO replace for offeringId (id)

        return { contracts, user };
    }
    return null;
});
