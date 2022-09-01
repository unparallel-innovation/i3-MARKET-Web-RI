import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if(user){
        // console.log("[BACKEND] Initialize Notification Service")

        const marketId = process.env.MARKET_NAME;
        const name = `service-${marketId}`;
        const endpoint = 'https://smekw7sgmzbm9t5nd5nojc.hooks.webhookrelay.com';
        // const endpoint = `http://${req.headers.host}/api/notificationWebhook`; TODO replace for this one

        // create new notification service
        // const ns = await connector.createNotificationService(user.access_token, user.id_token, marketId, name, endpoint)
        // if(ns.error){
        //     console.log('[BACKEND]', ns.error)
        //
        //     // create new notification service queue
        //     const nsq = await connector.createNotificationServiceQueue(user.access_token, user.id_token, 'MISSING SERVICE ID', 'agreement.pending');
        //     if(nsq.error)
        //         console.log('[BACKEND]', nsq.error)
        // }

        return {
            categories: await connector.getCategories(user.access_token, user.id_token)
        }
    }
    return null;
});
