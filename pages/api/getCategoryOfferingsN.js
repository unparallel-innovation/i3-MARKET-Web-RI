import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { category } = req.query;
    const offerings = await connector.getCategoryOfferings(category);
    return {
        offeringsN: offerings.length
    };
});
