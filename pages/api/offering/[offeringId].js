import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query; // api/offerings/ADV01

    switch (req.method) {
        case 'GET':
            let offering = await connector.getOffering(offeringId);
            offering = offering.length ? offering[0] : null;
            return offering;
        case 'DELETE':
            await connector.deleteOffering(offeringId);
            return null;
        default:
            return null;
    }
});

