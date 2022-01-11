import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMap } from '/lib/hooks.js';
import Layout from '/components/layout/Layout.js';
import General from './General.js';
import Dataset from './Dataset/Dataset';
import PricingModel from './PricingModel/PricingModel.js';
import { AddNew } from '/components/common/buttons.js';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { formRegister } from '/lib/forms/registerOffering.js';
import ContractParameter from './ContractParameter/ContractParameter';

export default
function Register(props) {
    const { categories } = props;

    const [ atIdx, setAtIdx ] = useState(0);

    const [
        datasetMap, datasetC,
        datasetOnDelete, datasetAdd
    ] = useMap('', 'dataset');

    const [
        pricingModelMap, pricingModelC,
        pricingModelOnDelete, pricingModelAdd
    ] = useMap('', 'pricingModel');

    const [
        contractParameterMap, contractParameterC,
        contractParameterOnDelete, contractParameterAdd
    ] = useMap('', 'contractParameter');

    const router = useRouter();

    const datasetEl = (Object.keys(datasetMap)).map((item, idx) => (
        <Dataset key={item} eventKey={item} onDelete={datasetOnDelete} />
    ));

    const pricingModelEl = (Object.keys(pricingModelMap)).map((item, idx) => (
        <PricingModel key={item} eventKey={item} onDelete={pricingModelOnDelete} />
    ));

    const contractParameterEl = (Object.keys(contractParameterMap)).map((item, idx) => (
        <ContractParameter key={item} eventKey={item} onDelete={contractParameterOnDelete} />
    ));

    function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const res = formRegister(fd);

        fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res),
        }).then(res => {
            router.push('/offerings');
        });
    }

    function onCancel() {
        router.push('/offerings');
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit} action="/api/offerings/register">
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Register New Offering</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>

                <hr className="mt-2 mb-4" />

                <Tabs activeKey={'tab' + atIdx} onSelect={k => {
                    setAtIdx(parseInt(k.substr(3)));
                }} className="mb-3">
                    <Tab eventKey="tab0" title="General">
                        <General categories={categories} />
                    </Tab>
                    <Tab eventKey="tab1" title="Datasets">
                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-grow-1"/>
                            <AddNew onClick={datasetAdd} />
                        </div>

                        { datasetEl }
                    </Tab>
                    <Tab eventKey="tab2" title="Pricing Models">
                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-grow-1"/>
                            <AddNew onClick={pricingModelAdd} />
                        </div>

                        { pricingModelEl }
                    </Tab>

                    <Tab eventKey="tab3" title="Contract Parameters">
                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-grow-1"/>
                            <AddNew onClick={contractParameterAdd} />
                        </div>

                        { contractParameterEl }
                    </Tab>
                </Tabs>

                <input type="hidden" value={datasetC} name="datasetC" />
                <input type="hidden" value={pricingModelC} name="pricingModelC" />
                <input type="hidden" value={contractParameterC} name="contractParameterC" />

                <div className="flex-grow-1" />

                <div className="d-flex mt-3">
                    <Button disabled={atIdx === 0} onClick={e => {
                        if (atIdx)
                            setAtIdx(atIdx - 1);
                    }}>Previous</Button>
                    <div className="flex-grow-1" />
                    <Button disabled={atIdx === 2} onClick={e => {
                        if (atIdx < 2)
                            setAtIdx(atIdx + 1);
                    }}>Next</Button>
                </div>
            </Form>
        </Layout>
    );
}
