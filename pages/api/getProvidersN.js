import { connector, catchErrors } from '/lib/server.js'

export default catchErrors(async (req, res) => {
    return {
        // providersN: (await connector.getProviders()).length,
        providersN: 8,
    };
});
