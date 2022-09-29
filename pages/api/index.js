import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        console.log('[BACKEND] Initialize Notification Service');

        const marketId = process.env.MARKET_NAME;
        const name = `service-${marketId}`;
        const endpoint = process.env.NODE_ENV === 'development' ? 'https://smekw7sgmzbm9t5nd5nojc.hooks.webhookrelay.com' : `https://${req.headers.host}/api/notificationWebhook`;

        // create notification service (if not exists)
        const ns = await connector.createNotificationService(user.access_token, user.id_token, marketId, name, endpoint);

        // create notification service queue (if not exists)
        await connector.createNotificationServiceQueue(user.access_token, user.id_token, ns.id, 'agreement.pending');

        return {
            categories: await connector.getCategories(user.access_token, user.id_token)
        };
    }
    return null;
});
