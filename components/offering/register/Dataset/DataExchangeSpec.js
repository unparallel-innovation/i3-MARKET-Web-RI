import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import CustomToggle from '../../../common/CustomToggle';
import CustomLabel from '../../../common/CustomLabel';
import { useState } from 'react';

export default function DataExchangeSpec(props) {
    const {
        encAlg, signingAlg, hashAlg, ledgerContractAddress, ledgerSignerAddress,
        pooToPorDelay, pooToPopDelay, pooToSecretDelay, user, eventKey
    } = props;

    const [encryption, setEncryption] = useState(encAlg);
    const [signing, setSigning] = useState(signingAlg);
    const [hash, setHash] = useState(hashAlg);

    return (
        <Accordion>
            <Card className="mb-3">
                <CustomToggle eventKey={eventKey}>
                    Data Exchange Spec
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'encAlg'}>
                                    <CustomLabel value="Encryption Algorithm" tooltip="Encryption algorithm used to encrypt blocks. Either AES-128-GCM ('A128GCM') or AES-256-GCM ('A256GCM)" />
                                    <Form.Control as="select" value={encryption} name={eventKey + 'encAlg'} onChange={e => { setEncryption(e.target.value); }} >
                                        <option value="A128GCM">A128GCM</option>
                                        <option value="A256GCM">A256GCM</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'signingAlg'}>
                                    <CustomLabel value="Signing Algorithm" tooltip="Signing algorithm used to sign the proofs. It'e ECDSA secp256r1 with key lengths: either 'ES256', 'ES384', or 'ES512'" />
                                    <Form.Control as="select" value={signing} name={eventKey + 'signingAlg'} onChange={e => { setSigning(e.target.value); }} >
                                        <option value="ES256">ES256</option>
                                        <option value="ES384">ES384</option>
                                        <option value="ES512">ES512</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'hashAlg'}>
                                    <CustomLabel value="Hash Algorithm" tooltip="Hash algorithm used to compute digest/commitments. It's SHA2 with different output lengths: either 'SHA-256', 'SHA-384' or 'SHA-512'" />
                                    <Form.Control as="select" value={hash} name={eventKey + 'hashAlg'} onChange={e => { setHash(e.target.value); }} >
                                        <option value="SHA-256">SHA-256</option>
                                        <option value="SHA-384">SHA-384</option>
                                        <option value="SHA-512">SHA-512</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'ledgerContractAddress'}>
                                    <CustomLabel value="Ledger Contract Address" tooltip="The ledger smart contract address (hexadecimal) on the DLT" />
                                    <Form.Control type="text" name={eventKey + 'ledgerContractAddress'} defaultValue={ledgerContractAddress} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'ledgerSignerAddress'}>
                                    <CustomLabel value="Ledger Signer Address" tooltip="The orig (data provider) address in the DLT (hexadecimal)" />
                                    <Form.Control type="text" name={eventKey + 'ledgerSignerAddress'} defaultValue={user.ledgerAddress} disabled />
                                    <input type="hidden" name={eventKey + 'ledgerSignerAddress'} defaultValue={user.ledgerAddress} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'pooToPorDelay'}>
                                    <CustomLabel value="PoO to PoR delay" tooltip="Maximum acceptable delay between the issuance of the proof of origin (PoO) by the orig and the reception of the proof of reception (PoR) by the orig" />
                                    <Form.Control type="number" min={0} name={eventKey + 'pooToPorDelay'} defaultValue={pooToPorDelay} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'pooToPopDelay'}>
                                    <CustomLabel value="PoP to PoR delay" tooltip="Maximum acceptable delay between the issuance of the proof of origin (PoP) by the orig and the reception of the proof of publication (PoR) by the dest" />
                                    <Form.Control type="number" min={0} name={eventKey + 'pooToPopDelay'} defaultValue={pooToPopDelay} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'pooToSecretDelay'}>
                                    <CustomLabel value="PoO to Secret delay" tooltip="If the dest (data consumer) does not receive the PoP, it could still get the decryption secret from the DLT. This defines the maximum acceptable delay between the issuance of the proof of origin (PoP) by the orig and the publication (block time) of the secret on the blockchain" />
                                    <Form.Control type="number" min={0} name={eventKey + 'pooToSecretDelay'} defaultValue={pooToSecretDelay} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
