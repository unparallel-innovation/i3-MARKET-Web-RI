import { Col, Form, Row } from 'react-bootstrap';

export default function AccessService(props) {
    const {
        dataserviceId, conformsTo, endpointDescription,
        endpointURL, servesDataset, serviceSpecs, eventKey
    } = props;

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'endpointDescription'}>
                        <Form.Label>Endpoint Description</Form.Label>
                        <Form.Control type="text" placeholder="Endpoint Description"
                            name={eventKey + 'endpointDescription'} defaultValue={endpointDescription}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'endpointUrl'}>
                        <Form.Label>Endpoint URL</Form.Label>
                        <Form.Control type="text" placeholder="Endpoint URL"
                            name={eventKey + 'endpointUrl'} defaultValue={endpointURL}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'conformsTo'}>
                        <Form.Label>Conforms To</Form.Label>
                        <Form.Control type="text" placeholder="Conforms To"
                            name={eventKey + 'conformsTo'} defaultValue={conformsTo}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'servesDataset'}>
                        <Form.Label>Serves Dataset</Form.Label>
                        <Form.Control type="text" placeholder="Serves Dataset"
                            name={eventKey + 'servesDataset'} defaultValue={servesDataset}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'serviceSpecs'}>
                        <Form.Label>Service Specs</Form.Label>
                        <Form.Control type="text" placeholder="Service Specs"
                            name={eventKey + 'serviceSpecs'} defaultValue={serviceSpecs}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <input type="hidden" name={eventKey + 'dataserviceId'} defaultValue={dataserviceId} />
        </>
    );
}
