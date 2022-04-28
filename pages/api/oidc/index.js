import { catchErrors } from '../../../lib/server';
import jsonrepair from 'jsonrepair';

export default catchErrors(async (req, res) => {
    switch (req.method) {
        case 'GET': return { oidc_url: process.env.OIDC_URL };
        case 'POST':
            const oidc_config = req.body;
            const json = jsonrepair(oidc_config);
            process.env.OIDC_CLIENT = json;
    }
});
