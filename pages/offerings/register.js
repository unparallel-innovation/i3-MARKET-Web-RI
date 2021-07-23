import { useState } from 'react'
import { Layout } from '/components/common.js'
import {Card, Form, Col, Row, Accordion, Button} from 'react-bootstrap'
import CustomToggle from '/components/CustomToggle.js'

function RegisterOfferingDatasetInformation(props) {
  const { eventKey } = props;

  // return (
  //     <Form.Group controlId={eventKey + 'title'}>
  //       <Form.Label>Title</Form.Label>
  //       <Form.Control type="text" placeholder="Dataset Title" />
  //     </Form.Group>
  // )

  return (
      <Accordion>
        <Card className="mb-3">
          <CustomToggle eventKey={eventKey}>
            Dataset Information
          </CustomToggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'cppType'}>
                    <Form.Label>cpp Type</Form.Label>
                    <Form.Control type="text" placeholder="cpp Type" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'deviceID'}>
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control type="text" placeholder="Device ID" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'measurementChannelType'}>
                    <Form.Label>Measurement Channel Type</Form.Label>
                    <Form.Control type="text" placeholder="Measurement Channel Type" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'measurementType'}>
                    <Form.Label>Measurement Type</Form.Label>
                    <Form.Control type="text" placeholder="Measurement Type" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'sensorID'}>
                    <Form.Label>Sensor ID</Form.Label>
                    <Form.Control type="text" placeholder="Sensor ID" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'sensorType'}>
                    <Form.Label>Sensor Type</Form.Label>
                    <Form.Control type="text" placeholder="Sensor Type" />
                  </Form.Group>
                </Col>
              </Row>


            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  );
}

function RegisterOfferingDatasetDistribution(props) {
  const { eventKey, datasetDistributionAccessServiceN } = props;

  const accessServiceEl = (Array.from(Array(datasetDistributionAccessServiceN).keys())).map((item, idx) => (
      <RegisterOfferingDatasetDistributionAccessService key={idx} eventKey={`accessService${idx}`} />
  ));

  return (
      <Accordion>
        <Card>
          <CustomToggle eventKey={eventKey}>
            Distribution
          </CustomToggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <Form.Group controlId={eventKey + 'title'}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Distribution Title" />
              </Form.Group>

              <Form.Group controlId={eventKey + 'distribution'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3}
                              placeholder="Distribution Description" />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'license'}>
                    <Form.Label>License</Form.Label>
                    <Form.Control type="text" placeholder="License" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'conformsTo'}>
                    <Form.Label>conformsTo</Form.Label>
                    <Form.Control type="text" placeholder="conformsTo" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'mediaType'}>
                    <Form.Label>mediaType</Form.Label>
                    <Form.Control type="text" placeholder="mediaType" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'packageFormat'}>
                    <Form.Label>packageFormat</Form.Label>
                    <Form.Control type="text" placeholder="packageFormat" />
                  </Form.Group>
                </Col>
              </Row>

              {accessServiceEl}

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  );
}

function RegisterOfferingDatasetDistributionAccessService(props) {
  const { eventKey } = props;

  // return (
  //     <Form.Group controlId={eventKey + 'title'}>
  //       <Form.Label>Title</Form.Label>
  //       <Form.Control type="text" placeholder="Dataset Title" />
  //     </Form.Group>
  // )

  return (
      <Accordion>
        <Card>
          <CustomToggle eventKey={eventKey}>
            Access Service
          </CustomToggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'endpointDescription'}>
                    <Form.Label>Endpoint Description</Form.Label>
                    <Form.Control type="text" placeholder="Endpoint Description" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'endpointUrl'}>
                    <Form.Label>Endpoint URL</Form.Label>
                    <Form.Control type="text" placeholder="Endpoint URL" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'conformsTo'}>
                    <Form.Label>Conforms To</Form.Label>
                    <Form.Control type="text" placeholder="Conforms To" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'servesDataset'}>
                    <Form.Label>Serves Dataset</Form.Label>
                    <Form.Control type="text" placeholder="Serves Dataset" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'Service Specs'}>
                    <Form.Label>Service Specs</Form.Label>
                    <Form.Control type="text" placeholder="Service Specs" />
                  </Form.Group>
                </Col>
              </Row>




            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  );
}

function RegisterOfferingDataset(props) {
  const { eventKey, datasetsInfoN, datasetsDistributionN } = props;

  const datasetInformationEl = (Array.from(Array(datasetsInfoN).keys())).map((item, idx) => (
      <RegisterOfferingDatasetInformation key={idx} eventKey={`datasetInformation${idx}`} />
  ));

  const datasetDistributionEl = (Array.from(Array(datasetsDistributionN).keys())).map((item, idx) => (
      <RegisterOfferingDatasetDistribution key={idx} eventKey={`datasetDistribution${idx}`} />
  ));

  return (
    <Accordion>
      <Card>
        <CustomToggle eventKey={eventKey}>
          Dataset
        </CustomToggle>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            <Form.Group controlId={eventKey + 'title'}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Dataset Title" />
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}
                placeholder="Dataset Description" />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId={eventKey + 'creator'}>
                  <Form.Label>Creator</Form.Label>
                  <Form.Control type="text" placeholder="Creator" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={eventKey + 'issued'}>
                  <Form.Label>Issued</Form.Label>
                  <Form.Control type="date" placeholder="Issued" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={eventKey + 'modified'}>
                  <Form.Label>Modified</Form.Label>
                  <Form.Control type="date" placeholder="Modified" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId={eventKey + 'language'}>
                  <Form.Label>Language</Form.Label>
                  <Form.Control type="text" placeholder="Language" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={eventKey + 'temporal'}>
                  <Form.Label>Temporal</Form.Label>
                  <Form.Control type="text" placeholder="Temporal" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={eventKey + 'temporalResolution'}>
                  <Form.Label>Temporal Resolution</Form.Label>
                  <Form.Control type="text" placeholder="Temporal Resolution" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId={eventKey + 'spatial'}>
                  <Form.Label>Spatial</Form.Label>
                  <Form.Control type="text" placeholder="Spatial" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={eventKey + 'accrualPeriodicity'}>
                  <Form.Label>Accrual Periodicity</Form.Label>
                  <Form.Control type="text" placeholder="Accrual Periodicity" />
                </Form.Group>
              </Col>
            </Row>

            { datasetInformationEl}

            { datasetDistributionEl}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function RegisterOfferingPricingModelPaymentType(props) {
  const { eventKey, paymentTypesN, datasetsDistributionN } = props;

  const paymentTypel = (Array.from(Array(paymentTypesN).keys())).map((item, idx) => (
      <RegisterOfferingPricingModelPaymentType key={idx} eventKey={`paymentType${idx}`} />
  ));


  return (
      <Accordion>
        <Card>
          <CustomToggle eventKey={eventKey}>
            Payment Type - Subscription
          </CustomToggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'subscriptionPrice'}>
                    <Form.Label>Subscription Price</Form.Label>
                    <Form.Control type="text" placeholder="Subscription Price" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'from'}>
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" placeholder="From" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'to'}>
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" placeholder="To" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'paymentType'}>
                    <Form.Label>Payment Type</Form.Label>
                    <Form.Control type="text" placeholder="Payment Type" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'repeat'}>
                    <Form.Label>Repeat</Form.Label>
                    <Form.Control type="text" placeholder="repeat" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'timeDuration'}>
                    <Form.Label>Time Duration</Form.Label>
                    <Form.Control type="text" placeholder="Time Duration" />
                  </Form.Group>
                </Col>
              </Row>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  );
}

function RegisterOfferingPricingModel(props) {
  const { eventKey, paymentTypesN } = props;

  const paymentTypeEl = (Array.from(Array(paymentTypesN).keys())).map((item, idx) => (
      <RegisterOfferingPricingModelPaymentType key={idx} eventKey={`paymentType${idx}`} />
  ));


  return (
      <Accordion>
        <Card className="my-3">
          <CustomToggle eventKey={eventKey}>
            Pricing Model
          </CustomToggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>

              <Row>
                <Col>
                  <Form.Group controlId={eventKey + 'basicPrice'}>
                    <Form.Label>Basic Price</Form.Label>
                    <Form.Control type="text" placeholder="Basic Price" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={eventKey + 'currency'}>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control type="text" placeholder="Currency" />
                  </Form.Group>
                </Col>
              </Row>

              {paymentTypeEl}

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  );
}

export default function RegisterOffering() {
  const [ datasetsN, pricingModelN, setDatasetsN ] = useState(1);
  // const { data, error } = useData(`/api/offerings/${providerId}`);

  // if (error)
  //   return <ErrorC error={error} />;

  // if (!data)
  //   return <Loading />;





  const datasetEl = (Array.from(Array(datasetsN).keys())).map((item, idx) => (
    <RegisterOfferingDataset key={idx} eventKey={`dataset${idx}`} />
  ));

  const pricingModelEl = (Array.from(Array(pricingModelN).keys())).map((item, idx) => (
      <RegisterOfferingPricingModel key={idx} eventKey={`princingModel${idx}`} />
  ));

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    let res = {

    };
    // fetch(form.action, { method: 'post', body: fd });
  }

  return (<Layout>
    <Form className="px-5">
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Offering Title" />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}
          placeholder="Offering Description" />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Category" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="provider">
            <Form.Label>Provider</Form.Label>
            <Form.Control type="text" placeholder="Provider" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="license">
            <Form.Label>License</Form.Label>
            <Form.Control type="text" placeholder="License" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="label">
            <Form.Label>Label</Form.Label>
            <Form.Control type="text" placeholder="Label" />
          </Form.Group>
        </Col>
      </Row>

      { datasetEl }

      { pricingModelEl }

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-secondary mr-3" type="button">Cancel</button>
        <button className="btn btn-primary" type="button">Register</button>
      </div>



    </Form>
  </Layout>);
}

