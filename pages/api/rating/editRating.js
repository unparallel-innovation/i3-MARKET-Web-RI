import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { id, subRatings, comment } = req.body;
        return await connector.editRating(id,user.access_token, user.id_token, subRatings, comment);
    }
    return null;
});
