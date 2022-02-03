import { useRouter } from 'next/router';
import Layout from '../../layout/Layout';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import General from '../update/General';
import Dataset from './Dataset/Dataset';
import PricingModel from './PricingModel/PricingModel';
import ContractParameter from './ContractParameter/ContractParameter';
import { formUpdate } from '../../../lib/forms/updateOffering';

export default function Offering(props) {
    const router = useRouter();
    const { offeringId } = router.query;
    const { offering, categories } = props;

    const [ atIdx, setAtIdx ] = useState(0);

    const datasetEl = offering.hasDataset.map((item, idx) => (
        <Dataset key={item.datasetId} eventKey={`dataset${idx}`} { ...item } />
    ));

    const pricingModelEl = offering.hasPricingModel.map((item, idx) => (
        <PricingModel key={item.pricingModelId} eventKey={`pricingModel${idx}`} { ...item } />
    ));

    const contractParameterEl = offering.contractParameters.map((item, idx) => (
        <ContractParameter key={item.contractParametersId} eventKey={`contractParameter${idx}`} { ...item } />
    ));

    function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const res = formUpdate(fd);

        fetch(form.action, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: res,
        }).then(res => {
            router.push(`/offerings/${offeringId}`);
        });
    }

    function onCancel() {
        router.push(`/offerings/${offeringId}`);
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit} action="/api/offerings/update">
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
                    <Tab eventKey="tab3" title="Contract Parameters">
                        { contractParameterEl }
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
