import {useState} from 'react'
import {Layout} from '/components/common.js'
import user from '/lib/user.js'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from 'next/router'
import {dateField} from "../../lib/utils";
import Dataset from "../../components/offerings/register/Dataset";
import PricingModel from "../../components/offerings/register/PricingModel";
import General from "/components/offerings/register/General.js";

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

    const datasetN = parseInt(fd.get("datasetN"));
    console.log('SUBMIT', datasetN, [...fd.entries()]);

    const hasDataset = (Array.from(Array(datasetN).keys())).map((item, idx) => {
      const datasetEK = "dataset" + idx;

      const distributionN = parseInt(fd.get(datasetEK + "distributionN"));

      const distribution = (Array.from(Array(distributionN).keys())).map((item, idx) => {
        const distributionEK = datasetEK + "distribution" + idx;

        const accessServiceN = parseInt(fd.get(distributionEK + "accessServiceN"));

        const accessService = (Array.from(Array(distributionN).keys())).map((item, idx) => {
          const accessServiceEK = distributionEK + "accessService" + idx;

          return {
            endpointDescription: fd.get(accessServiceEK + "endpointDescription"),
            endpointURL: fd.get(accessServiceEK + "endpointUrl"),
            conformsTo: fd.get(accessServiceEK + "conformsTo"),
            servesDataset: fd.get(accessServiceEK + "servesDataset"),
            serviceSpecs: fd.get(accessServiceEK + "serviceSpecs"),
          };
        });

        return {
          title: fd.get(distributionEK + "title"),
          description: fd.get(distributionEK + "description"),
          license: fd.get(distributionEK + "license"),
          conformsTo: fd.get(distributionEK + "conformsTo"),
          mediaType: fd.get(distributionEK + "mediaType"),
          packageFormat: fd.get(distributionEK + "packageFormat"),
          accessService,
        };
      });

      const datasetInformationN = parseInt(fd.get(datasetEK + "informationN"));

      const datasetInformation = (Array.from(Array(distributionN).keys())).map((item, idx) => {
        const informationEK = datasetEK + "information" + idx;

        return {
          cppType: fd.get(informationEK + "cppType"),
          deviceID: fd.get(informationEK + "deviceID"),
          measurementChannelType: fd.get(informationEK + "measurementChannelType"),
          measurementType: fd.get(informationEK + "measurementType"),
          sensorID: fd.get(informationEK + "sensorID"),
          sensorType: fd.get(informationEK + "sensorType"),
        };
      });

      let ret = {
        title: fd.get(datasetEK + "title"),
        description: fd.get(datasetEK + "description"),
        creator: fd.get(datasetEK + "creator"),
        // issued: dateStrToISO(fd.get(datasetEK + "issued")),
        // modified: dateStrToISO(fd.get(datasetEK + "modified")),
        language: fd.get(datasetEK + "language"),
        temporal: fd.get(datasetEK + "temporal"),
        temporalResolution: fd.get(datasetEK + "temporalResolution"),
        spatial: fd.get(datasetEK + "spatial"),
        accrualPeriodicity: fd.get(datasetEK + "accrualPeriodicity"),
        distribution,
        datasetInformation,
      };

      dateField(ret, 'issued', fd.get(datasetEK + "issued"));
      dateField(ret, 'modified', fd.get(datasetEK + "modified"));

      return ret;
    });

    const pricingModelN = parseInt(fd.get("pricingModelN"));

    const hasPricingModel = (Array.from(Array(pricingModelN).keys())).map((item, idx) => {
      const pricingModelEK = "pricingModel" + idx;

      const paymentTypeN = parseInt(fd.get(pricingModelEK + "paymentTypeN"));

      const hasPaymentType = (Array.from(Array(paymentTypeN).keys())).map((item, idx) => {
        const paymentTypeEK = pricingModelEK + "paymentType" + idx;

        let ret = {
          hasSubscriptionPrice: fd.get(paymentTypeEK + "subscriptionPrice"),
          // fromValue: dateStrToISO(fd.get(paymentTypeEK + "from")),
          // toValue: dateStrToISO(fd.get(paymentTypeEK + "to")),
          paymentType: fd.get(paymentTypeEK + "paymentType"),
          repeat: fd.get(paymentTypeEK + "repeat"),
          timeDuration: fd.get(paymentTypeEK + "timeDuration"),
        }

        dateField(ret, 'fromValue', fd.get(paymentTypeEK + "from"));
        dateField(ret, 'toValue', fd.get(paymentTypeEK + "to"));

        return ret;
      });

      return {
        basicPrice: fd.get(pricingModelEK + "basicPrice"),
        currency: fd.get(pricingModelEK + "currency"),
        hasPaymentType,
      };
    });

    let res = {
      title: fd.get("title"),
      description: fd.get("description"),
      category: fd.get("category"),
      isProvidedBy: fd.get("isProvidedBy"),
      label: fd.get("label"),
      hasDataset,
      hasPricingModel,
    };

    console.log(res);

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

