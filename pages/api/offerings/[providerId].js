import {catchErrors, connector} from '/lib/server.js';
// import offerings from '/data/offeringsByCategory.json'

export default catchErrors(async (req, res) => {
    const { providerId } = req.query; // api/offerings/ADV01
    // throw new Error("Gateway Timeout");
    const offerings = await connector.getProviderOfferings(providerId);
    return offerings;
});
