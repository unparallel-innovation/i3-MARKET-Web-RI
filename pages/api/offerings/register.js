import { connector, catchErrors } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const data = req.body;

    switch (req.method) {
        case 'GET':
            return {
                categories: await connector.getCategories(),
            };
            break;
        case 'POST':
            await connector.registerOffering(data);
            // console.log(JSON.stringify(data));
            return null;
    }
});
