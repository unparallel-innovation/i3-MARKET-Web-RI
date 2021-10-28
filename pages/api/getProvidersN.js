import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const offerings = await connector.getProviders();
    return {
        providersN: offerings.length,
    };
});
