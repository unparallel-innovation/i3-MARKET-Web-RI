import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { notificationId, offeringId, consumerDid, notes } = req.body;

        const message = {
            msg: `Data purchase request for offering ${offeringId} rejected`,
            notes: notes
        };
        // delete notification associated to data purchase request
        await connector.deleteNotification(user.access_token, user.id_token, notificationId);
        // create notification for consumer with reject response
        await connector.createNotification(user.access_token, user.id_token, 'Web-RI', consumerDid, 'agreement.rejected', message,'OK' );
    }
    return null;
});
