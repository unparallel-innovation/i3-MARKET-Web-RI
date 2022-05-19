import { useData } from '../../lib/hooks';
import Error from '../../components/layout/Error';
import { Loading } from '../../components/layout/Loading';
import Layout from '../../components/layout/Layout';
import { Row } from 'react-bootstrap';
import NotificationCard from '../../components/notification/NotificationCard';

export default function Notifications() {
    const { data, error } = useData('/api/notifications');

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    if (data) {
        const notificationsEl = data.allNotifications.map(notification => (
            <NotificationCard key={notification.id} {... notification} />
        ));

        return (
            <Layout>
                <div className="px-5">
                    <Row>
                        { notificationsEl }
                    </Row>
                </div>
            </Layout>);
    }
    return '';
}
