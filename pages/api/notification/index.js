import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    const { notificationId, action } = req.body;

    if (user) {
        switch (req.method) {
            case 'GET':
                const allNotifications = await connector.getUserNotifications(user.access_token, user.id_token, user.DID);
                const unreadNotifications = await connector.getUserUnreadNotifications(user.access_token, user.id_token, user.DID);

                return { allNotifications, unreadNotifications, user };
            case 'PATCH':
                if (action === 'read') {
                    return await connector.markNotificationsAsRead(user.access_token, user.id_token, notificationId);
                }
                return await connector.markNotificationsAsUnread(user.access_token, user.id_token, notificationId);
            case 'DELETE':
                return await connector.deleteNotification(user.access_token, user.id_token, notificationId);
        }
    }
    return null;
});
