import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from '/lib/colors.js';
import Dataset from './Dataset.js';
import PricingModel from './PricingModel.js';
import KVCol2 from './KVCol2.js';
import { Button, Modal, Row } from 'react-bootstrap';
import { Globe, Lock, Pencil, Trash } from 'react-bootstrap-icons';
import Layout from '/components/Layout.js';
import {ts2date} from "../../../lib/utils";

export default
function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const {
        dataOfferingTitle, dataOfferingDescription, activeContracts,
        pendingContracts, status, hasDataset,
        category, provider, license,
        marketID, owner, dataOfferingExpirationTime,
        hasPricingModel
    } = props;

    const [ show, setShowDelete ] = useState(false);

    const visIconEl = status === 'Activated'
        ? <Globe color={colors.primary} size={20} />
        : <Lock color={colors.primary} size={20} /> ;

    const datasetEl = hasDataset.find(el=>el.title) ? hasDataset.map((item, idx) => (
        <Dataset key={item.title} eventKey={`dataset${idx}`} { ...item } />
    )) : '';

    const pricingModelEl = hasPricingModel.find(el=>el.pricingModelName) ? hasPricingModel.map((item, idx) => (
        <PricingModel key={idx} { ...item } />
    )) : '';

    function onDelete(e) {
        fetch(`/api/offering/${offeringId}`, {
            method: 'DELETE',
        }).then(res => {
            router.push('/offerings');
        }).catch(error => {
            console.log('ERROR', error);
        });
    }

    // function onActivate(e) {
    //     fetch(`/api/offering/${offeringId}`, {
    //         method: 'PATCH',
    //     }).then(res => {
    //         router.push('/offering/${offeringId}');
    //     }).catch(error => {
    //         console.log('ERROR', error);
    //     });
    // }

    return (<Layout>
        <div className="px-5 pb-3">
            <div className="d-flex">
                <h3 className="flex-grow-1 m-0">{ dataOfferingTitle }</h3>
                <span className="p-2">{ visIconEl }  </span>
                <span className="p-2">
                    <Pencil color={colors.primary} size={20} />
                </span>
                <span className="p-2">
                    <Trash color={colors.primary} size={20}
                        onClick={() => setShowDelete(true)}
                        className="cursor-pointer" />
                </span>
            </div>

            <hr />

            <span>
                <Button disabled={!activeContracts && !pendingContracts}>
                    View all Contracts
                </Button>
                <span className="p-2 ml-2">{ activeContracts || 0 } Active</span>|
                <span className="p-2">{ pendingContracts || 0 } Pending</span>
            </span>

            <hr />

            <p>{ dataOfferingDescription }</p>

            <Row className="text-center mb-3">
                <KVCol2 title="Category">
                    { category }
                </KVCol2>
                <KVCol2 title="Provider">
                    { provider }
                </KVCol2>
                <KVCol2 title="Market">
                    { marketID }
                </KVCol2>
            </Row>

            <Row className="text-center mb-3">
                <KVCol2 title="Licence">
                    { license }
                </KVCol2>
                <KVCol2 title="Owner">
                    { owner }
                </KVCol2>
                <KVCol2 title="Expiration Time">
                    { ts2date(dataOfferingExpirationTime) }
                </KVCol2>
            </Row>

            { datasetEl }
        </div>

        <div className="bg-lightcyan p-5">
            <h3 className="mb-5 text-center">Pricing Model</h3>
            <Row>
                { pricingModelEl }
            </Row>
        </div>

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
