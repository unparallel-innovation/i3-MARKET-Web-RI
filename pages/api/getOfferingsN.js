import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    let totalOfferings = '-';
    if (user) {
        // const offerings = await connector.getOfferings(user.access_token, user.id_token, 0, 50);
        const offerings = await connector.getFederatedActiveOfferings(user.access_token, user.id_token);
        totalOfferings = offerings.length;
    }
    return {
        offeringsN: totalOfferings
    };
});
