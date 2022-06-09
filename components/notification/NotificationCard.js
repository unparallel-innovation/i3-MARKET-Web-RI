import { useRouter } from 'next/router';
import { Button, Card, Col, Modal } from 'react-bootstrap';
import colors from '../../lib/colors';
import { CheckCircle, Trash, XCircle } from 'react-bootstrap-icons';
import { useState } from 'react';

export default function NotificationCard(props) {
    const router = useRouter();
    const { id, data, status, receptor, action, unread, origin } = props;
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showRead, setShowRead ] = useState(false);
    const [ showUnread, setShowUnread ] = useState(false);

    function markNotification(id, action) {
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

    function onClick(action){
        if(action === 'agreement.pending'){
            router.push('/offerings/createAgreement/' + id);
        }
    }

    function onDelete(e) {
        fetch('/api/notifications', {
            method: 'DELETE',
            body: JSON.stringify({ notificationId: id })
        }).then(res => {
            router.reload();
        });
    }

    // TODO: set background color based on 'action'
    // TODO: set read/unread color

    return (
        <>
            <Col className="col-md-12">
                <Card className="overflow-hidden cursor-pointer mb-3" >
                    <Card.Body onClick={() => onClick(action)}>
                        <div className="d-flex">
                            <Card.Text className="flex-grow-1">{action}</Card.Text>
                            Status: {status}
                        </div>
                        <Card.Title className="mt-3">{data.msg}</Card.Title>
                    </Card.Body>
                    <div className="d-flex bg-light">
                        <div className="flex-grow-1">
                        </div>
                        <span className="p-2 px-3">
                            <CheckCircle color={colors.primary} size={24} onClick={() => setShowRead(true)}/>
                            <XCircle className="ml-4" color={colors.primary} size={24} onClick={() => setShowUnread(true)}/>
                            <Trash className="ml-4" color={colors.primary} size={22} onClick={() => setShowDelete(true)}/>
                        </span>
                    </div>
                </Card>
            </Col>
            {showModal()}
        </>
    );

    function showModal() {
        if (showDelete) {
            return (
                <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                    <Modal.Header closeButton>
                        Delete notification
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete notification <br/>
                        <strong>{id}</strong> ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDelete(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else if (showRead) {
            return (
                <Modal show={showRead} onHide={() => setShowRead(false)}>
                    <Modal.Header closeButton>
                        Mark notification as read
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to mark notification <br/>
                        <strong>{id}</strong> as read?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRead(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => markNotification(id, 'read')}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
        else if (showUnread) {
            return (
                <Modal show={showUnread} onHide={() => setShowUnread(false)}>
                    <Modal.Header closeButton>
                        Mark notification as unread
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to mark notification <br/>
                        <strong>{id}</strong> as unread?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowUnread(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => markNotification(id, 'unread')}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}
