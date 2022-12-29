import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                return {
                    offering: await connector.getOffering(user.access_token, user.id_token, offeringId),
                    // offering: await connector.getFederatedOffering(user.access_token, user.id_token, offeringId), TODO replace when endpoint is fixed
                    user
                };
            case 'PATCH':
                const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                offering.status = 'Active';
                offering.active = true;
                delete offering.createdAt;
                return await connector.updateOffering(user.access_token, user.id_token, offering);
            default:
                return null;
        }
    }
    return null;
});

