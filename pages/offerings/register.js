import { useState } from 'react'
import { Layout } from '/components/common.js'
import { Card, Form, Col, Row, Accordion } from 'react-bootstrap'
import CustomToggle from '/components/CustomToggle.js'

function RegisterOfferingDataset(props) {
  const { eventKey } = props;

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
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default function RegisterOffering() {
  const [ datasetsN, setDatasetsN ] = useState(1);
  // const { data, error } = useData(`/api/offerings/${providerId}`);

  // if (error)
  //   return <ErrorC error={error} />;

  // if (!data)
  //   return <Loading />;
  const datasetEl = (Array.from(Array(datasetsN).keys())).map((item, idx) => (
    <RegisterOfferingDataset key={idx} eventKey={`dataset${idx}`} />
  ));

  console.log(datasetsN, datasetEl);

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
    </Form>
  </Layout>);
}

