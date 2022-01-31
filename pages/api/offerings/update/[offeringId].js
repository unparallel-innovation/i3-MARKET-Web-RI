import { catchErrors, connector } from '../../../../lib/server';

export default catchErrors(async (req, res) => {
    const data = req.body;

    console.log('cenas', data)

    switch (req.method) {
        case 'GET':
            return {
                categories: await connector.getCategories(),
            };
    }
});
