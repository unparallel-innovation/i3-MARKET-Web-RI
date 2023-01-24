import { useState } from 'react';
import NotificationCard from './NotificationCard';
import { Button, Form, Row } from 'react-bootstrap';
import Layout from '../layout/Layout';

export default function NotificationsList(props) {
    const { allNotifications, user } = props;
    const [ type, setType ] = useState('all');
    const [ ref, setRef ] = useState('');

    function onChange(e) {
        setRef(e.target.value);
    }

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

    const notificationCards = allNotifications.filter(function (notification) {
        if (type === 'all')
            return notification;
        return notification.action === type;
    }).map(function (notification) {
        return <NotificationCard key={notification.id} {... notification} user={user} />;
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
