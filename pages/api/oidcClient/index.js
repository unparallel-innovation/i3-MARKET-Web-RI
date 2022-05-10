import { catchErrors } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    return { hasClient: process.env.OIDC_CLIENT !== undefined };
});
