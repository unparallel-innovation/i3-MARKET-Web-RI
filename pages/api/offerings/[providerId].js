import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { providerId } = req.query;
    const session = await getSession(req, res)
    const user = session.user
    let offerings = []
    if(user){
        offerings = await connector.getProviderOfferings(user.access_token, user.id_token, providerId, 0, 50);
    }
    return offerings
});
