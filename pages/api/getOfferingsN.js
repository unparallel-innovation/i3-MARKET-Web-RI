import { connector, catchErrors } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    return {
        // offeringsN: (await connector.getOfferings()).length,
        offeringsN: 32,
    };
});
