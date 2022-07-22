import { useData } from '../../lib/hooks';
import Error from '../../components/layout/Error';
import { Loading } from '../../components/layout/Loading';
import Layout from '../../components/layout/Layout';
import { Button, Form, Row } from 'react-bootstrap';
import NotificationCard from '../../components/notification/NotificationCard';
import { useState } from 'react';

export default function Notifications() {
    const { data, error } = useData('/api/notifications');
    const [ type, setType ] = useState('all');
    const [ ref, setRef ] = useState('');

    function onChange(e) {
        setRef(e.target.value);
    }

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    if (data) {
        // fill notification types dropdown
        const notificationTypes = [
            'all',
            'offering.new',
            'offering.update',
            'agreement.accepted',
            'agreement.rejected',
            'agreement.update',
            'agreement.pending',
            'agreement.termination',
            'agreement.claim'
        ];

        const types = notificationTypes.map((item, idx) => (
            <option key={idx + 1} value={item}>
                {item}
            </option>
        ));

        const notificationCards = data.allNotifications.filter(function (notification) {
            if (type === 'all')
                return notification;
            return notification.action === type;
        }).map(function (notification) {
            return <NotificationCard key={notification.id} {... notification} user={data.user} />;
        });

        const notificationsEl = notificationCards.length > 0
            ? <Row>{notificationCards}</Row>
            : <div className="d-flex h-100 h3 text-lightgray justify-content-center align-items-center">No results!</div>;

        return (
            <Layout>
                <div className="d-flex flex-column px-5 h-100">
                    <div className="d-flex mb-3">
                        <Form.Control ref={setRef} as="select" className="dropdown-custom mr-3" onChange={onChange}>
                            {types}
                        </Form.Control>
                        <Button type="submit" onClick={() => setType(ref)} >Search</Button>
                    </div>
                    { notificationsEl}
                </div>
            </Layout>
        );
    }
    return '';
}
