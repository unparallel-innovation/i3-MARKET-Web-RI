import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    let info, notificationId, action;

    if (user) {
        switch (req.method) {
            case 'GET':
                const allNotifications = await connector.getUserNotifications(user.access_token, user.id_token, user.usernameDID);
                const unreadNotifications = await connector.getUserUnreadNotifications(user.access_token, user.id_token, user.usernameDID);

                return { allNotifications, unreadNotifications };
            case 'PATCH':
                info = JSON.parse(req.body);
                notificationId = info.notificationId;
                action = info.action;

                if (action === 'read') {
                    return await connector.markNotificationsAsRead(user.access_token, user.id_token, notificationId);
                }
                return await connector.markNotificationsAsUnread(user.access_token, user.id_token, notificationId);
            case 'DELETE':
                info = JSON.parse(req.body);
                notificationId = info.notificationId;
                return await connector.deleteNotification(user.access_token, user.id_token, notificationId);
            default:
                return null;
        }
    }
    return null;
});
