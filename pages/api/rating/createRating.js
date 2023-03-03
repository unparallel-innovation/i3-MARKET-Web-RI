import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { forProvider, onTransaction, subRatings, comment } = req.body;
        return await connector.createRating(user.access_token, user.id_token,user.DID, forProvider, onTransaction, subRatings, comment);
    }
    return null;
});
