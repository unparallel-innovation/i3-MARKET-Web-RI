import {useState} from 'react'
import {Layout} from '/components/common.js'
import user from '/lib/user.js'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from 'next/router'
import Dataset from "../../components/offerings/register/Dataset";
import PricingModel from "../../components/offerings/register/PricingModel";
import General from "/components/offerings/register/General.js";
import { fd2register } from '/lib/form.js';

export default function RegisterOffering() {
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
    <Form className="px-5" onSubmit={onSubmit} action='/api/offerings/register'>
      <General />

      { datasetEl }

      { pricingModelEl }

      <input type="hidden" value={datasetN} name="datasetN" />
      <input type="hidden" value={pricingModelN} name="pricingModelN" />

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
        <Button type="submit" className="ml-3">Register</Button>
      </div>
    </Form>
  </Layout>);
}

