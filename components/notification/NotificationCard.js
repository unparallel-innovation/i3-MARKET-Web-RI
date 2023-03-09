import { useRouter } from 'next/router';
import { Button, Card, Col, Modal } from 'react-bootstrap';
import colors from '../../lib/colors';
import { CheckCircle, Trash, XCircle } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { ISOtoDate } from '../../lib/utils';

import { jweDecrypt, validateDataSharingAgreementSchema } from '@i3m/non-repudiation-library';
import { walletApi } from '../../lib/walletApi';

export default function NotificationCard(props) {
    const router = useRouter();
    const {
        id, data, status, receptor, action,
        unread, origin, dateCreated, keyPair, user
    } = props;
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showRead, setShowRead ] = useState(false);
    const [ showUnread, setShowUnread ] = useState(false);
    const [ showSign, setShowSign ] = useState(false);
    const [ showCreateAgreement, setShowCreateAgreement ] = useState(false);
    const [ offering, setOffering ] = useState('');
    const [ msg, setMsg] = useState(data.msg);
    const dataSharingAgreement = data.dataSharingAgreement;

    // decrypt notification message
    useEffect(() => {
        async function decryptJwe() {
            if (data.jwe) {
                // retrieve private key matching public key (receptor)
                const privateKey = keyPair.find(el=>el.publicJwk === receptor).privateJwk;
                if (privateKey) {
                    const uint8Decrypted = await jweDecrypt(data.jwe, JSON.parse(privateKey));
                    const strDecrypted = new TextDecoder().decode(new Uint8Array(uint8Decrypted.plaintext));
                    const jsonDecrypted = JSON.parse(strDecrypted);
                    setMsg(jsonDecrypted.msg);
                }
            }
        }
        decryptJwe();
    }, [data.jwe, keyPair, receptor]);

    // TODO: set background color based on 'action'
    // TODO: set read/unread color

    function markNotification(id, action) {
        const body = {
            notificationId: id,
            action: action
        };
        fetch('/api/notification', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(() => {
            router.reload();
        });
    }

    function onClick(action) {
        if (user.consumer && action === 'agreement.pending' && origin === 'web-ri') {
            setOffering(dataSharingAgreement.dataOfferingDescription.title);
            setShowSign(true);
        }
        else if (user.provider && action === 'agreement.pending' && origin === 'web-ri') {
            router.push('/offerings/dataPurchaseRequest/' + id);
        }
        else if (user.provider && action === 'agreement.accepted' && origin === 'web-ri') {
            setOffering(dataSharingAgreement.dataOfferingDescription.title);
            setShowCreateAgreement(true);
        }
        else if (action === 'agreement.rejected') {
            // TODO show rejection notes
            alert(data.notes);
        }
    }

    function onDelete() {
        fetch('/api/notification', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationId: id })
        }).then(() => {
            router.reload();
        });
    }

    async function onSign(e) {
        e.preventDefault();
        await consumerSign();
    }

    async function onCreate(e) {
        e.preventDefault();
        await providerCreateAgreement();
    }

    return (
        <>
            <Col className="col-md-12">
                <Card className="overflow-hidden cursor-pointer mb-3" >
                    <Card.Body onClick={() => onClick(action)}>
                        <div className="d-flex">
                            <Card.Text className="flex-grow-1">{action}</Card.Text>
                            {/*Status: {status}*/}
                            {ISOtoDate(dateCreated, 'YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <Card.Title className="mt-3">{msg}{data.notes ? `. Reason: ${data.notes}` : ''}</Card.Title>
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
                        Do you want to confirm the purchase for offering <strong>{offering}</strong>?
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
        } else if (showCreateAgreement) {
            return (
                <Modal show={showCreateAgreement} onHide={() => setShowCreateAgreement(false)}>
                    <Modal.Header closeButton>
                        Create Agreement
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to create the agreement for offering <strong>{offering}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCreateAgreement(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onCreate}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
    async function consumerSign() {
        const wallet = await walletApi();
        // create payload object (equal to dataSharingAgreement but without signatures)
        const { signatures, ...payload } = dataSharingAgreement;
        // consumer verifies provider's signature using the wallet
        const verifySignature = await wallet.didJwt.verify({ jwt: signatures.providerSignature, expectedPayloadClaims: payload });

        // verification.verification === 'success'
        // verification.decodedJwt.iss === dataSharingAgreeement.parties.providerDid
        // verification.decodedJwt.iat is an acceptable timestamp (likely close to now or within an agreed period)
        if (verifySignature.verification === 'success'
            && verifySignature.decodedJwt.iss === dataSharingAgreement.parties.providerDid
            && verifySignature.decodedJwt.iat <= Date.now()
        ) {
            // sign the payload with the wallet
            const walletSign = await wallet.identities.sign({ did: props.user.DID }, { type: 'JWT', data: { payload } });

            // add the consumer signature to dataSharingAgreement
            dataSharingAgreement.signatures.consumerSignature = walletSign.signature;

            // get list of consumer keys from wallet
            const consumerKeys = await wallet.resources.list({ type: 'KeyPair', identity: user.DID });

            // get keyPair according to dataExchangeAgreement.dest
            const selectedKeyPair = consumerKeys.find(res => res.resource.keyPair.publicJwk === dataSharingAgreement.dataExchangeAgreement.dest).resource.keyPair;

            // validate dataSharingAgreementSchema
            const dataSharingSchemaAgreementErrors = await validateDataSharingAgreementSchema(dataSharingAgreement);

            console.log('dataSharingAgreement schema errors', dataSharingSchemaAgreementErrors);

            if (dataSharingSchemaAgreementErrors.length === 0 && selectedKeyPair) {
                console.log('[Consumer] selected keyPair', selectedKeyPair);

                // save contract with dataSharingAgreement and keyPair in the Wallet
                const resource = {
                    type: 'Contract',
                    name: 'Consumer Contract',
                    identity: user.DID,
                    resource: {
                        dataSharingAgreement: dataSharingAgreement,
                        keyPair: selectedKeyPair
                    }
                };
                await wallet.resources.create(resource);
                console.log('Data Sharing Agreement saved in Wallet (Consumer)');

                // send signed agreement to provider
                fetch('/api/offering/sendAgreementProvider', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataSharingAgreement),
                }).then(r => {
                    // delete consumer notification
                    onDelete();
                });
            }
        }
    }

    async function providerCreateAgreement() {
        const wallet = await walletApi();
        // create payload object (equal to dataSharingAgreement but without signatures)
        const { signatures, ...payload } = dataSharingAgreement;
        // provider verifies consumer's signature using the wallet
        const verifySignature = await wallet.didJwt.verify({ jwt: signatures.consumerSignature, expectedPayloadClaims: payload });

        if (verifySignature.verification === 'success'
            && verifySignature.decodedJwt.iss === dataSharingAgreement.parties.consumerDid
            && verifySignature.decodedJwt.iat <= Date.now()
        ) {
            // get list of provider keys from wallet
            const providerKeys = await wallet.resources.list({ type: 'KeyPair', identity: user.DID });

            // get keyPair according to dataExchangeAgreement.orig
            const selectedKeyPair = providerKeys.find(res => res.resource.keyPair.publicJwk === dataSharingAgreement.dataExchangeAgreement.orig).resource.keyPair;

            // validate dataSharingAgreementSchema
            const dataSharingSchemaAgreementErrors = await validateDataSharingAgreementSchema(dataSharingAgreement);

            console.log('dataSharingAgreement schema errors', dataSharingSchemaAgreementErrors);

            if (dataSharingSchemaAgreementErrors.length === 0 && selectedKeyPair) {

                console.log('[Provider] selected keyPair', selectedKeyPair);

                // save contract with dataSharingAgreement and keyPair in the Wallet
                const resource = {
                    type: 'Contract',
                    name: 'Provider Contract',
                    identity: user.DID,
                    resource: {
                        dataSharingAgreement: dataSharingAgreement,
                        keyPair: selectedKeyPair
                    }
                };
                await wallet.resources.create(resource);
                console.log('Data Sharing Agreement saved in Wallet (Provider)');

                // retrieve ethereumAddress from wallet
                const info = await wallet.identities.info({ did: user.DID });
                const ethereumAddress = info.addresses[0];

                console.log('CreateAgreement', dataSharingAgreement);

                // create agreement
                fetch('/api/offering/createAgreement', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        senderAddress: ethereumAddress,
                        dataSharingAgreement
                    }),
                }).then(res1 => {
                    res1.json().then(async rawTransaction => {
                        console.log('RawTransaction', rawTransaction);

                        const signTransaction = await wallet.identities.sign({ did: props.user.DID }, { type: 'Transaction', data: rawTransaction });
                        console.log('Sign RawTransaction', signTransaction);

                        fetch('/api/offering/deployTransaction', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(signTransaction),
                        }).then(res2 => {
                            res2.json().then(deployRes => {
                                console.log('transaction deployed', deployRes);

                                // TODO add loading
                                onDelete();
                            });
                        });
                    });
                });
            }
        }
    }
}
