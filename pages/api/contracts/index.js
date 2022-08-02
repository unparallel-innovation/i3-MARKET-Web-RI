import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if(user){
        const {id, searchType} = req.query;
        if(searchType === 'consumer')
            return await connector.getAgreementsByConsumer(user.access_token, user.id_token, 'consumer18', false); // TODO replace for user.DID
        return await connector.getAgreementsByOffering(user.access_token, user.id_token, '627cebbbd348c942dab514e3'); // TODO replace for offeringId (id)
    }
    return null;
})
