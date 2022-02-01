import { useRouter } from 'next/router';
import Layout from '../../layout/Layout';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import General from '../update/General';
import Dataset from '../update/Dataset';
import PricingModel from '../update/PricingModel';

export default function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const { offering, categories } = props;

    const [ atIdx, setAtIdx ] = useState(0);

    const datasetEl = offering.hasDataset.map((item, idx) => (
        <Dataset key={item.title} eventKey={`dataset${idx}`} { ...item } />
    ));

    const pricingModelEl = offering.hasPricingModel.map((item, idx) => (
        <PricingModel key={item.title} eventKey={`pricingModel${idx}`} { ...item } />
    ));

    function onCancel() {
        router.push('/offerings/' + offeringId);
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1">
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Update Offering</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </div>

                <hr className="mt-2 mb-4" />

                <Tabs activeKey={'tab' + atIdx} onSelect={k => {
                    setAtIdx(parseInt(k.substr(3)));
                }} className="mb-3">
                    <Tab eventKey="tab0" title="General">
                        <General offering={offering} categories={categories} />
                    </Tab>
                    <Tab eventKey="tab1" title="Dataset">
                        { datasetEl }
                    </Tab>
                    <Tab eventKey="tab2" title="Pricing Model">
                        { pricingModelEl }
                    </Tab>
                </Tabs>

                <div className="flex-grow-1" />

                <div className="d-flex mt-3">
                    <Button disabled={atIdx === 0} onClick={e => {
                        if (atIdx)
                            setAtIdx(atIdx - 1);
                    }}>Previous</Button>
                    <div className="flex-grow-1" />
                    <Button disabled={atIdx === 3} onClick={e => {
                        if (atIdx < 3)
                            setAtIdx(atIdx + 1);
                    }}>Next</Button>
                </div>
            </Form>

        </Layout>
    );
}
