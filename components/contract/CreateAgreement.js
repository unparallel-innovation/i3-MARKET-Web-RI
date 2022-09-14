import Layout from '../layout/Layout';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Error from '../layout/Error';
import { walletApi } from '../../lib/walletApi';
import { useState } from 'react';

export default function CreateAgreement(props) {
    const router = useRouter();
    const { id, origin, receptor, data, user } = props;
    const template = data.template;
    const [showReject, setShowReject] = useState(false)
    const [rejectNotes, setRejectNotes] = useState('')

    if (user.consumer) {
        const error = { message: 'Sorry, you don\'t have permission to access this page!' };
        return <Error error={error}/>;
    }

    function onCancel() {
        router.back();
    }

    function onReject(e){
        e.preventDefault();
        fetch('/api/offerings/rejectPurchaseRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                notificationId: id,
                offeringId: 'offeringId', //TODO retrieve from template
                consumerDid: origin,
                notes: rejectNotes
            })
        }).then(() => {
            setShowReject(false)
            router.push('/notifications')
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const api = await walletApi();
        const info = await api.identities.info({ did: user.DID });
        const ethereumAddress = info.addresses[0];

        fetch('/api/offerings/createAgreement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                template,
                senderAddress: ethereumAddress
            })
        }).then(res => {
            res.json().then(async rawTransaction => {
                const body = {
                    type: 'Transaction',
                    data: rawTransaction
                };
                const signRes = await api.identities.sign({ did: user.DID }, body);

                fetch('/api/offerings/deployTransaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signRes),
                }).then(res => {
                    res.json().then(deployRes => {
                        console.log('transaction deployed', deployRes);

                        fetch('/api/notifications', {
                            method: 'DELETE',
                            body: JSON.stringify({ notificationId: id })
                        }).then(() => {
                            router.back();
                        });
                    });
                });
            });
        });
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">{'Create Data Agreement'}</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button variant="danger" className="mr-3" onClick={() => setShowReject(true)}>Reject</Button>
                    <Button type="submit">Create</Button>
                </div>
                {/* TODO update after SDK-RI fix  */}
                {/*<ContractParameters data={template} />*/}
            </Form>
            {showModal()}
        </Layout>
    );

    function showModal(){
        if (showReject) {
            return (
                <Modal show={showReject} onHide={() => setShowReject(false)}>
                    <Modal.Header closeButton>
                        Reject Data Purchase Request
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control as="textarea" rows={5} placeholder="Please add some notes"
                          onChange={(e) => setRejectNotes(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowReject(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={onReject}>
                            Reject
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}
