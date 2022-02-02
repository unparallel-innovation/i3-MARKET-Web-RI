import { catchErrors, connector } from '/lib/server.js';

export default catchErrors(async (req, res) => {
    const data = req.body;

    switch (req.method) {

        case 'POST':
            // call connector
            return null;
    }
});
