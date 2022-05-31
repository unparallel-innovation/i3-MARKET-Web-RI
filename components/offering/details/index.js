import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from '/lib/colors.js';
import Dataset from './Dataset.js';
import PricingModel from './PricingModel.js';
import { Button, Modal, Row } from 'react-bootstrap';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import Layout from '/components/layout/Layout.js';
import { getOfferingStatusIcon, ts2date } from '../../../lib/utils';
import ContractParameter from './ContractParameter';
import KVCol2 from '../../common/KVCol2';

export default
function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const {
        dataOfferingTitle, dataOfferingDescription, status, hasDataset,
        category, provider, providerDid, marketId, marketDid, owner, ownerDid,
        dataOfferingExpirationTime, hasPricingModel, contractParameters, user
    } = props;

    const [ showDelete, setShowDelete ] = useState(false);
    const [ showActivate, setShowActivate ] = useState(false);

    const statusIconEl = getOfferingStatusIcon(status);

    const datasetEl = hasDataset
        ? <Dataset
            key={'datasetKey'} eventKey={'dataset'} { ...hasDataset }
        /> : '';

    const contractParametersEl = contractParameters
        ? <ContractParameter
            key={'contractParametersKey'} eventKey={'contractParameters'} { ...contractParameters }
        /> : '';

    const pricingModelEl = hasPricingModel
        ? <PricingModel
            key={'hasPricingModelKey'} eventKey={'hasPricingModel'} { ...hasPricingModel }
        /> : '';

    function onActivate(e) {
        fetch(`/api/offering/${offeringId}`, {
            method: 'PATCH',
        }).then(res => {
            router.back();
        }).catch(error => {
            console.log('ERROR', error);
        });
    }

    function onBuyOffering(){
        router.push('/offerings/buy/' + offeringId);
    }

    function onUpdate(e) {
        router.push('/offerings/update/' + offeringId);
    }

    function onDelete(e) {
        fetch(`/api/offering/${offeringId}`, {
            method: 'DELETE',
        }).then(res => {
            router.back();
        }).catch(error => {
            console.log('ERROR', error);
        });
    }

    return (
        <Layout>
            <div className="px-5 pb-3">
                <div className="d-flex">
                    <h3 className="flex-grow-1 m-0">{ dataOfferingTitle }</h3>
                    <div className="d-flex align-items-center">

                        {user.consumer ? ( <Button className="mr-4" onClick={onBuyOffering}> Buy Offering </Button>) : null}



                        { statusIconEl } <div className="ml-2">{ status }</div>

                        { user.provider ? (
                            <div className="ml-4 d-flex">
                                |
                                <div className="ml-4">
                                    <Eye color={colors.primary} size={24} onClick={() => setShowActivate(true)} cursor="pointer"
                                        pointerEvents={(status !== 'Active') ? 'auto' : 'none'} />
                                </div>
                                <div className="ml-3">
                                    <Pencil color={colors.primary} size={20} onClick={onUpdate} cursor="pointer" />
                                </div>
                                <div className="ml-3">
                                    <Trash color={colors.primary} size={20} onClick={() => setShowDelete(true)} cursor="pointer"
                                        pointerEvents={(status !== 'ToBeDeleted' || status !== 'Deleted') ? 'auto' : 'none'} />
                                </div>
                            </div>
                        ) : null }
                    </div>
                </div>

                <p>{ dataOfferingDescription }</p>

                <Row className="text-center mb-3">
                    <KVCol2 title="Provider">
                        { provider }
                    </KVCol2>
                    <KVCol2 title="Provider DID">
                        { providerDid }
                    </KVCol2>

                </Row>

                <Row className="text-center mb-3">
                    <KVCol2 title="Market">
                        { marketId }
                    </KVCol2>
                    <KVCol2 title="Market DID">
                        { marketDid }
                    </KVCol2>
                </Row>

                <Row className="text-center mb-3">
                    <KVCol2 title="Owner">
                        { owner }
                    </KVCol2>
                    <KVCol2 title="Owner DID">
                        { ownerDid }
                    </KVCol2>
                </Row>

                <Row className="text-center mb-3">
                    <KVCol2 title="Category">
                        { category }
                    </KVCol2>
                    <KVCol2 title="Expiration Time">
                        { ts2date(dataOfferingExpirationTime) }
                    </KVCol2>
                </Row>

                <div className="mt-3" />

                { datasetEl }

                <div className="mt-3" />

                { contractParametersEl }

            </div>

            { pricingModelEl }

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
