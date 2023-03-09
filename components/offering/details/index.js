import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from '/lib/colors.js';
import Dataset from './Dataset.js';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import Layout from '/components/layout/Layout.js';
import { getOfferingStatusIcon, ts2date } from '../../../lib/utils';
import ContractParameters from './ContractParameters';
import KVCol2 from '../../common/KVCol2';
import PricingModel from './PricingModel';
import StarRating from '../../common/StarRating.js';

export default
function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const {
        dataOfferingTitle, dataOfferingDescription, status, ownerConsentForm, active,
        personalData, inSharedNetwork, category, provider, providerDid, providerRating, marketId, marketDid,
        owner, ownerDid, dataOfferingExpirationTime, hasDataset, hasPricingModel, contractParameters,
        contracts = [], pendingContracts = [], user
    } = props;

    const [ showDelete, setShowDelete ] = useState(false);
    const [ showActivate, setShowActivate ] = useState(false);

    // 0 - active
    // 1 - violated
    // 2 - terminated
    const activeContracts = contracts.filter(c => c.state === 0).length;

    const statusIconEl = getOfferingStatusIcon(status);

    const datasetEl = hasDataset
        ? <Dataset
            key={'datasetKey'} eventKey={'dataset'} { ...hasDataset }
        /> : '';

    const contractParametersEl = contractParameters
        ? <ContractParameters
            key={'contractParametersKey'} eventKey={'contractParameters'} { ...contractParameters }
        /> : '';

    const pricingModelEl = hasPricingModel
        ? <PricingModel
            key={'hasPricingModelKey'} eventKey={'hasPricingModel'} {...hasPricingModel} offeringId={offeringId} user={user}
        /> : '';

    function onActivate(e) {
        fetch(`/api/offering/${offeringId}`, {
            method: 'PATCH',
        }).then(res => {
            router.back();
        });
    }

    function onUpdate(e) {
        router.push('/offerings/update/' + offeringId);
    }

    function onDelete(e) {
        fetch(`/api/offering/delete/${offeringId}`, {
            method: 'DELETE',
        }).then(res => {
            router.back();
        });
    }

    function onBuyOffering(e) {
        router.push('/offerings/contractTemplate/' + offeringId);
    }

    function onViewContracts() {
        router.push('/offerings/contracts/' + offeringId);
    }

    return (
        <Layout>
            <div className="px-5 pb-3">
                <div className="d-flex">
                    <h3 className="flex-grow-1 m-0">{ dataOfferingTitle }</h3>
                    <div className="d-flex align-items-center">

                        { user.consumer ? ( <Button className="mr-4" onClick={onBuyOffering}> Buy Offering </Button>) : null }

                        { statusIconEl } <div className="ml-2">{ status }</div>

                        { user.provider && user.DID === providerDid ? (
                            <div className="ml-4 d-flex">
                                |
                                <div className="ml-4" title={'Activate Offering'}>
                                    <Eye color={colors.primary} size={24} onClick={() => setShowActivate(true)} cursor="pointer"
                                        pointerEvents={(status !== 'Active') ? 'auto' : 'none'}/>
                                </div>
                                <div className="ml-3" title={'Edit Offering'}>
                                    <Pencil color={colors.primary} size={20} onClick={onUpdate} cursor="pointer" />
                                </div>
                                <div className="ml-3" title={'Delete Offering'}>
                                    <Trash color={colors.primary} size={20} onClick={() => setShowDelete(true)} cursor="pointer"
                                        pointerEvents={(status !== 'ToBeDeleted' || status !== 'Deleted') ? 'auto' : 'none'} />
                                </div>
                            </div>
                        ) : null }
                    </div>
                </div>

                { user.provider && user.DID === providerDid ? <>
                    <hr />
                    <div className="d-flex align-items-center">
                        <Button style={{ borderRadius: '8px' }} size="sm" onClick={onViewContracts}>View all Contracts</Button>
                        <span className="ml-2 mr-2">{ activeContracts || 0 } Active</span> |
                        <span className="ml-2">{ pendingContracts.length || 0 } Pending</span>
                    </div>
                </>
                    : null
                }

                <hr />

                <p>{ dataOfferingDescription }</p>

                <Row className="text-center mb-3">
                    <KVCol2 title="Provider">
                        { provider }
                    </KVCol2>
                    <KVCol2 title="Owner">
                        { owner }
                    </KVCol2>
                    <Col className="text-center p-2">
                        <StarRating title="Provider Rating" rating={ providerRating.roundedRating }>
                        </StarRating>
                    </Col>
                </Row>

                <Row className="text-center mb-3">
                    <KVCol2 title="Market">
                        { marketId }
                    </KVCol2>
                    <KVCol2 title="Category">
                        { category }
                    </KVCol2>
                    <KVCol2 title="Expiration Time">
                        { ts2date(dataOfferingExpirationTime) }
                    </KVCol2>
                </Row>

                <Row className="text-center mb-3">
                    <KVCol2 title="Owner Consent From">
                        { ownerConsentForm }
                    </KVCol2>
                    <KVCol2 title="Personal Data">
                        { personalData }
                    </KVCol2>
                    <KVCol2 title="In Shared Network">
                        { inSharedNetwork }
                    </KVCol2>
                </Row>

                <div className="mt-3" />

                { datasetEl }

                <div className="mt-3" />

                { contractParametersEl }

                <div className="mt-3" />

                { pricingModelEl }

            </div>

            { showModal(showDelete, showActivate) }

        </Layout>
    );

    function showModal(showDelete, showActivate) {
        if (showDelete) {
            return (
                <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                    <Modal.Header closeButton>
                        Delete offering
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete offering <br/>
                        <strong>{offeringId}</strong> ?
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
        else if (showActivate) {
            return (
                <Modal show={showActivate} onHide={() => setShowActivate(false)}>
                    <Modal.Header closeButton>
                        Activate offering
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to activate offering <br/>
                        <strong>{offeringId}</strong> ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowActivate(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={onActivate}>
                            Activate
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }
}
