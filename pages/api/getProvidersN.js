import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    let totalProviders = '-';
    if (user) {
        // const providers = await connector.getProviders(user.access_token, user.id_token, 0, 50);
        const providers = await connector.getFederatedProviders(user.access_token, user.id_token);
        totalProviders = providers.length;
    }
    return {
        providersN: totalProviders
    };
});
