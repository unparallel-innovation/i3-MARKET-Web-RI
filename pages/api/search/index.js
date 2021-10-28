import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { searchType, providerId, category, page, size } = req.query;
    let offerings = [];

    if (searchType === 'provider' && providerId) {
        offerings = await connector.getProviderOfferings(providerId, page, size);
    }

    if (searchType === 'category' && category) {
        offerings = await connector.getCategoryOfferings(category, page, size);
    }

    const categories = await connector.getCategories();
    const providers = await connector.getProviders();

    return {
        categories: categories,
        providers: providers,
        offerings: offerings,
    };
});
