import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res)
    const user = session.user

    if(user){
        switch (req.method) {
            case 'GET':
                return await connector.getOffering(user.access_token, user.id_token, offeringId);
            case 'DELETE':
                return await connector.deleteOffering(user.access_token, user.id_token, offeringId);
            default:
                return null;
        }
    }
    return null
});

