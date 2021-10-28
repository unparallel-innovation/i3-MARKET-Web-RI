import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const offerings = await connector.getOfferings(0, 50);
    return {
        offeringsN: offerings.length
    };
});
