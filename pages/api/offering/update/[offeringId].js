import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    switch (req.method) {
        case 'GET':

            if (offeringId) { // TODO avoid this
                const offering = await connector.getOffering(offeringId);
                const categories = await connector.getCategories();

                return {
                    offering: offering[0],
                    categories
                };
            }
            return {};
    }
});
