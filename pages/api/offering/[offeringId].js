import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;

    switch (req.method) {
        case 'GET':
            const offering = await connector.getOffering(offeringId);
            return offering.length > 0 ? offering[0] : null;
        case 'DELETE':
            await connector.deleteOffering(offeringId);
            return null;
        default:
            return null;
    }
});

