import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMap } from '/lib/hooks.js';
import Layout from '/components/layout/Layout.js';
import General from './General.js';
import Dataset from './Dataset/Dataset';
import ContractParameter from './ContractParameter/ContractParameter';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { formRegister } from '/lib/forms/registerOffering.js';
import PricingModel from './PricingModel/PricingModel';

export default
function Register(props) {
    const router = useRouter();
    const { categories, user, market_name, toUpdate, offering } = props;
    const [ atIdx, setAtIdx ] = useState(0);

    const [ datasetC ] = useMap('', 'dataset');
    const datasetEl = <Dataset key={'datasetKey'} eventKey={'dataset0'} {...offering?.hasDataset} />;

    const [ pricingModelC ] = useMap('', 'pricingModel');
    const pricingModelEl = <PricingModel key={'pricingModelKey'} eventKey={'pricingModel0'} {...offering?.hasPricingModel} />;

    const [ contractParameterC ] = useMap('', 'contractParameter');
    const contractParameterEl = <ContractParameter key={'contractParameterKey'} eventKey={'contractParameter0'} {...offering?.contractParameters} />;

    function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const res = formRegister(fd, toUpdate);

        fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res),
        }).then(() => {
            router.push('/offerings');
        });
    }

    function onCancel() {
        router.back();
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1"
                onSubmit={onSubmit} action={toUpdate ? '/api/offerings/update' : '/api/offerings/register'}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">{toUpdate ? 'Update Offering' : 'Register New Offering'}</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>

                <hr className="mt-2 mb-4" />

                <Tabs activeKey={'tab' + atIdx} onSelect={k => {
                    setAtIdx(parseInt(k.substring(3)));
                }} className="mb-3">
                    <Tab eventKey="tab0" title="General">
                        <General categories={categories} user={user} market_name={market_name} toUpdate={toUpdate} {...offering} />
                    </Tab>
                    <Tab eventKey="tab1" title="Dataset">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1"/>
                        </div>
                        { datasetEl }
                    </Tab>
                    <Tab eventKey="tab2" title="Pricing Model">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1"/>
                        </div>
                        { pricingModelEl }
                    </Tab>

                    <Tab eventKey="tab3" title="Contract Parameters">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1"/>
                        </div>
                        { contractParameterEl }
                    </Tab>
                </Tabs>

                <input type="hidden" value={offering?.dataOfferingId} name="dataOfferingId" />
                <input type="hidden" value={offering?.status} name="status" />
                <input type="hidden" value={offering?.createdAt} name="createdAt" />
                <input type="hidden" value={JSON.stringify(offering?.context)} name="context" />
                <input type="hidden" value={offering?.version} name="version" />
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
                    <Button disabled={atIdx === 3} onClick={e => {
                        if (atIdx < 3)
                            setAtIdx(atIdx + 1);
                    }}>Next</Button>
                </div>
            </Form>
        </Layout>
    );
}
