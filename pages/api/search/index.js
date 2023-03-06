import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { searchType, providerId, category, textSearch, localNodeSearch = false, page = 0, size = 50 } = req.query;
    const session = await getSession(req, res);
    const user = session.user;
    let offerings = [], providers = [], categories = [];

    if (user) {
        const localSearch = JSON.parse(localNodeSearch);

        if (searchType === 'provider' && providerId) {
            offerings = localSearch
                ? await connector.getProviderOfferings(user.access_token, user.id_token, providerId, page, size)
                : await connector.getFederatedProviderActiveOfferings(user.access_token, user.id_token, providerId, page, size);
        }

        if (searchType === 'category' && category) {
            offerings = localSearch
                ? await connector.getCategoryOfferings(user.access_token, user.id_token, category, page, size)
                : await connector.getFederatedCategoryActiveOfferings(user.access_token, user.id_token, category, page, size);
        }

        if (searchType === 'text' && textSearch) {
            offerings = localSearch
                ? await connector.getOfferingsByText(user.access_token, user.id_token, textSearch)
                : await connector.getFederatedTextActiveOfferings(user.access_token, user.id_token, textSearch, page, size);
        }
        categories = await connector.getCategories(user.access_token, user.id_token);
        // providers = await connector.getProviders(user.access_token, user.id_token, page, size);
        providers = await connector.getFederatedProviders(user.access_token, user.id_token, page, size);
    }

    return {
        categories: categories,
        providers: providers,
        offerings: offerings
    };
});
