import {useState} from 'react'
import {useRouter} from 'next/router'
import { useData, useMap } from '/lib/effects.js'
import { Layout, ErrorC } from '/components/common.js'
import {Loading} from "../../components/Loading";
import General from "/components/offerings/register/General.js";
import Dataset from "/components/offerings/register/Dataset";
import PricingModel from "/components/offerings/register/PricingModel";
import { AddNew } from '/components/buttons.js';
import { Form, Tabs, Tab, Button } from 'react-bootstrap';
import { fd2register } from '/lib/form.js';

export default function Register() {
  const router = useRouter();
  const { data, error } = useData('/api/offerings/register');
  const [ atIdx, setAtIdx ] = useState(0);
  const [
    datasetMap, datasetC,
    datasetOnDelete, datasetAdd
  ] = useMap("", "dataset");
  const [
    pricingModelMap, pricingModelC,
    pricingModelOnDelete, pricingModelAdd
  ] = useMap("", "pricingModel");

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return <Loading />;

  const { categories } = data;

  const datasetEl = (Object.keys(datasetMap)).map((item, idx) => (
      <Dataset key={item} eventKey={item} onDelete={datasetOnDelete} />
  ));

  const pricingModelEl = (Object.keys(pricingModelMap)).map((item, idx) => (
      <PricingModel key={item} eventKey={item}
          onDelete={pricingModelOnDelete} />
  ));

  function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const res = fd2register(fd);

    console.log('SUBMIT', [ ...fd.entries() ], res);

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

  return (<Layout>
    <Form className="px-5 pb-3" onSubmit={onSubmit} action='/api/offerings/register'>
      <div className="d-flex">
        <h3 className="flex-grow-1 mb-0">Register New Offering</h3>
        <Button variant="secondary" className="mr-3" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>

      <hr className="mt-2 mb-4" />

      {/* <Tabs defaultActiveKey="general" className="mb-3"> */}
        <Tabs activeKey={"tab" + atIdx} onSelect={k => {
            setAtIdx(parseInt(k.substr(3)));
        }} className="mb-3">
        <Tab eventKey="tab0" title="General">
            <General categories={categories} />
        </Tab>
        <Tab eventKey="tab1" title="Datasets">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1"></div>
              <AddNew onClick={datasetAdd} />
          </div>

          { datasetEl }
        </Tab>
        <Tab eventKey="tab2" title="Pricing Models">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1"></div>
            <AddNew onClick={pricingModelAdd} />
          </div>

          { pricingModelEl }
        </Tab>
      </Tabs>

      <input type="hidden" value={datasetC} name="datasetC" />
      <input type="hidden" value={pricingModelC} name="pricingModelC" />

      <div className="d-flex mt-3">
          <Button disabled={atIdx == 0} onClick={e => {
              if (atIdx)
                  setAtIdx(atIdx - 1);
          }}>Previous</Button>
          <div className="flex-grow-1" />
          <Button disabled={atIdx == 2} onClick = {e => {
              if (atIdx < 2)
                  setAtIdx(atIdx + 1);
          }}>Next</Button>
      </div>
    </Form>
  </Layout>
  );
}
