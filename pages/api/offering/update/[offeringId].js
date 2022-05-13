import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                const categories = await connector.getCategories(user.access_token, user.id_token);

                return {
                    offering,
                    categories,
                    user
                };
        }
    }
    return null;
});
