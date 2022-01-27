import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const data = req.body;

    switch (req.method) {
        case 'GET':
            return {
                categories: await connector.getCategories(),
            };
        case 'POST':
            // await connector.registerOffering(data);
            return null;
    }
});
