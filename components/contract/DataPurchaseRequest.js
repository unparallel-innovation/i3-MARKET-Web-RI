import Layout from '../layout/Layout';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Error from '../layout/Error';
import { walletApi } from '../../lib/walletApi';
import { useState } from 'react';
import ContractParameters from './ContractParameters';
import { generateKeys, parseJwk } from '@i3m/non-repudiation-library';

export default function DataPurchaseRequest(props) {
    const router = useRouter();
    const { id, data, offering, user } = props;
    const dataSharingAgreement = data.dataSharingAgreement;
    const [showReject, setShowReject] = useState(false);
    const [rejectNotes, setRejectNotes] = useState('');

    if (user.consumer) {
        const error = { message: 'Sorry, you don\'t have permission to access this page!' };
        return <Error error={error}/>;
    }

    function onCancel() {
        router.back();
    }

    function onReject(e) {
        e.preventDefault();

        fetch('/api/offering/rejectPurchaseRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                notificationId: id,
                offering: dataSharingAgreement.dataOfferingDescription.title,
                consumerDid: dataSharingAgreement.parties.consumerDid,
                notes: rejectNotes
            })
        }).then(() => {
            setShowReject(false);
            router.push('/notifications');
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const wallet = await walletApi();

        // retrieve ethereumAddress from wallet
        const info = await wallet.identities.info({ did: user.DID });
        // add ledgerSignerAddress to dataSharingAgreement
        dataSharingAgreement.dataExchangeAgreement.ledgerSignerAddress = info.addresses[0];

        // generate provider keys
        const signingAlg = dataSharingAgreement.dataExchangeAgreement.signingAlg;
        const providerKeys = await generateKeys(signingAlg);

        // save provider keys in wallet
        const resource = {
            type: 'KeyPair',
            name: 'Provider KeyPair',
            identity: props.user.DID,
            resource: {
                keyPair: {
                    privateJwk: await parseJwk(providerKeys.privateJwk, true),
                    publicJwk: await parseJwk(providerKeys.publicJwk, true)
                }
            }
        };
        await wallet.resources.create(resource);
        console.log('Key Pair saved in Wallet (Provider)');

        // add provider public key to dataSharingAgreement
        dataSharingAgreement.dataExchangeAgreement.orig = await parseJwk(providerKeys.publicJwk, true);

        // create payload object (equal to dataSharingAgreement but without signatures)
        const { signatures, ...payload } = dataSharingAgreement;

        // sign the payload with the wallet
        const walletSign = await wallet.identities.sign({ did: props.user.DID }, { type: 'JWT', data: { payload } });

        // add the provider signature to dataSharingAgreement
        dataSharingAgreement.signatures.providerSignature = walletSign.signature;

        // send signed agreement to consumer
        fetch('/api/offering/sendAgreementConsumer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataSharingAgreement),
        }).then(r => {
            // delete provider notification
            fetch('/api/notification', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notificationId: id })
            }).then(() => {
                router.back();
            });
        });
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Data Purchase Request</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button variant="danger" className="mr-3" onClick={() => setShowReject(true)}>Reject</Button>
                    <Button type="submit">Accept</Button>
                </div>
                <ContractParameters {...dataSharingAgreement} offering={offering} user={user} disableInput/>
            </Form>
            {showModal()}
        </Layout>
    );

    function showModal() {
        if (showReject) {
            return (
                <Modal show={showReject} onHide={() => setShowReject(false)}>
                    <Modal.Header closeButton>
                        Reject Proposal
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control as="textarea" rows={5} placeholder="Please add rejection notes"
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
