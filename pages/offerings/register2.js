import {useState} from 'react'
import { Layout } from '/components/common.js'
import General from "/components/offerings/register/General.js";
import Dataset from "/components/offerings/register/Dataset";
import PricingModel from "/components/offerings/register/PricingModel";
import { Form, Tabs, Tab, Button } from 'react-bootstrap';

export default function Register() {
  const [ datasetN, setDatasetN ] = useState(1);
  const [ pricingModelN, setPricingModelN ] = useState(1);

  const datasetEl = (Array.from(Array(datasetN).keys())).map((item, idx) => (
      <Dataset key={idx} eventKey={`dataset${idx}`} />
  ));

  const pricingModelEl = (Array.from(Array(pricingModelN).keys())).map((item, idx) => (
      <PricingModel key={idx} eventKey={`pricingModel${idx}`} />
  ));

  return (<Layout>
    <Form className="px-5 pb-3">
      <div className="d-flex">
        <h3 className="flex-grow-1 mb-0">Register New Offering</h3>
        <Button variant="secondary" className="mr-3">Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>

      <hr className="mt-2 mb-4" />

      <Tabs defaultActiveKey="general" className="mb-3">
        <Tab eventKey="general" title="General">
          <General />
        </Tab>
        <Tab eventKey="datasets" title="Datasets">
          { datasetEl }
        </Tab>
        <Tab eventKey="pricingModels" title="Pricing Models">
          { pricingModelEl }
        </Tab>
      </Tabs>

      <div className="d-flex mt-3">
        <Button disabled>Previous</Button>
        <div className="flex-grow-1" />
        <Button>Next</Button>
      </div>
    </Form>
  </Layout>
  );
}
