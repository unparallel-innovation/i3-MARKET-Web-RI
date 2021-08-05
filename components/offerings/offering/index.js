import colors from '/lib/colors.js';
import { ts2date } from '/lib/utils.js';
import Dataset from './Dataset.js';
import PricingModel from './PricingModel.js';
import KVCol2 from './KVCol2.js';
import { Button, Row } from 'react-bootstrap' ;
import { Lock, Globe, Pencil, Trash } from 'react-bootstrap-icons';
import Layout from '/components/Layout.js';

export default
function Offering(props) {
    const {
        title, description, activeContracts,
        pendingContracts, active, hasDataset,
        category, isProvidedBy, license,
        hasPricingModel
    } = props;

    const visIconEl = active === "yes"
        ? <Globe color={colors.primary} size={20} />
        : <Lock color={colors.primary} size={20} />;

    const datasetEl = hasDataset.map((dataset, idx) => (
        <Dataset key={dataset.title} eventKey={`dataset${idx}`} { ...dataset } />
    ));

    const pricingModelEl = hasPricingModel.map((item, idx) => (
        <PricingModel key={idx} { ...item } />
    ));

    return (<Layout>
        <div className="px-5 pb-3">
            <div className="d-flex">
                <h3 className="flex-grow-1 m-0">{ title }</h3>
                <span className="p-2">{ visIconEl }</span>
                <span className="p-2">
                    <Pencil color={colors.primary} size={20} />
                </span>
                <span className="p-2">
                    <Trash color={colors.primary} size={20} />
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

            <p>{ description }</p>

            <Row className="text-center mb-3">
                <KVCol2 title="Category">
                    { category }
                </KVCol2>
                <KVCol2 title="Provider">
                    { isProvidedBy }
                </KVCol2>
                <KVCol2 title="Licence">
                    { license }
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
    </Layout>);
}
