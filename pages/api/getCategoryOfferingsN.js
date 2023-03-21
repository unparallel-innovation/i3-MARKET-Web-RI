import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const { category } = req.query;
    const session = await getSession(req, res);
    const user = session.user;
    let totalOfferings = '-';
    if (user) {
        // const offerings = await connector.getCategoryOfferings(user.access_token, user.id_token, category, page, size);
        const offerings = await connector.getFederatedCategoryActiveOfferings(user.access_token, user.id_token, category);
        totalOfferings = offerings.length;
    }
    return {
        offeringsN: totalOfferings
    };
});
