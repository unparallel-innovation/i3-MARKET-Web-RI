import { useData } from '/lib/effects.js'
import Layout from '/components/Layout.js'
import colors from '/lib/colors.js'

import { useContext } from 'react'
import { useRouter } from 'next/router'

import { Button, Accordion, Card } from 'react-bootstrap'
import { Lock, Globe, Pencil, Trash } from 'react-bootstrap-icons'

import { AccordionContext, useAccordionToggle } from 'react-bootstrap'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons'

import { Row, Col, Table } from 'react-bootstrap'

function CustomToggle(props) {
  const { className, children, eventKey, callback } = props;
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  const caretEl = isCurrentEventKey
    ? <CaretDownFill />
    : <CaretUpFill />;

  return (
    <Card.Header
      className={className + " d-flex align-items-center"}
      onClick={decoratedOnClick}
    >
      <span className="flex-grow-1">{ children }</span>
      { caretEl }

    </Card.Header>
  );
}

function ts2date(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat().format(date);
}

function KVCol(props) {
  const { title, children } = props;

  return (
    <Col className="p-2">
      <div className="text-darkblue">
        { title }
      </div>
      <div>
        { children }
      </div>
    </Col>
  );
}

function Distribution(props) {
  const {
    title, description,
    license, mediaType, packageFormat,
    accessService,
  } = props;

  const accessServiceEl = accessService.map(({
    endpointDescription, endpointURL,
    servesDataset, serviceSpecs
  }, idx) => (
    <tr key={idx}>
      <td>{ endpointDescription }</td>
      <td>{ endpointURL }</td>
      <td>{ servesDataset }</td>
      <td>{ serviceSpecs }</td>
    </tr>
  ));

  return (
    <Accordion>
      <Card>
        <CustomToggle className="bg-white" eventKey="0">
          { title }
        </CustomToggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="bg-light">
            { description }

            <Row className="text-center mt-3 bg-lightgray">
              <KVCol title="License">
                { license }
              </KVCol>
              <KVCol title="Media Type">
                { mediaType }
              </KVCol>
              <KVCol title="Package Format">
                { packageFormat }
              </KVCol>
            </Row>

            <h5 className="text-center mt-4 text-dark">Access Service</h5>

            <Table className="mt-3">
              <thead>
                <tr>
                  <th>Endpoint Description</th>
                  <th>Endpoint URL</th>
                  <th>Serves Dataset</th>
                  <th>Service Specs</th>
                </tr>
              </thead>
              <tbody>
                { accessServiceEl }
              </tbody>
            </Table>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function Dataset(props) {
  const {
    title, description, creator,
    issued, modified,
    language, temporal, temporalResolution,
    accrualPeriodicity, spatial, distribution
  } = props;

  const distributionEl = distribution.map(dist => (
    <Distribution key={dist.title} { ...dist } />
  ));

  return (
    <Accordion className="mt-3 mb-3">
      <Card>
        <CustomToggle className="bg-primary text-white" eventKey="0">
          { title }
        </CustomToggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="bg-light">
            { description }

            <Row className="text-center mt-3 bg-lightgray">
              <KVCol title="Keywords">
              </KVCol>
              <KVCol title="Category">
              </KVCol>
              <KVCol title="Creator">
                { creator }
              </KVCol>
              <KVCol title="Issued">
                { ts2date(issued) }
              </KVCol>
              <KVCol title="Modified">
                { ts2date(modified) }
              </KVCol>
            </Row>
            <Row className="text-center mb-3 bg-lightgray">
              <KVCol title="Language">
                { language }
              </KVCol>
              <KVCol title="Temporal Coverage">
                { temporal }
              </KVCol>
              <KVCol title="Temporal Resolution">
                { temporalResolution }
              </KVCol>
              <KVCol title="Accrual Periodicity">
                { accrualPeriodicity }
              </KVCol>
              <KVCol title="Spatial">
                { spatial }
              </KVCol>
            </Row>

            { distributionEl }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function KVCol2(props) {
  const { title, children } = props;

  return (
    <Col className="p-2">
      <span className="text-muted mr-3">{ title }</span>
      <span>{ children }</span>
    </Col>
  );
}

function PricingModel(props) {
  const { basicPrice } = props;

  return (
    <Col xs="6" md="4" >
      <Card className="text-center">
        <Card.Body>
          <div>
            <span className="price">{basicPrice}&euro;</span>
            <span className="ml-2 h1 text-muted">/ mo</span>
          </div>
          <Card.Title>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default function Offering() {
  const router = useRouter();
  const { offeringId } = router.query;
  const { data, error } = useData(`/api/offering/${offeringId}`);

  if (error)
    return <Layout>Offerings failed to load</Layout>;

  if (!data)
    return <Layout>Loading...</Layout>;

  const {
    title, description, activeContracts,
    pendingContracts, active, hasDataset,
    category, isProvidedBy, license,
    hasPricingModel
  } = data;

  const visIconEl = active === "yes"
    ? <Globe color={colors.primary} size={24} />
    : <Lock color={colors.primary} size={24} />;

  const datasetEl = hasDataset.map(dataset => (
    <Dataset key={dataset.title} { ...dataset } />
  ));

  const pricingModelEl = hasPricingModel.map((item, idx) => (
    <PricingModel key={idx} { ...item } />
  ));

  return (<Layout>
    <div className="px-5">
      <div className="d-flex">
        <h2 className="flex-grow-1">{ title }</h2>
        <span className="p-2">{ visIconEl }</span>
        <span className="p-2">
          <Pencil color={colors.primary} size={24} />
        </span>
        <span className="p-2">
          <Trash color={colors.primary} size={24} />
        </span>
      </div>

      <hr />

      <span>
        <Button>View all Contracts</Button>
        <span className="p-2 ml-2">{activeContracts} Active</span>|
        <span className="p-2">{pendingContracts} Pending</span>
      </span>

      <hr />

      <p>{ description }</p>

      <Row className="text-center mb-3">
        <KVCol2 title="Category">
          { category }
        </KVCol2>
        <KVCol2 title="Provider">
          { isProvidedBy }
        </KVCol2>
        <KVCol2 title="Licence">
          { license }
        </KVCol2>
      </Row>

      { datasetEl }
    </div>

    <div className="bg-lightcyan p-5">
      <h3 className="mb-5 text-center">Pricing Model</h3>
      <Row>
        { pricingModelEl }
      </Row>
    </div>
  </Layout>);
}

