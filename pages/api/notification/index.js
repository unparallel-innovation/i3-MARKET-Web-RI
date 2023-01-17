import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';
import jsonrepair from 'jsonrepair';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    const { notificationId, action } = req.body;

    if (user) {
        switch (req.method) {
            case 'GET':
                let allNotifications = await connector.getUserNotifications(user.access_token, user.id_token, user.DID);
                let unreadNotifications = await connector.getUserUnreadNotifications(user.access_token, user.id_token, user.DID);

                // retrieve notifications associated to publicKeys
                const keys = req.query.keys ? JSON.parse(req.query.keys) : [];
                if (keys.length > 0) {
                    for (let i = 0; i < keys.length; i++) {
                        const publicKey = keys[i].resource.keyPair.publicJwk;

                        const userNotifications = await connector.getUserNotifications(user.access_token, user.id_token, publicKey);

                        if (userNotifications) {
                            const userNotification = userNotifications[0];

                            if (userNotification.unread) {
                                unreadNotifications = [ ...unreadNotifications, userNotification ];
                            }
                            allNotifications = [ ...allNotifications, userNotification ];
                        }
                    }
                }
                return { allNotifications, unreadNotifications, user };
            case 'PATCH':
                if (action === 'read') {
                    return await connector.markNotificationsAsRead(user.access_token, user.id_token, notificationId);
                }
                return await connector.markNotificationsAsUnread(user.access_token, user.id_token, notificationId);
            case 'DELETE':
                return await connector.deleteNotification(user.access_token, user.id_token, notificationId);
            case 'POST':
                return {};
        }
    }
    return null;
});
