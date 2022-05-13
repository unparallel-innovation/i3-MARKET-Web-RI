import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const data = req.body;

    switch (req.method) {

        case 'PATCH':
            // call connector
            console.log('update', data);
            return null;
    }
});
