import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { searchType, providerId, category, textSearch, page = 0, size = 50 } = req.query;
    const session = await getSession(req, res);
    const user = session.user;
    let offerings = [], providers = [], categories = [];

    if (user) {
        if (searchType === 'provider' && providerId) {
            // offerings = await connector.getProviderOfferings(user.access_token, user.id_token, providerId, page, size);
            offerings = await connector.getFederatedProviderActiveOfferings(user.access_token, user.id_token, providerId);
        }

        if (searchType === 'category' && category) {
            // offerings = await connector.getCategoryOfferings(user.access_token, user.id_token, category, page, size);
            offerings = await connector.getFederatedCategoryActiveOfferings(user.access_token, user.id_token, category);
        }

        if (searchType === 'text' && textSearch){
            offerings = await connector.getOfferingsByText(user.access_token, user.id_token, textSearch);
            // TODO pending federated method
        }
        categories = await connector.getCategories(user.access_token, user.id_token);
        providers = await connector.getProviders(user.access_token, user.id_token, page, size);
    }

    return {
        categories: categories,
        providers: providers,
        offerings: offerings
    };
});
