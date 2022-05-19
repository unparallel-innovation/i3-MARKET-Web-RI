import { useRouter } from 'next/router';
import { Card, Col } from 'react-bootstrap';
import colors from '../../lib/colors';
import { CheckCircle, Trash, XCircle } from 'react-bootstrap-icons';

export default function NotificationCard(props) {
    const { id, data, status, receptor, action, unread, origin } = props;
    const router = useRouter();

    function markNotification(id, action){
        const body = {
            notificationId: id,
            action: action
        };
        fetch('/api/notifications', {
            method: 'PATCH',
            body: JSON.stringify(body)
        }).then(res => {
            router.reload();
        });
    }

    function deleteNotification(e) {
        fetch('/api/notifications', {
            method: 'DELETE',
            body: JSON.stringify({ notificationId: id })
        }).then(res => {
            router.reload();
        });
    }

    return (
        <Col className="col-md-12">
            <Card className="overflow-hidden cursor-pointer mb-3" >
                <Card.Body>
                    <div className="d-flex">
                        <span className="flex-grow-1">
                            <Card.Title>{data.msg}</Card.Title>
                        </span>

                        <span className="px-3">
                            Status: {status}
                        </span>

                    </div>
                    <Card.Text>{action}</Card.Text>
                </Card.Body>
                <div className="d-flex bg-light">
                    <span className="flex-grow-1">
                    </span>
                    <span className="p-2 px-3">
                        <CheckCircle color={colors.primary} size={24} onClick={() => markNotification(id, 'read')}/>
                        <XCircle className="ml-4" color={colors.primary} size={24} onClick={() => markNotification(id, 'unread')}/>
                        <Trash className="ml-4" color={colors.primary} size={22} onClick={deleteNotification}/>
                    </span>
                </div>
            </Card>
        </Col>
    );
}



function unreadNotification(e) {

}

function deleteNotification(e) {

}
