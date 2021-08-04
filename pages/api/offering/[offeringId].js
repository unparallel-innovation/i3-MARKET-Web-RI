import { connector, catchErrors } from '/lib/server.js';
// import offering from '/data/offeringById.json'

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query; // api/offerings/ADV01
    let offering = await connector.getOffering(offeringId);
    offering = offering.length ? offering[0] : null;
    return offering;
});

