import {useState} from 'react'
import {useRouter} from 'next/router'
import { Layout } from '/components/common.js'
import General from "/components/offerings/register/General.js";
import Dataset from "/components/offerings/register/Dataset";
import PricingModel from "/components/offerings/register/PricingModel";
import { AddNew } from '/components/buttons.js';
import { Form, Tabs, Tab, Button } from 'react-bootstrap';
import { fd2register } from '/lib/form.js';

export default function Register() {
  const router = useRouter();
  const [ datasetN, setDatasetN ] = useState(1);
  const [ pricingModelN, setPricingModelN ] = useState(1);

  const datasetEl = (Array.from(Array(datasetN).keys())).map((item, idx) => (
      <Dataset key={idx} eventKey={`dataset${idx}`} />
  ));

  const pricingModelEl = (Array.from(Array(pricingModelN).keys())).map((item, idx) => (
      <PricingModel key={idx} eventKey={`pricingModel${idx}`} />
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

      <Tabs defaultActiveKey="general" className="mb-3">
        <Tab eventKey="general" title="General">
          <General />
        </Tab>
        <Tab eventKey="datasets" title="Datasets">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1"></div>
              <AddNew onClick={e => {
                  setDatasetN(datasetN + 1);
              }} />
          </div>

          { datasetEl }
        </Tab>
        <Tab eventKey="pricingModels" title="Pricing Models">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1"></div>
            <AddNew onClick={e => {
                  setPricingModelN(pricingModelN + 1);
              }} />
          </div>

          { pricingModelEl }
        </Tab>
      </Tabs>

      <input type="hidden" value={datasetN} name="datasetN" />
      <input type="hidden" value={pricingModelN} name="pricingModelN" />

      <div className="d-flex mt-3">
        <Button disabled>Previous</Button>
        <div className="flex-grow-1" />
        <Button>Next</Button>
      </div>
    </Form>
  </Layout>
  );
}
