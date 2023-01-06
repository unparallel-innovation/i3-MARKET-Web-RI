import { useRouter } from 'next/router';
import { Button, Card, Col, Modal } from 'react-bootstrap';
import colors from '../../lib/colors';
import { CheckCircle, Trash, XCircle } from 'react-bootstrap-icons';
import { useState } from 'react';
import { ISOtoDate } from '../../lib/utils';

export default function NotificationCard(props) {
    const router = useRouter();
    const { id, data, status, receptor, action, unread, origin, dateCreated, user } = props;
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showRead, setShowRead ] = useState(false);
    const [ showUnread, setShowUnread ] = useState(false);
    const [ showSign, setShowSign ] = useState(false);
    const [ agreement, setAgreement ] = useState('');

    function markNotification(id, action) {
        const body = {
            notificationId: id,
            action: action
        };
        fetch('/api/notifications', {
            method: 'PATCH',
            body: JSON.stringify(body)
        }).then(() => {
            router.reload();
        });
    }

    function onClick(action) {
        if (user.consumer && action === 'agreement.pending' && origin === 'scm') { //TODO check by agreementId
            // workaround to retrieve agreement id from notification msg
            const agreementTxt = data.msg;
            const agreementId = agreementTxt.match(/\d/g)[0];
            setAgreement(agreementId);
            setShowSign(true);
        }
        else if (user.provider && action === 'agreement.pending' && data.template) {
            router.push('/offerings/createAgreement/' + id);
        }
        else if (action === 'agreement.rejected') {
            // TODO show rejection notes
            alert(data.notes);
        }
    }

    function onDelete() {
        fetch('/api/notifications', {
            method: 'DELETE',
            body: JSON.stringify({ notificationId: id })
        }).then(() => {
            router.reload();
        });
    }

    async function onSign() {
        // const api = await walletApi();
        // const info = await api.identities.info({ did: receptor });
        // const ethereumAddress = info.addresses[0];
        //
        // fetch('/api/offerings/signAgreement', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         'agreement_id': agreement,
        //         'consumer_id': receptor,
        //         'consumer_ethereum_address': ethereumAddress
        //     })
        // }).then(res => {
        //     res.json().then(async rawTransaction => {
        //         const body = {
        //             type: 'Transaction',
        //             data: rawTransaction
        //         };
        //         const signRes = await api.identities.sign({ did: receptor }, body);
        //
        //         fetch('/api/offerings/deployTransaction', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(signRes),
        //         }).then(res => {
        //             res.json().then(deployRes => {
        //                 console.log('transaction deployed', deployRes);
        //                 setAgreement('');
        //                 setShowSign(false);
        //                 onDelete();
        //             });
        //         });
        //     });
        // });
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
                            {/*Status: {status}*/}
                            {ISOtoDate(dateCreated)}
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
                        Are you sure you want to delete notification ?
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
                        Are you sure you want to mark notification as read?
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
                        Are you sure you want to mark notification as unread?
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
        } else if (showSign) {
            return (
                <Modal show={showSign} onHide={() => setShowSign(false)}>
                    <Modal.Header closeButton>
                        Sign Agreement
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to sign the agreement {agreement} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowSign(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onSign}>
                            Sign
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }

}
