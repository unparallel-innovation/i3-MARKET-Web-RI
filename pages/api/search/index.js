import {catchErrors, connector} from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { searchType, providerId, category, page, size } = req.query;
    let offerings = [];

    if (searchType === 'provider' && providerId) {
        offerings = await connector.getProviderOfferings(providerId, page, size);
    }

    if (searchType === 'category' && category) {
        offerings = await connector.getCategoryOfferings(category, page, size);
    }

    const result = {
        categories: await connector.getCategories(),
        providers: await connector.getProviders(),
        offerings: offerings,
    };

    return result;
});
