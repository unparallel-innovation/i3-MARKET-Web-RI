import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { providerId } = req.query;
    return await connector.getProviderOfferings(providerId, 0, 50);
});
