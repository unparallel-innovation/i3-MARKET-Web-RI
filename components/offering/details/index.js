import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from '/lib/colors.js';
import Dataset from './Dataset.js';
import PricingModel from './PricingModel.js';
import { Button, Modal, Row } from 'react-bootstrap';
import { Globe, Lock, Pencil, Trash } from 'react-bootstrap-icons';
import Layout from '/components/layout/Layout.js';
import { ts2date } from '../../../lib/utils';
import ContractParameter from './ContractParameter';
import KVCol2 from '../../common/KVCol2';

export default
function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const {
        dataOfferingTitle, dataOfferingDescription, status, hasDataset,
        category, provider, providerDid, marketId, marketDid, owner, ownerDid,
        dataOfferingExpirationTime, hasPricingModel, contractParameters
    } = props;

    const [ show, setShowDelete ] = useState(false);

    const visIconEl = status === 'Activated'
        ? <Globe color={colors.primary} size={20} />
        : <Lock color={colors.primary} size={20} /> ;

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

    function onUpdate(e) {
        router.push('/offerings/update/' + offeringId);
    }

    function onDelete(e) {
        fetch(`/api/offering/${offeringId}`, {
            method: 'DELETE',
        }).then(res => {
            router.push('/offerings');
        }).catch(error => {
            console.log('ERROR', error);
        });
    }

    return (<Layout>
        <div className="px-5 pb-3">
            <div className="d-flex">
                <h3 className="flex-grow-1 m-0">{ dataOfferingTitle }</h3>
                <span className="p-2">{ visIconEl }  </span>
                <span className="p-2">
                    <Pencil color={colors.primary} size={20} onClick={onUpdate} className="cursor-pointer"/>
                </span>
                <span className="p-2">
                    <Trash color={colors.primary} size={20}
                        onClick={() => setShowDelete(true)}
                        className="cursor-pointer" />
                </span>
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

        <Modal show={show} onHide={() => setShowDelete(false)}>
            <Modal.Header closeButton>
                Delete offering
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete offering {offeringId}?
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
    </Layout>);
}
